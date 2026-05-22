import cron from 'node-cron';
import prisma from '@configs/db';
import LogsUtils from '@utils/logs';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';

const limpezaConversasOcultas = cron.schedule('0 * * * *', async () => {
    const start = new Date();
    let task = '';
    let fim = new Date();
    let taskErro = '';
    try {
        const trintaDiasAtras = new Date();
        trintaDiasAtras.setDate(trintaDiasAtras.getDate() - 30);
        const deletados = await prisma.chat.deleteMany({
            where: {
                disabled: true,
                disabledAt: {
                    lt: trintaDiasAtras
                }
            }
        });
        const message = `Conversas desabilitadas removidas: ${deletados.count}`;
        task = message;
        console.log(message);
    } catch (err) {
        const erro = err as ErrorCustomVS;
        taskErro = 'Erro ao remover conversas desabilitadas: ' + erro.message;
        console.error('Erro ao remover conversas desabilitadas: ', erro)
    } finally {
        fim = new Date();
        LogsUtils.logCronTasks({
            init: new Date(start),
            end: new Date(fim),
            type: taskErro ? 'ERROR' : 'SUCCESS',
            message: taskErro || task
        });
    }
}, {
    timezone: 'America/Sao_Paulo'
});

export default limpezaConversasOcultas;