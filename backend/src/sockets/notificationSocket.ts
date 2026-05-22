import { Server, Socket } from 'socket.io';
import type { UUID } from 'crypto';
import { ioEmitToRoom } from './instanceSocket';

export interface NotificationData {
    chatId: string;
    senderName: string;
    text: string;
}

export const emitNotification = (userId: string, data: NotificationData) => {
    ioEmitToRoom(`user:${userId}`, 'newNotification', data);
}

export const setupNotifications = (io: Server, socket: Socket) => {

    const user = socket.data.user;

    // Join room for individual user notifications
    socket.join(`user:${user.id}`);

}
