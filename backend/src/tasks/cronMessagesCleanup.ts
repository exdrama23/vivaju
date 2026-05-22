import cron from 'node-cron';
import prisma from '@configs/db';
import LogsUtils from '@utils/logs';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';

const messagesCleanup = cron.schedule('0 * * * *', async () => {
  const start = new Date();
  let task = '';
  let end = new Date();
  let taskError = '';
  try{
    const thirtyDaysAgo = new Date();
    thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
    const deleted = await prisma.mensagem.deleteMany({
      where: {
        dataCriacao: {
          lt: thirtyDaysAgo
        }
      }
    });
    const mensagem = `Mensagens antigas removidas: ${deleted.count}`;
    task = mensagem;
    console.log(mensagem);
  }
  catch(err){
    const erro = err as ErrorCustomVS;
    taskError = 'Erro ao remover mensagens antigas: ' + erro.message;
    console.error('Erro ao remover mensagens antigas:', erro)
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

export default messagesCleanup;