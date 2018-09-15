"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
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
function init() {
    return __awaiter(this, void 0, void 0, function () {
        var session, tts;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                    console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
                    return [4 /*yield*/, connect()];
                case 1:
                    session = _a.sent();
                    return [4 /*yield*/, session.service('ALTextToSpeech')];
                case 2:
                    tts = _a.sent();
                    tts.say('hello naoqi');
                    return [2 /*return*/];
            }
        });
    });
}
function connect() {
    return new Promise(function (resolve, reject) {
        return QiSession(function (session) {
            console.log('connected!');
            resolve(session);
        }, function () {
            console.log('disconnected');
            reject();
        });
    });
}
console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
$(document).ready(function (_) { return init(); });
version;
"1.0";
encoding = "UTF-8" ?  >
    TS >
    version : ;
"2.1";
language = "en_US" >
    bh_ending / behavior.xar;
/Animated Say</name >
    filename;
"bh_ending/behavior.xar";
line = "0" /  >
    Thank;
you, and;
now;
let;
's dance!</source>
    < comment > Text < /comment>
    < translation;
type = "unfinished" > Thank;
you, and;
now;
let;
's dance!</translation>
    < /message>
    < /context>
    < context >
    bh_getinterests / behavior.xar;
/Animated Say</name >
    filename;
"bh_getinterests/behavior.xar";
line = "0" /  >
    Well;
done;
Thank;
you;
for (playing; Now; let)
    ;
s;
look;
at;
some;
pictures;
together. < /source>
    < comment > Text < /comment>
    < translation;
type = "unfinished" > Well;
done;
Thank;
you;
for (playing; Now; let)
    ;
s;
look;
at;
some;
pictures;
together. < /translation>
    < /message>
    < /context>
    < context >
    bh_getinterests / behavior.xar;
/Animated Say (1)</name >
    filename;
"bh_getinterests/behavior.xar";
line = "0" /  >
    Do;
you;
like;
these ? /source>
    < comment > Text < /comment>
    < translation : ;
type = "unfinished" > Do;
you;
like;
these ? /translation>
    < /message>
    < /context>
    < context >
    bh_getskills / behavior.xar : /Animated Say</name >
    filename;
"bh_getskills/behavior.xar";
line = "0" /  >
    Let;
s;
play;
a;
game;
on;
my;
screen;
When;
you;
re;
done, tickle;
my;
head. < /source>
    < comment > Text < /comment>
    < translation;
type = "unfinished" > Let;
s;
play;
a;
game;
on;
my;
screen;
When;
you;
re;
done, tickle;
my;
head. < /translation>
    < /message>
    < /context>
    < context >
    bh_getskills / behavior.xar;
/Say</name >
    filename;
"bh_getskills/behavior.xar";
line = "0" /  >
    Aaah, that;
tickles < /source>
    < comment > Text < /comment>
    < translation;
type = "unfinished" > Aaah, that;
tickles < /translation>
    < /message>
    < /context>
    < context >
    bh_showhiddentalents / behavior.xar;
/Animated Say</name >
    filename;
"bh_showhiddentalents/behavior.xar";
line = "0" /  >
    Great, I;
think;
I;
know;
you;
now.You;
are;
interested in animals, but;
did;
you;
know;
that;
you;
also;
have;
talents;
to;
be;
a;
computer;
scientist ? /source>
    < comment > Text < /comment>
    < translation : ;
type = "unfinished" > Great, I;
think;
I;
know;
you;
now.You;
are;
interested in animals, but;
did;
you;
know;
that;
you;
also;
have;
talents;
to;
be;
a;
computer;
scientist ? /translation>
    < /message>
    < /context>
    < context >
    bh_showhiddentalents / behavior.xar : /Animated Say (1)</name >
    filename;
"bh_showhiddentalents/behavior.xar";
line = "0" /  >
    Let;
me;
show;
you;
how;
awesome;
this;
is < /source>
    < comment > Text < /comment>
    < translation;
type = "unfinished" > Let;
me;
show;
you;
how;
awesome;
this;
is < /translation>
    < /message>
    < /context>
    < /TS>;
