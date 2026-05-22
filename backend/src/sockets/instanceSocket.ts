import { Server, Socket } from 'socket.io';
import { setupChat } from './chatSocket';
import { setupNotifications } from './notificationSocket';
import jwt from 'jsonwebtoken';
import { AccessTokenPayload } from '@interfaces/cookiesEntity';

// Função para parsear cookies manualmente
function parseCookies(cookieString: string): Record<string, string> {
    const cookies: Record<string, string> = {};
    if (!cookieString) return cookies;
    
    cookieString.split(';').forEach(cookie => {
        const [name, value] = cookie.trim().split('=');
        if (name && value) {
            cookies[name] = decodeURIComponent(value);
        }
    });
    return cookies;
}

let ioVS: Server;

export function setupSockets(io: Server) {
    ioVS = io;

    ioVS.use((socket, next) => {
        try {
            const cookieHeader = socket.handshake?.headers?.cookie || '';
            
            if (!cookieHeader) {
                console.error('[Socket Auth] ❌ Nenhum header de cookie encontrado');
                return next(new Error('Autenticação necessária.'));
            }

            const cookies = parseCookies(cookieHeader);
            const token = cookies.accessToken;

            if (!token) {
                console.error('[Socket Auth] ❌ Nenhum token encontrado no cookie');
                console.debug('[Socket Auth] Cookies recebidos:', Object.keys(cookies));
                return next(new Error('Autenticação necessária.'));
            }

            const user = jwt.verify(token, process.env.JWT_SECRET!) as AccessTokenPayload;
            socket.data.user = user;
            console.log(`[Socket Auth] ✅ Usuário autenticado: ${user.id} (${user.tipo})`);
            next();
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : String(err);
            console.error('[Socket Auth] ❌ Erro de autenticação:', errorMsg);
            next(new Error('Sessão inválida ou expirada.'));
        }
    });

    ioVS.on('connection', (socket: Socket) => {
        console.log(`[Socket] ✅ Nova conexão: ${socket.id}`);
        setupChat(io, socket);
        setupNotifications(io, socket);
    });

    ioVS.on('connect_error', (error: any) => {
        console.error('[Socket] ❌ Erro na conexão:', error);
    });
}

export function ioEmitToRoom(room: string, event: string, data: object) {
    if (!ioVS) throw new Error('Sockets não inicializados.');
    ioVS.to(room).emit(event, data);
}
