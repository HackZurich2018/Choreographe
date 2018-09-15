class RobotUtilsCls {
  constructor() {
    // services we want to wait when onServices is called
    this.waitedServices = [];
    // public variables that can be useful.
    this.robotIp = this._getRobotIp();
    this.session = null;
    this.pendingConnectionCallbacks = [];
  }

  waitForServices(...serviceList) {
    this.waitedServices.concat(
      serviceList.filter(serviceName => !this.waitedServices.includes(serviceName))
    );
  }

  /**
   * RobotUtils.onServices(servicesCallback, errorCallback)
   *
   * A function for using NAOqi services.
   *
   * "servicesCallback" should be a function whose arguments are the
   * names of NAOqi services; the callback will be called
   * with those services as parameters (or the errorCallback
   * will be called with a reason).
   *
   * Sample usage:
   *
   *   RobotUtils.onServices(function(ALLeds, ALTextToSpeech) {
   *     ALLeds.randomEyes(2.0);
   *     ALTextToSpeech.say("I can speak");
   *   });
   *
   * This is actually syntactic sugar over RobotUtils.connect() and
   * some basic QiSession functions, so that the code stays simple.
   */
  onServices(servicesCallback, errorCallback) {
    this.connect(
      function(session) {
        const wantedServices = this.getParamNames(servicesCallback);
        let pendingServices = wantedServices.length;
        const services = new Array(wantedServices.length);
        let i;
        for (i = 0; i < wantedServices.length; i++) {
          (i => {
            this.getService(
              session,
              i,
              wantedServices[i],
              (i, service) => {
                services[i] = service;
                pendingServices -= 1;
                if (pendingServices == 0) {
                  servicesCallback(...services);
                }
              },
              () => {
                const reason = `Failed getting a NaoQi Module: ${wantedServices[i]}`;
                console.log(reason);
                if (errorCallback) {
                  errorCallback(reason);
                }
              }
            );
          })(i);
        }
      },
      errorCallback
    );
  }

  // alias, so that the code looks natural when there is only one service.
  onService(servicesCallback, errorCallback) {
    return this.onServices(servicesCallback, errorCallback);
  }

  /**
   * Helper to get services, and eventually retry if required.
   */
  getService(session, index, serviceName, onSuccess, onFailure) {
    session.service(serviceName).then(
      service => {
        onSuccess(index, service);
      },
      () => {
        if (!this.waitedServices.includes(serviceName)) {
          console.log(`Waiting for service ${serviceName}`);
          setTimeout(() => {
            this.getService(session, index, serviceName, onSuccess, onFailure);
          }, 1000);
        } else {
          onFailure(serviceName);
        }
      }
    );
  }

  /**
   *  RobotUtils.subscribeToALMemoryEvent(event, eventCallback, subscribeDoneCallback)
   *
   * connects a callback to an ALMemory event. Returns a MemoryEventSubscription.
   *
   * This is just syntactic sugar over calls to the ALMemory service, which you can
   * do yourself if you want finer control.
   */
  subscribeToALMemoryEvent(eventName, eventCallback, subscribeDoneCallback) {
    const subscription = new MemoryEventSubscription(eventName);
    this.onServices(ALMemory => {
      ALMemory.subscriber(eventName).then(
        evt => {
          subscription.setSubscriber(evt);
          evt.signal.connect(eventCallback).then(id => {
            subscription.setId(id);
            if (subscribeDoneCallback) subscribeDoneCallback(id);
          });
        },
        msg => this.onALMemoryError(msg)
      );
    });
    return subscription;
  }

  /**
   * RobotUtils.connect(connectedCallback, failureCallback)
   *
   * connectedCallback should take a single argument, a NAOqi session object
   *
   * This function is mostly meant for intenral use, for your app you
   * should probably use the more specific RobotUtils.onServices or
   * RobotUtils.subscribeToALMemoryEvent.
   *
   * There can be several calls to .connect() in parallel, only one
   * session will be created.
   */
  connect(connectedCallback, failureCallback) {
    if (this.session) {
      // We already have a session, don't create a new one
      connectedCallback(this.session);
      return;
    } else if (this.pendingConnectionCallbacks.length > 0) {
      // A connection attempt is in progress, just add this callback to the queue
      this.pendingConnectionCallbacks.push(connectedCallback);
      return;
    }
    // Add self to the queue, but create a new connection.
    this.pendingConnectionCallbacks.push(connectedCallback);

    let qimAddress = null;
    let robotlibs = '/libs/';
    if (this.robotIp) {
      // Special case: we're doing remote debugging on a robot.
      robotlibs = `http://${this.robotIp}/libs/`;
      qimAddress = `${this.robotIp}:80`;
    }

    function onConnected(session) {
      this.session = session;
      const numCallbacks = this.pendingConnectionCallbacks.length;
      for (let i = 0; i < numCallbacks; i++) {
        this.pendingConnectionCallbacks[i](session);
      }
    }

    this.getScript(
      `${robotlibs}qimessaging/2/qimessaging.js`,
      () => {
        // @ts-ignore
        QiSession(onConnected, failureCallback, qimAddress);
      },
      () => {
        if (this.robotIp) {
          console.error(`Failed to get qimessaging.js from robot: ${this.robotIp}`);
        } else {
          console.error(
            'Failed to get qimessaging.js from this domain; host this app on a robot or add a ?robot=MY-ROBOT-IP to the URL.'
          );
        }
        failureCallback();
      }
    );
  }

  /* ---------------------------------------------
     *   Internal helper functions
     */

  // Replacement for jQuery's getScript function
  getScript(source, successCallback, failureCallback) {
    let script = document.createElement('script');
    const prior = document.getElementsByTagName('script')[0];
    // @ts-ignore
    script.async = 1;
    prior.parentNode.insertBefore(script, prior);

    // @ts-ignore
    script.onload = script.onreadystatechange = function(_, isAbort) {
      // @ts-ignore
      if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
        // @ts-ignore
        script.onload = script.onreadystatechange = null;
        script = undefined;

        if (isAbort) {
          if (failureCallback) failureCallback();
        } else {
          // Success!
          if (successCallback) successCallback();
        }
      }
    };
    script.src = source;
  }

  _getRobotIp() {
    const regex = new RegExp('[\\?&]robot=([^&#]*)');
    const results = regex.exec(location.search);
    return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ').replace('/', ''));
  }

  // Helper for getting the parameters from a function.
  getParamNames(func) {
    const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
    const fnStr = func.toString().replace(STRIP_COMMENTS, '');
    let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
    if (result === null) result = [];
    return result;
  }

  // ALMemory helpers (event subscription requires a lot of boilerplate)

  onALMemoryError(errMsg) {
    console.log(`ALMemory error: ${errMsg}`);
  }
}

class MemoryEventSubscription {
  constructor(event) {
    this._event = event;
    this._internalId = null;
    this._sub = null;
    this._unsubscribe = false;
  }

  setId(id) {
    this._internalId = id;
    // as id can be receveid after unsubscribe call, defere
    if (this._unsubscribe) this.unsubscribe(this._unsubscribeCallback);
  }

  setSubscriber(sub) {
    this._sub = sub;
    // as sub can be receveid after unsubscribe call, defere
    if (this._unsubscribe) this.unsubscribe(this._unsubscribeCallback);
  }

  unsubscribe(unsubscribeDoneCallback) {
    if (this._internalId != null && this._sub != null) {
      this._sub.signal
        .disconnect(this._internalId)
        .then(() => {
          if (unsubscribeDoneCallback) unsubscribeDoneCallback();
        })
        .fail(msg => this.onALMemoryError(msg));
    } else {
      this._unsubscribe = true;
      this._unsubscribeCallback = unsubscribeDoneCallback;
    }
  }

  onALMemoryError(errMsg) {
    console.log(`ALMemory error: ${errMsg}`);
  }
}

// @ts-ignore
window.RobotUtils = new RobotUtilsCls();
