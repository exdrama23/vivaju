import fs from 'fs';
import path from 'path';
const logDir = path.join(__dirname, '../generated/logs');

if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

class LogsUtils {

    static logCronTasks(params: {
        init: Date;
        end: Date;
        type: 'SUCCESS' | 'ERROR' | 'INFO';
        message: string;
    }) {
        const { end, init, type, message } = params;
        const log = `[Início: ${init.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}] ${type}: ${message} [Fim: ${end.toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}]\n`;
        fs.appendFile(path.join(logDir, 'cron-tasks.log'), log, erro => {
            if (erro) console.error('Erro ao salvar log da cron-task:', erro);
        });
    }

}

export default LogsUtils;