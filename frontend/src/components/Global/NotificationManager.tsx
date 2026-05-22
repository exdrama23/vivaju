import React, { useEffect, useState } from 'react';
import socket from '../../utils/socketsConnection';
import { useAuth } from '../../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import { MessageCircle, X } from 'lucide-react';
import gsap from 'gsap';

export const NotificationManager: React.FC = () => {
    const { user } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const [notification, setNotification] = useState<{ chatId: string, senderName: string, text: string } | null>(null);

    useEffect(() => {
        if (!user) return;

        const handleNewNotification = (data: { chatId: string, senderName: string, text: string }) => {
            // Não mostrar notificação se já estiver na página de chats e no chat específico
            const params = new URLSearchParams(location.search);
            const currentChatId = params.get('id');
            
            if (location.pathname === '/chats' && currentChatId === data.chatId) return;

            setNotification(data);
            
            // Auto hide after 5 seconds
            setTimeout(() => {
                setNotification(null);
            }, 5000);
        };

        socket.on('newNotification', handleNewNotification);

        return () => {
            socket.off('newNotification', handleNewNotification);
        };
    }, [user, location]);

    useEffect(() => {
        if (notification) {
            gsap.fromTo(".notification-toast", 
                { x: 100, opacity: 0 }, 
                { x: 0, opacity: 1, duration: 0.5, ease: "back.out(1.7)" }
            );
        }
    }, [notification]);

    if (!notification) return null;

    return (
        <div 
            className="notification-toast fixed bottom-6 right-6 z-[9999] bg-white border border-gray-100 shadow-2xl rounded-2xl p-4 flex items-center gap-4 cursor-pointer hover:bg-orange-50 transition-colors w-80"
            onClick={() => {
                navigate(`/chats?id=${notification.chatId}`);
                setNotification(null);
            }}
        >
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center text-white shrink-0">
                <MessageCircle size={24} />
            </div>
            <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 text-sm truncate">{notification.senderName}</h4>
                <p className="text-xs text-gray-600 truncate">{notification.text}</p>
            </div>
            <button 
                onClick={(e) => {
                    e.stopPropagation();
                    setNotification(null);
                }}
                className="p-1 hover:bg-gray-200 rounded-full text-gray-400"
            >
                <X size={16} />
            </button>
        </div>
    );
};
