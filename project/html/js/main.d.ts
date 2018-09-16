declare function startApp(): Promise<void>;
declare class RobotUtilsCls {
    constructor();
    waitForServices(...serviceList: any[]): void;
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
    onServices(servicesCallback: any, errorCallback: any): void;
    onService(servicesCallback: any, errorCallback: any): void;
    /**
     * Helper to get services, and eventually retry if required.
     */
    getService(session: any, index: any, serviceName: any, onSuccess: any, onFailure: any): void;
    /**
     *  RobotUtils.subscribeToALMemoryEvent(event, eventCallback, subscribeDoneCallback)
     *
     * connects a callback to an ALMemory event. Returns a MemoryEventSubscription.
     *
     * This is just syntactic sugar over calls to the ALMemory service, which you can
     * do yourself if you want finer control.
     */
    subscribeToALMemoryEvent(eventName: any, eventCallback: any, subscribeDoneCallback: any): MemoryEventSubscription;
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
    connect(connectedCallback: any, failureCallback: any): void;
    getScript(source: any, successCallback: any, failureCallback: any): void;
    _getRobotIp(): string;
    getParamNames(func: any): any;
    onALMemoryError(errMsg: any): void;
}
declare class MemoryEventSubscription {
    constructor(event: any);
    setId(id: any): void;
    setSubscriber(sub: any): void;
    unsubscribe(unsubscribeDoneCallback: any): void;
    onALMemoryError(errMsg: any): void;
}
