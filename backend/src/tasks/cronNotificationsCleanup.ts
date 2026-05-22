import cron from 'node-cron';
import prisma from '@configs/db';
import LogsUtils from '@utils/logs';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';

const notificationsCleanup = cron.schedule('0 * * * *', async () => {
    const start = new Date();
    let task = '';
    let end = new Date();
    let taskError = '';
    try {
        /*
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const filter = {
            created_at: {
                lt: sevenDaysAgo
            },
            read: true as const
        };
        const [deleteCandResult, deleteCompResult] = await Promise.all([
            prisma.cand_notifications.deleteMany({
                where: filter
            }),
            prisma.comp_notifications.deleteMany({
                where: filter
            })
        ]);
        const message = `Notificações removidas: ${deleteCandResult.count + deleteCompResult.count}`;
        task = message;
        console.log(message);
        */
        taskError = 'Model missing in schema';
    } catch (err) {
        const erro = err as ErrorCustomVS;
        taskError = 'Erro ao remover notificações: ' + erro.message;
        console.error('Erro ao remover notificações:', erro)
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

export default notificationsCleanup;