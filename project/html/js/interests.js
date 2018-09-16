"use strict";
var __read = (this && this.__read) || function (o, n) {
    var m = typeof Symbol === "function" && o[Symbol.iterator];
    if (!m) return o;
    var i = m.call(o), r, ar = [], e;
    try {
        while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
    }
    catch (error) { e = { error: error }; }
    finally {
        try {
            if (r && !r.done && (m = i["return"])) m.call(i);
        }
        finally { if (e) throw e.error; }
    }
    return ar;
};
var __spread = (this && this.__spread) || function () {
    for (var ar = [], i = 0; i < arguments.length; i++) ar = ar.concat(__read(arguments[i]));
    return ar;
};
// class RobotUtilsCls {
//   // services we want to wait when onServices is called
//   waitedServices: string[] = [];
//   session = null;
//   pendingConnectionCallbacks = [];
//   robotIp?: string;
//   constructor() {
//     // public variables that can be useful.
//     this.robotIp = this._getRobotIp();
//   }
//   waitForServices(...serviceList: string[]) {
//     this.waitedServices.concat(
//       serviceList.filter(serviceName => !this.waitedServices.includes(serviceName))
//     );
//   }
//   /**
//    * RobotUtils.onServices(servicesCallback, errorCallback)
//    *
//    * A function for using NAOqi services.
//    *
//    * "servicesCallback" should be a function whose arguments are the
//    * names of NAOqi services; the callback will be called
//    * with those services as parameters (or the errorCallback
//    * will be called with a reason).
//    *
//    * Sample usage:
//    *
//    *   RobotUtils.onServices(function(ALLeds, ALTextToSpeech) {
//    *     ALLeds.randomEyes(2.0);
//    *     ALTextToSpeech.say("I can speak");
//    *   });
//    *
//    * This is actually syntactic sugar over RobotUtils.connect() and
//    * some basic QiSession functions, so that the code stays simple.
//    */
//   onServices(servicesCallback: (...args: any[]) => void, errorCallback: (err: string) => void) {
//     this.connect(
//       (session: any) => {
//         const wantedServices = this.getParamNames(servicesCallback);
//         let pendingServices = wantedServices.length;
//         const services = new Array(wantedServices.length);
//         let i;
//         for (i = 0; i < wantedServices.length; i++) {
//           (i => {
//             this.getService(
//               session,
//               i,
//               wantedServices[i],
//               (i: number, service: string) => {
//                 services[i] = service;
//                 pendingServices -= 1;
//                 if (pendingServices == 0) {
//                   servicesCallback(...services);
//                 }
//               },
//               () => {
//                 const reason = `Failed getting a NaoQi Module: ${wantedServices[i]}`;
//                 console.log(reason);
//                 if (errorCallback) {
//                   errorCallback(reason);
//                 }
//               }
//             );
//           })(i);
//         }
//       },
//       errorCallback
//     );
//   }
//   // alias, so that the code looks natural when there is only one service.
//   onService(servicesCallback: (...args: string[]) => void, errorCallback: (err: string) => void) {
//     return this.onServices(servicesCallback, errorCallback);
//   }
//   /**
//    * Helper to get services, and eventually retry if required.
//    */
//   getService(
//     session: any,
//     index: number,
//     serviceName: string,
//     onSuccess: (num: number, service: any) => void,
//     onFailure: (serviceName: string) => void
//   ) {
//     session.service(serviceName).then(
//       (service: any) => {
//         onSuccess(index, service);
//       },
//       () => {
//         if (!this.waitedServices.includes(serviceName)) {
//           console.log(`Waiting for service ${serviceName}`);
//           setTimeout(() => {
//             this.getService(session, index, serviceName, onSuccess, onFailure);
//           }, 1000);
//         } else {
//           onFailure(serviceName);
//         }
//       }
//     );
//   }
//   /**
//    *  RobotUtils.subscribeToALMemoryEvent(event, eventCallback, subscribeDoneCallback)
//    *
//    * connects a callback to an ALMemory event. Returns a MemoryEventSubscription.
//    *
//    * This is just syntactic sugar over calls to the ALMemory service, which you can
//    * do yourself if you want finer control.
//    */
//   subscribeToALMemoryEvent(
//     eventName: string,
//     eventCallback: () => void,
//     subscribeDoneCallback: (id: string) => void
//   ) {
//     const subscription = new MemoryEventSubscription(eventName);
//     this.onServices(
//       ALMemory => {
//         ALMemory.subscriber(eventName).then(
//           (evt: any) => {
//             subscription.setSubscriber(evt);
//             evt.signal.connect(eventCallback).then((id: string) => {
//               subscription.setId(id);
//               if (subscribeDoneCallback) subscribeDoneCallback(id);
//             });
//           },
//           (msg: any) => this.onALMemoryError(msg)
//         );
//       },
//       () => {}
//     );
//     return subscription;
//   }
//   /**
//    * RobotUtils.connect(connectedCallback, failureCallback)
//    *
//    * connectedCallback should take a single argument, a NAOqi session object
//    *
//    * This function is mostly meant for intenral use, for your app you
//    * should probably use the more specific RobotUtils.onServices or
//    * RobotUtils.subscribeToALMemoryEvent.
//    *
//    * There can be several calls to .connect() in parallel, only one
//    * session will be created.
//    */
//   connect(connectedCallback: any, failureCallback: any) {
//     if (this.session) {
//       // We already have a session, don't create a new one
//       connectedCallback(this.session);
//       return;
//     } else if (this.pendingConnectionCallbacks.length > 0) {
//       // A connection attempt is in progress, just add this callback to the queue
//       this.pendingConnectionCallbacks.push(connectedCallback);
//       return;
//     }
//     // Add self to the queue, but create a new connection.
//     this.pendingConnectionCallbacks.push(connectedCallback);
//     let qimAddress = null;
//     let robotlibs = '/libs/';
//     if (this.robotIp) {
//       // Special case: we're doing remote debugging on a robot.
//       robotlibs = `http://${this.robotIp}/libs/`;
//       qimAddress = `${this.robotIp}:80`;
//     }
//     function onConnected(session) {
//       this.session = session;
//       const numCallbacks = this.pendingConnectionCallbacks.length;
//       for (let i = 0; i < numCallbacks; i++) {
//         this.pendingConnectionCallbacks[i](session);
//       }
//     }
//     this.getScript(
//       `${robotlibs}qimessaging/2/qimessaging.js`,
//       () => {
//         // @ts-ignore
//         QiSession(onConnected, failureCallback, qimAddress);
//       },
//       () => {
//         if (this.robotIp) {
//           console.error(`Failed to get qimessaging.js from robot: ${this.robotIp}`);
//         } else {
//           console.error(
//             'Failed to get qimessaging.js from this domain; host this app on a robot or add a ?robot=MY-ROBOT-IP to the URL.'
//           );
//         }
//         failureCallback();
//       }
//     );
//   }
//   /* ---------------------------------------------
//      *   Internal helper functions
//      */
//   // Replacement for jQuery's getScript function
//   getScript(source, successCallback, failureCallback) {
//     let script = document.createElement('script');
//     const prior = document.getElementsByTagName('script')[0];
//     // @ts-ignore
//     script.async = 1;
//     prior.parentNode.insertBefore(script, prior);
//     // @ts-ignore
//     script.onload = script.onreadystatechange = function(_, isAbort) {
//       // @ts-ignore
//       if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {
//         // @ts-ignore
//         script.onload = script.onreadystatechange = null;
//         script = undefined;
//         if (isAbort) {
//           if (failureCallback) failureCallback();
//         } else {
//           // Success!
//           if (successCallback) successCallback();
//         }
//       }
//     };
//     script.src = source;
//   }
//   _getRobotIp() {
//     const regex = new RegExp('[\\?&]robot=([^&#]*)');
//     const results = regex.exec(location.search);
//     return results == null ? '' : decodeURIComponent(results[1].replace(/\+/g, ' ').replace('/', ''));
//   }
//   // Helper for getting the parameters from a function.
//   getParamNames(func) {
//     const STRIP_COMMENTS = /((\/\/.*$)|(\/\*[\s\S]*?\*\/))/gm;
//     const fnStr = func.toString().replace(STRIP_COMMENTS, '');
//     let result = fnStr.slice(fnStr.indexOf('(') + 1, fnStr.indexOf(')')).match(/([^\s,]+)/g);
//     if (result === null) result = [];
//     return result;
//   }
//   // ALMemory helpers (event subscription requires a lot of boilerplate)
//   onALMemoryError(errMsg) {
//     console.log(`ALMemory error: ${errMsg}`);
//   }
// }
// class MemoryEventSubscription {
//   _event: string;
//   _internalId = '';
//   _sub: any;
//   _unsubscribe = false;
//   _unsubscribeCallback: any;
//   constructor(event: string) {
//     this._event = event;
//   }
//   setId(id: string) {
//     this._internalId = id;
//     // as id can be receveid after unsubscribe call, defere
//     if (this._unsubscribe) this.unsubscribe(this._unsubscribeCallback);
//   }
//   setSubscriber(sub: () => void) {
//     this._sub = sub;
//     // as sub can be receveid after unsubscribe call, defere
//     if (this._unsubscribe) this.unsubscribe(this._unsubscribeCallback);
//   }
//   unsubscribe(unsubscribeDoneCallback: () => void) {
//     if (this._internalId != null && this._sub != null) {
//       this._sub.signal
//         .disconnect(this._internalId)
//         .then(() => {
//           if (unsubscribeDoneCallback) unsubscribeDoneCallback();
//         })
//         .fail((msg: any) => this.onALMemoryError(msg));
//     } else {
//       this._unsubscribe = true;
//       this._unsubscribeCallback = unsubscribeDoneCallback;
//     }
//   }
//   onALMemoryError(errMsg: any) {
//     console.log(`ALMemory error: ${errMsg}`);
//   }
// }
// export const RobotUtils = new RobotUtilsCls();
System.register("ts/images", [], function (exports_1, context_1) {
    "use strict";
    var flyingImages;
    var __moduleName = context_1 && context_1.id;
    return {
        setters: [],
        execute: function () {
            exports_1("flyingImages", flyingImages = [
                'images/1.jpg',
                'images/2.jpg',
                'images/3.jpg',
                'images/4.jpg',
                'images/5.jpg',
                'images/6.jpg',
                'images/7.jpg',
                'images/8.jpg'
            ]);
        }
    };
});
System.register("ts/interests", ["ts/images"], function (exports_2, context_2) {
    "use strict";
    var images_1, Animator, AnimatedImage;
    var __moduleName = context_2 && context_2.id;
    function init() {
        var divs = initImages();
        var animator = new Animator(divs);
        animator.startAnimation();
    }
    exports_2("init", init);
    function initImages() {
        var imageContainer = document.getElementsByClassName('interest-images')[0];
        var divs = images_1.flyingImages.map(function (src) {
            var div = document.createElement('div');
            div.classList.add('interest-image');
            var img = document.createElement('img');
            img.src = src;
            img.draggable = false;
            div.appendChild(img);
            div.style.position = 'absolute';
            div.style.margin = 'auto';
            div.style.top = '-400px';
            div.style.left = '0';
            div.style.right = '0';
            imageContainer.appendChild(div);
            return new AnimatedImage(div);
        });
        return divs;
    }
    return {
        setters: [
            function (images_1_1) {
                images_1 = images_1_1;
            }
        ],
        execute: function () {
            document.addEventListener('DOMContentLoaded', function () { return init(); });
            Animator = /** @class */ (function () {
                function Animator(images) {
                    this.images = images;
                }
                Animator.prototype.startAnimation = function () {
                    var _this = this;
                    this.images[0].startAnimating();
                    setInterval(function () { return _this.tick(); }, 10);
                };
                Animator.prototype.tick = function () {
                    this.images.forEach(function (image) { return image.tick(); });
                    var filtered = this.images.filter(function (_a) {
                        var animated = _a.animated;
                        return animated;
                    });
                    var maxTop = Math.min.apply(Math, __spread(filtered.map(function (image) { return image.top(); })));
                    var img = this.images[filtered.length];
                    if (img && maxTop >= 10)
                        img.startAnimating();
                };
                return Animator;
            }());
            AnimatedImage = /** @class */ (function () {
                function AnimatedImage(div) {
                    this.div = div;
                    this.animated = false;
                    this.direction = 'down';
                    this.initSwipeGesture();
                }
                AnimatedImage.prototype.initSwipeGesture = function () {
                    var _this = this;
                    // const hammertime = new Hammer(document.getElementsByClassName('interest-images')[0] as HTMLElement);
                    var hammertime = new Hammer(this.div);
                    hammertime.on('swipeleft', function () { return (_this.direction = 'left'); });
                    hammertime.on('swiperight', function () { return (_this.direction = 'right'); });
                };
                AnimatedImage.prototype.tick = function () {
                    if (!this.animated || !this.loaded())
                        return;
                    this.div.style.top = this.top() + 3 + "px";
                    if (this.direction === 'left')
                        this.moveToSide(this.marginLeft() - 7);
                    if (this.direction === 'right')
                        this.moveToSide(this.marginLeft() + 7);
                };
                AnimatedImage.prototype.startAnimating = function () {
                    this.animated = true;
                    this.div.style.top = -this.div.offsetHeight + "px";
                };
                AnimatedImage.prototype.moveToSide = function (newMargin) {
                    this.div.style.marginLeft = newMargin + "px";
                };
                AnimatedImage.prototype.marginLeft = function () {
                    return parseInt(this.div.style.marginLeft || '0', 10) || 0;
                };
                AnimatedImage.prototype.loaded = function () {
                    return this.div.offsetHeight >= 10;
                };
                AnimatedImage.prototype.top = function () {
                    return parseInt("" + this.div.style.top, 10);
                };
                return AnimatedImage;
            }());
        }
    };
});
// async function init() {
//   console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
//   console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
//   console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
//   const session = await connect();
//   const tts = await session.service('ALTextToSpeech');
//   tts.say('hello naoqi');
//   // const alMemory = await session.service('ALMemory');
//   // const tts = subscribeToALMemoryEvent('template/changeBGColor', changeBGColor);
// }
// function connect() {
//   return new Promise<any>((resolve, reject) =>
//     QiSession(
//       (session: any) => {
//         console.log('connected!');
//         resolve(session);
//       },
//       () => {
//         console.log('disconnected');
//         reject();
//       }
//     )
//   );
// }
// console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
// $(document).ready(_ => init());
