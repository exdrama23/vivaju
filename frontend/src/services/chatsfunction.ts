import axiosWe from "../utils/axiosInstance";

export interface Mensagem {
    id: string;
    texto: string;
    remetente: 'usuario' | 'eles';
    hora: string;
    datetime: Date;
    lida: boolean;
}

export interface Conversa {
    id: string;
    bloqueadoStatus: boolean;
    bloqueador: string | null;
    remetente: string;
    statusRemetente: string;
    nome: string;
    ultimaMensagem: string;
    ultimaMensagemId: string;
    data_criacao: string;
    hora: string;
    naoLidas: number;
    avatar: string | null;
    mensagens: Mensagem[];
    contadorMensagens: number;
}

export interface MessageSocket {
    text: string;
    id: string;
    chatId: string;
    userType: 'cliente' | 'loja';
}

export interface UserStatusSocket {
    status: string;
    userId?: string;
    chatId: string;
}

export interface TypingSocket {
    chatId: string;
    userId: string;
    isTyping: boolean;
}

export interface ReadMessagesSocket {
    chatId: string;
    userId: string;
}

interface CarregarConversasBackResponse {
    conversas: Conversa[];
    conversaAtual: string;
}

function normalizeUserType(userType: string) {
    return userType === 'comerciante' ? 'loja' : userType;
}

export async function carregarConversasBack(usuario: { tipo: string, nome: string, id: string }, idAtual: string): Promise<CarregarConversasBackResponse> {
    const response = usuario.tipo === 'cliente' ? await axiosWe('/custom/chats-clientes') : await axiosWe('/custom/chats-lojas');
    const data = response.data.data.chats;

    const conversas = data.map((chat: any) => conversaConstructor(normalizeUserType(usuario.tipo), chat));
    let conversaAtual = idAtual || '0';

    const conversasSorted = [...conversas].sort((a, b) => {
        const dataA = a.mensagens.length > 0 ? new Date(a.mensagens[a.mensagens.length - 1].datetime).getTime() : new Date(a.data_criacao).getTime();
        const dataB = b.mensagens.length > 0 ? new Date(b.mensagens[b.mensagens.length - 1].datetime).getTime() : new Date(b.data_criacao).getTime();
        return dataB - dataA;
    });

    return { conversas: conversasSorted, conversaAtual };
}

export function conversaConstructor(usuarioTipo: string, chat: any): Conversa {
    const tipoNormalizado = normalizeUserType(usuarioTipo);
    const outroUsuario = tipoNormalizado === 'cliente' ? chat.loja : chat.cliente;

    return {
        id: chat.id,
        bloqueadoStatus: chat.bloqueado,
        bloqueador: chat.bloqueadorTipo,
        remetente: outroUsuario.id,
        statusRemetente: 'Offline',
        nome: outroUsuario.nome,
        ultimaMensagem: chat.mensagens[0]?.conteudo || '',
        ultimaMensagemId: chat.mensagens[0]?.id || '',
        data_criacao: chat.dataCriacao,
        hora: (() => {
            const msg = chat.mensagens[0]?.dataCriacao;
            if (!msg) return '';
            const horario = new Date(msg);
            return `${String(horario.getHours()).padStart(2, '0')}:${String(horario.getMinutes()).padStart(2, '0')}`;
        })(),
        naoLidas: chat.mensagens.reduce((ac: number, msg: any) => {
            if (msg.enviadoPor !== tipoNormalizado && !msg.lida) ac++;
            return ac;
        }, 0),
        avatar: outroUsuario.imagem || null,
        mensagens: chat.mensagens.map((msg: any) => ({
            texto: msg.conteudo,
            remetente: msg.enviadoPor === tipoNormalizado ? 'usuario' : 'eles',
            hora: (() => {
                const horario = new Date(msg.dataCriacao);
                return `${String(horario.getHours()).padStart(2, '0')}:${String(horario.getMinutes()).padStart(2, '0')}`;
            })(),
            datetime: new Date(msg.dataCriacao),
            id: msg.id,
            lida: msg.lida
        })),
        contadorMensagens: chat.mensagens.length
    };
}

export async function enviarMensagem(mensagem: string, conversaAtualId: string): Promise<{ success: boolean, id?: string, texto?: string, hora?: string }> {
    try {
        const response = await axiosWe.post('/message', {
            message: mensagem,
            chatId: conversaAtualId,
        });
        const agora = new Date();
        const hora = `${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;
        return { success: true, id: response.data.id, texto: mensagem, hora };
    } catch (erro) {
        console.error(erro);
        return { success: false };
    }
}

export async function criarOuBuscarChat(lojaId: string): Promise<string> {
    try {
        const response = await axiosWe.post('/chat', { lojaId });
        return response.data.data.id;
    } catch (erro: any) {
        console.error('Erro ao criar/buscar chat:', erro);
        const msg = erro.response?.data?.error || 'Não foi possível iniciar a conversa.';
        alert(msg);
        return '0';
    }
}
