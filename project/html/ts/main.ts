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
