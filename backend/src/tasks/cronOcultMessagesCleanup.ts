import cron from 'node-cron';
import prisma from '@configs/db';
import LogsUtils from '@utils/logs';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';

const ocultMessagesCleanup = cron.schedule('0 * * * *', async () => {
    const start = new Date();
    let task = '';
    let end = new Date();
    let taskError = '';
    try {
        /*
        const deleteResult = await prisma.mensagem.deleteMany({
            where: {
                AND: [
                    { ocult_cand_messages: { some: {} } },
                    { ocult_comp_messages: { some: {} } }
                ]
            }
        });
        const message = `Mensagens ocultas removidas: ${deleteResult.count}`;
        task = message;
        console.log(message);
        */
        taskError = 'Model missing in schema';
    } catch (err) {
        const erro = err as ErrorCustomVS;
        taskError = 'Erro ao remover mensagens ocultas: ' + erro.message;
        console.error('Erro ao remover mensagens ocultas:', erro)
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

export default ocultMessagesCleanup;