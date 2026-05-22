/*
!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
!-=-=-=-=-DEPRECATED=-=-=-=-=-
!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
!-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
*/



// import cron from 'node-cron';
// import prisma from '@configs/db';
// import LogsUtils from '@utils/logs';
// import type { ErrorCustomVS } from '@interfaces/customErrorEntity';

// const sessionsCleanup = cron.schedule('0 * * * *', async () => {
//   const start = new Date();
//   let task = '';
//   let end = new Date();
//   let taskError = '';
//   try{
//     /*
//     const deleted = await prisma.sessions.deleteMany({
//       where: {
//         expires_in: {
//           lt: new Date()
//         }
//       }
//     });
//     const message = `Sessões expiradas removidos: ${deleted.count}`;
//     task = message;
//     console.log(message);
//     */
//     taskError = 'Model missing in schema';
//   }
//   catch(err){
//     const error = err as ErrorCustomVS;
//     taskError = 'Erro ao remover sessões expiradas: ' + error.message;
//     console.error('Erro ao remover sessões expiradas:', error);
//   }
//   finally{
//     end = new Date();
//     LogsUtils.logCronTasks({
//       init: new Date(start),
//       end: new Date(end),
//       type: taskError ? 'ERROR' : 'SUCCESS',
//       message: taskError || task
//     });
//   }
// }, {
//   timezone: 'America/Sao_Paulo'
// });

// export default sessionsCleanup;