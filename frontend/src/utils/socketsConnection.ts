import { io, Socket } from "socket.io-client";

const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:2923";

const socket: Socket = io(apiUrl, {
    withCredentials: true,
    auth: (cb) => {
        cb({ token: localStorage.getItem('vivaju_socket_token') || undefined });
    },
    reconnection: true,
    reconnectionDelay: 1000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: Infinity,
    transports: ['websocket', 'polling'],
});

// Log de erros para debug
socket.on('connect', () => {
    console.log('✅ Socket conectado com sucesso!');
});

socket.on('connect_error', (error) => {
    console.error('❌ Erro de conexão WebSocket:', error);
});

socket.on('disconnect', (reason) => {
    console.warn('⚠️ Socket desconectado. Motivo:', reason);
});

export default socket;
