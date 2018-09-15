const application = function() {
  let ALMemory = null;

  const log = function(l) {
    if (console) console.log(l);
  };

  $('#touch_me').click(() => {
    $('#touch_me').fadeOut(() => {
      setTimeout(() => {
        $('#touch_me').fadeIn();
      }, 3000);
    });
  });

  function changeBGColor(data) {
    const bg_animation = data[2];
    const bg_color1 = data[0];
    const bg_color2 = null;
    const bg_duration = data[1];
    $('body').animate({ 'background-color': bg_color1 }, bg_duration, bg_animation);
  }

  /* QiSession Events*/

  const onConnected = function(session) {
    log('connected');
    session.service('ALMemory').then(
      (serv) => {
        ALMemory = serv;
      },
      (error) => {
        log(`Unable to get the service ALMemory : ${ error}`);
      }
    );
    RobotUtils.subscribeToALMemoryEvent('template/changeBGColor', changeBGColor);
  };

  const onError = function() {
    log('Disconnected, or failed to connect :-(');
  };

  const init = function() {
    RobotUtils.connect(
      onConnected,
      onError
    ); // async !
    return this;
  };

  return init();
};
