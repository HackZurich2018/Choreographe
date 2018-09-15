async function startApp() {
  const ALMemory = null;

  async function init() {
    const session = await connect();
    const tts = await session.service('ALTextToSpeech');
    tts.say('hello naoqi');
    // const alMemory = await session.service('ALMemory');
    // const tts = subscribeToALMemoryEvent('template/changeBGColor', changeBGColor);
  }

  function connect() {
    return new Promise((resolve, reject) =>
      QiSession(
        session => {
          console.log('connected!');
          resolve(session);
        },
        () => {
          console.log('disconnected');
          reject();
        }
      )
    );
  }

  // $('#touch_me').click(() => {
  //   $('#touch_me').fadeOut(() => {
  //     setTimeout(() => {
  //       $('#touch_me').fadeIn();
  //     }, 3000);
  //   });
  // });

  // function changeBGColor(data) {
  //   const bg_animation = data[2];
  //   const bg_color1 = data[0];
  //   const bg_color2 = null;
  //   const bg_duration = data[1];
  //   $('body').animate({ 'background-color': bg_color1 }, bg_duration, bg_animation);
  // }

  /* QiSession Events*/

  init();
}

$(document).ready(_ => startApp());
