import cron from 'node-cron';
import prisma from '@configs/db';
import LogsUtils from '@utils/logs';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';

const pendingCandidatesCleanup = cron.schedule('*/10 * * * *', async () => {
  const start = new Date();
  let task = '';
  let end = new Date();
  let taskError = '';
  try{
    /*
    const deleted = await prisma.pend_candidates.deleteMany({
      where: {
        expires_in: {
          lt: new Date()
        }
      }
    });
    const message = `Candidatos com codigos expirados removidos: ${deleted.count}`
    task = message;
    console.log(message);
    */
    taskError = 'Model missing in schema';
  }
  catch(err){
    const erro = err as ErrorCustomVS;
    taskError = 'Erro ao remover candidatos com codigos expirados: ' + erro.message;
    console.error('Erro ao remover candidatos com codigos expirados:', erro);
  }
  finally{
    end = new Date();
    LogsUtils.logCronTasks({
      init: new Date(start),
      end: new Date(end),
      type: taskError ? 'ERROR' : 'SUCCESS',
      message: taskError || task
    });
  }
}, {
  timezone: 'America/Sao_Paulo'
});

export default pendingCandidatesCleanup;