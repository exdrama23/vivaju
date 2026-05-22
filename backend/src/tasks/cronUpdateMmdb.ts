import cron from 'node-cron';
import LogsUtils from '@utils/logs';
import type { ErrorCustomVS } from '@interfaces/customErrorEntity';
const { updateALL } = require('../../scripts/updateMmdb.cjs')

const cronUpdateMmdb = cron.schedule('0 0 * * *', async ()=>{
    const start = new Date();
    let task = '';
    let end = new Date();
    let taskError = '';
    try {
        await updateALL()
        const message = `Tarefa de autalização do MMDB realizada com sucesso`;
        task = message;
        console.log(message);
    } catch (err) {
        const erro = err as ErrorCustomVS;
        taskError = 'Erro ao atualizar MMDB: ' + erro.message;
        console.error('Erro ao atualizar MMDB:', erro);
    } finally {
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

export default cronUpdateMmdb;