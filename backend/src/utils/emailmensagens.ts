import { IS_PRODUCTION } from "./constants";

const dominio = IS_PRODUCTION?'https://www.emprego-vagas.com.br':'http://localhost:3000';

interface ChatForSave {
    id: string;
    created_at: Date;
    candidates: {
        id: string;
        email: string;
        name: string;
    };
    companies: {
        id: string;
        name: string;
        email: string;
    };
    messages: {
        id: string;
        created_at: Date;
        message: string;
        by: string;
    }[];
}

class EmailMessages {
    
    static codeVerificationHTML(name: string, code: string) {
        return `
            <div style="
                font-family: Arial, sans-serif;
                background-color: #1a1a1a;
                color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                max-width: 500px;
                margin: auto;
                border: 2px solid #7b2ff7;
            ">
                <div style="text-align: center;">
                    <h1 style="color: #7b2ff7; margin-bottom: 10px;">EmpreGo</h1>
                    <p style="font-size: 16px; color: #d1d1d1;">
                        Olá <strong>${name}</strong>! 👋
                    </p>
                    <p style="font-size: 16px; color: #d1d1d1;">
                        Aqui está o seu código de verificação para concluir o cadastro:
                    </p>
                    <div style="
                        background-color: #7b2ff7;
                        color: #ffffff;
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 5px;
                        padding: 15px 0;
                        border-radius: 8px;
                        margin: 25px 0;
                    ">
                        ${code}
                    </div>
                    <p style="font-size: 14px; color: #aaaaaa;">
                        Este código expira em <strong>15 minutos</strong>.<br>
                        Caso não tenha solicitado este e-mail, ignore esta mensagem.
                    </p>
                    <hr style="border: none; border-top: 1px solid #333; margin: 25px 0;">
                    <p style="font-size: 13px; color: #666;">
                        © ${new Date().getFullYear()} EmpreGo — Conectando talentos ao futuro.
                    </p>
                </div>
            </div>
        `;
    };

    static resendVerificationCodeHTML(name: string, code: string) {
        return `
            <div style="
                font-family: Arial, sans-serif;
                background-color: #1a1a1a;
                color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                max-width: 500px;
                margin: auto;
                border: 2px solid #7b2ff7;
            ">
                <div style="text-align: center;">
                    <h1 style="color: #7b2ff7; margin-bottom: 10px;">EmpreGo</h1>
                    <p style="font-size: 16px; color: #d1d1d1;">
                        Olá <strong>${name}</strong>! 👋
                    </p>
                    <p style="font-size: 16px; color: #d1d1d1;">
                        Você solicitou um novo código de verificação para concluir seu cadastro:
                    </p>
                    <div style="
                        background-color: #7b2ff7;
                        color: #ffffff;
                        font-size: 32px;
                        font-weight: bold;
                        letter-spacing: 5px;
                        padding: 15px 0;
                        border-radius: 8px;
                        margin: 25px 0;
                    ">
                        ${code}
                    </div>
                    <p style="font-size: 14px; color: #aaaaaa;">
                        Este código expira em <strong>15 minutos</strong>.<br>
                        Caso não tenha solicitado este e-mail, ignore esta mensagem.
                    </p>
                    <hr style="border: none; border-top: 1px solid #333; margin: 25px 0;">
                    <p style="font-size: 13px; color: #666;">
                        © ${new Date().getFullYear()} EmpreGo — Conectando talentos ao futuro.
                    </p>
                </div>
            </div>
        `;
    };

    static passwordChangeRequestHTML(name: string, token: string, randomWord: string, code: string, candidateId: string) {
        return `
            <div style="
                font-family: Arial, sans-serif;
                background-color: #1a1a1a;
                color: #ffffff;
                padding: 30px;
                border-radius: 10px;
                max-width: 500px;
                margin: auto;
                border: 2px solid #7b2ff7;
            ">
                <div style="text-align: center;">
                    <h1 style="color: #7b2ff7; margin-bottom: 10px;">EmpreGo</h1>
                    <p style="font-size: 16px; color: #d1d1d1;">
                        Olá, ${name}! 👋
                    </p>
                    <p style="font-size: 16px; color: #d1d1d1;">
                        Recebemos uma solicitação para trocar sua senha. Clique no botão abaixo para prosseguir:
                    </p>
                    <a href="${dominio}/trocarsenha?t=${token}&p=${randomWord}&c=${code}&i=${candidateId}" target="_blank" style="
                        display: inline-block;
                        background-color: #7b2ff7;
                        color: #ffffff;
                        font-size: 18px;
                        font-weight: bold;
                        padding: 12px 25px;
                        border-radius: 8px;
                        text-decoration: none;
                        margin: 25px 0;
                    ">
                        Trocar Senha
                    </a>
                    <p style="font-size: 14px; color: #aaaaaa;">
                        Este link expira em <strong>10 minutos</strong>.<br>
                        Caso não tenha solicitado esta troca, ignore este e-mail.
                    </p>
                    <hr style="border: none; border-top: 1px solid #333; margin: 25px 0;">
                    <p style="font-size: 13px; color: #666;">
                        © ${new Date().getFullYear()} EmpreGo — Conectando talentos ao futuro.
                    </p>
                </div>
            </div>
        `
    }

    static chatCopyRequestHTML(userName: string, otherUserName: string, amount: number) {
        return `
            <div style="
                font-family: Arial, sans-serif;
                background-color: #0f0f10;
                color: #ffffff;
                padding: 28px;
                border-radius: 12px;
                max-width: 680px;
                margin: 20px auto;
                border: 2px solid #7b2ff7;
            ">
                <div style="text-align: center;">
                    <h1 style="color: #7b2ff7; margin: 0 0 8px 0; font-size: 28px;">EmpreGo</h1>
                    <p style="margin: 6px 0 20px 0; color: #d1d1d1; font-size: 15px;">
                        Olá <strong>${userName}</strong> 👋
                    </p>
                </div>

                <div style="background-color:#121214; padding:18px; border-radius:10px; border:1px solid #27272a;">
                    <h2 style="margin:0 0 8px 0; font-size:18px; color: #ffffff;">
                        Cópia das mensagens com: ${otherUserName}
                    </h2>

                    <p style="margin:0 0 10px 0; color:#bfbfbf; font-size:14px;">
                        Preparamos um arquivo com <strong>${amount}</strong> mensagem(ns) da conversa, de acordo com a solicitação.
                    </p>

                    <p style="font-size:13px; color:#aaaaaa; margin:0 0 8px 0;">
                        O arquivo contendo as mensagens está anexado a este e-mail.
                    </p>

                    <p style="font-size:13px; color:#aaaaaa; margin:0 0 8px 0;">
                        Se você não solicitou este arquivo, pode ignorar esta mensagem.
                    </p>

                    <hr style="border:none; border-top:1px solid #262626; margin:18px 0;">
                </div>

                <div style="text-align:center; margin-top:18px;">
                    <p style="font-size:13px; color:#6f6f6f; margin:0;">
                        © ${new Date().getFullYear()} EmpreGo — Conectando talentos ao futuro.
                    </p>
                    <p style="font-size:11px; color:#4f4f4f; margin:6px 0 0 0;">
                        Caso haja algum problema com o arquivo, acesse 
                        <a href="${dominio}/suporte" target="_blank" style="color:#bfa0ff; text-decoration:none;">
                            ${dominio}/suporte
                        </a>.
                    </p>
                </div>
            </div>
        `;
    }

    static chatSaveFileContent(chat: ChatForSave, amount: number){
        const comecoEmailContet = `
==================================================================================
Mensagens do Chat - ${chat.id}
Empresa: ${chat.companies.name} (ID: ${chat.companies.id})
Candidato: ${chat.candidates.name} (ID: ${chat.candidates.id})
Quantidade de mensagens solicitadas: ${amount}
Quantidade de mensagens encontradas: ${chat.messages.length}
Data de criação do chat: ${chat.created_at.toLocaleString('pt-BR')}
Data da exportação: ${new Date().toLocaleString('pt-BR')}
==================================================================================

`;
        const emailContent = chat.messages.map(msg=>
            `[${msg.created_at.toLocaleString('pt-BR')}] ${msg.by}: ${msg.message}    /// ${msg.id}`
        );
        const fimEmailContent = `\n\n
==================================================================================
Fim das mensagens do Chat - ${chat.id}
==================================================================================`;

        return [comecoEmailContet, ...emailContent, fimEmailContent].join('\n');
    }

}

export default EmailMessages;