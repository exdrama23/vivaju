import { useNavigate } from 'react-router-dom';
import { useEffect, useRef, useState, type ChangeEvent } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHouse, faStar, faGear, faReply, faSearch, faEllipsisVertical, faBan, faChevronLeft, faWifi, faPaperPlane, faCheck, faCheckDouble, faTimes } from '@fortawesome/free-solid-svg-icons';

import '../App.css'; 

import { carregarConversasBack, enviarMensagem } from '../services/chatsfunction';
import axiosWe from '../utils/axiosInstance';
import socket from '../utils/socketsConnection';
import { useAuth } from '../context/AuthContext';
import type { Conversa, Mensagem, MessageSocket, UserStatusSocket, TypingSocket, ReadMessagesSocket } from "../services/chatsfunction";

export default function Chats() {
    const logoCaju = 'https://res.cloudinary.com/dcqks32rh/image/upload/q_auto/f_auto/v1778259234/Logo_jwzmd2.png';
    const navigate = useNavigate();
    const { user: usuario } = useAuth();
    const [carregando, setCarregando] = useState(true);
    const [conversaAtualId, setConversaAtualId] = useState('0');
    const [dadosConversas, setDadosConversas] = useState<Conversa[]>([]);
    const messagesContainerRef = useRef<HTMLDivElement | null>(null);
    const [mostrarMenu, setMostrarMenu] = useState(false);
    const [mensagemEnvio, setMensagemEnvio] = useState('');
    const textareaRef = useRef<HTMLTextAreaElement | null>(null);
    const btnEnviarRef = useRef<HTMLButtonElement | null>(null);
    const [isOtherUserTyping, setIsOtherUserTyping] = useState(false);
    const [searchMessages, setSearchMessages] = useState('');
    const [showSearch, setShowSearch] = useState(false);
    const [socketStatus, setSocketStatus] = useState<'connecting' | 'connected' | 'disconnected'>(socket.connected ? 'connected' : 'connecting');
    const [isSendingMessage, setIsSendingMessage] = useState(false);
    const typingTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
    const isSendingMessageRef = useRef(false);

    const conversaAtualIdRef = useRef(conversaAtualId);
    useEffect(() => {
        conversaAtualIdRef.current = conversaAtualId;
    }, [conversaAtualId]);

    // Esconde a nav mobile quando uma conversa específica está aberta
    useEffect(() => {
        try {
            if (conversaAtualId !== '0') {
                document.body.classList.add('hide-mobile-nav');
                sessionStorage.setItem('vivaju_active_chat_id', conversaAtualId);
            } else {
                document.body.classList.remove('hide-mobile-nav');
                sessionStorage.removeItem('vivaju_active_chat_id');
            }
        } catch (e) {
            // ignore em ambientes sem DOM
        }

        return () => {
            try {
                document.body.classList.remove('hide-mobile-nav');
                sessionStorage.removeItem('vivaju_active_chat_id');
            } catch { }
        };
    }, [conversaAtualId]);

    const scrollToBottom = (behavior: ScrollBehavior = 'smooth') => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTo({
                top: messagesContainerRef.current.scrollHeight,
                behavior
            });
        }
    };

    const ordenarMensagens = (mensagens: Mensagem[]) => [...mensagens].sort((a, b) => {
        const tempoA = new Date(a.datetime).getTime();
        const tempoB = new Date(b.datetime).getTime();
        if (tempoA !== tempoB) return tempoA - tempoB;
        return a.id.localeCompare(b.id);
    });

    const isConnected = socketStatus === 'connected';

    useEffect(() => {
        if (!usuario) {
            navigate('/login');
            return;
        }

        const handleConnect = () => setSocketStatus('connected');
        const handleDisconnect = () => setSocketStatus('disconnected');
        const handleConnectError = () => setSocketStatus('disconnected');

        socket.on('connect', handleConnect);
        socket.on('disconnect', handleDisconnect);
        socket.on('connect_error', handleConnectError);

        const params = new URLSearchParams(window.location.search);
        const id = params.get('id');

        async function carregar() {
            try {
                const result = await carregarConversasBack(usuario as any, id || '');
                setDadosConversas(result.conversas);
                if (result.conversaAtual !== '0') {
                    setConversaAtualId(result.conversaAtual);
                }
                socket.emit('joinChats');
                setCarregando(false);
            } catch (erro) {
                console.error("Erro ao carregar conversas:", erro);
                setCarregando(false);
            }
        }
        carregar();

        const handleMessage = (message: MessageSocket) => {
            const agora = new Date();

            const normalize = (t?: string) => t === 'loja' ? 'comerciante' : t;
            if (normalize(message.userType) === normalize(usuario?.tipo)) return;

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            
            const hora = `${agora.getHours().toString().padStart(2, '0')}:${agora.getMinutes().toString().padStart(2, '0')}`;
            const messageFormat: Mensagem = { texto: message.text, remetente: 'eles', hora, id: message.id, datetime: agora, lida: false };

            setDadosConversas(prev => {
                const novasConversas = prev.map(conversa =>
                    conversa.id === message.chatId
                        ? {
                            ...conversa,
                            mensagens: ordenarMensagens([...conversa.mensagens, messageFormat]),
                            contadorMensagens: conversa.mensagens.length + 1,
                            ultimaMensagem: message.text,
                            naoLidas: conversaAtualIdRef.current === message.chatId ? 0 : conversa.naoLidas + 1,
                        }
                        : conversa
                );

                if (conversaAtualIdRef.current === message.chatId) {
                    setTimeout(() => scrollToBottom('smooth'), 100);
                    axiosWe.patch(`/message/chat/${message.chatId}/view`).catch(console.error);
                    socket.emit('markAsRead', { chatId: message.chatId });
                }

                return novasConversas;
            });
        };

        const handleStatus = (user: UserStatusSocket) => {
            if (user.userId === usuario?.id) return;
            setDadosConversas(prev => prev.map(conversa =>
                conversa.id === user.chatId ? { ...conversa, statusRemetente: user.status } : conversa
            ));
        };

        const handleTyping = (data: TypingSocket) => {
            if (data.chatId === conversaAtualIdRef.current && data.userId !== usuario?.id) {
                setIsOtherUserTyping(data.isTyping);
                if (data.isTyping) setTimeout(() => scrollToBottom('smooth'), 100);
            }
        };

        const handleRead = (data: ReadMessagesSocket) => {
            if (data.chatId === conversaAtualIdRef.current && data.userId !== usuario?.id) {
                setDadosConversas(prev => prev.map(conversa => {
                    if (conversa.id === data.chatId) {
                        return {
                            ...conversa,
                            mensagens: conversa.mensagens.map(m => m.remetente === 'usuario' ? { ...m, lida: true } : m)
                        };
                    }
                    return conversa;
                }));
            }
        };

        socket.on('receivedMessage', handleMessage);
        socket.on('userStatus', handleStatus);
        socket.on('userTyping', handleTyping);
        socket.on('messagesRead', handleRead);

        return () => {
            socket.off('connect', handleConnect);
            socket.off('disconnect', handleDisconnect);
            socket.off('connect_error', handleConnectError);
            socket.off('receivedMessage', handleMessage);
            socket.off('userStatus', handleStatus);
            socket.off('userTyping', handleTyping);
            socket.off('messagesRead', handleRead);
        };
    }, [usuario, navigate]);

    const handleBloquear = async () => {
        if (!conversaAtualId || !conversaAtual) return;
        try {
            const novoStatus = !conversaAtual.bloqueadoStatus;
            await axiosWe.patch(`/chat/${conversaAtualId}/block`, { blockStatus: novoStatus });
            setDadosConversas(prev => prev.map(c => 
                c.id === conversaAtualId ? { ...c, bloqueadoStatus: novoStatus, bloqueador: novoStatus ? usuario?.tipo || null : null } : c
            ));
            setMostrarMenu(false);
        } catch (err) {
            console.error(err);
        }
    };

    // const handleDesabilitar = async () => {
    //     if (!conversaAtualId) return;
    //     try {
    //         await axiosWe.patch(`/chat/${conversaAtualId}/disable`);
    //         setDadosConversas(prev => prev.filter(c => c.id !== conversaAtualId));
    //         setConversaAtualId('0');
    //         setMostrarMenu(false);
    //     } catch (err) {
    //         console.error(err);
    //     }
    // };

    useEffect(() => {
        if (conversaAtualId !== '0') {
            setTimeout(() => scrollToBottom('auto'), 50);
            if (textareaRef.current) textareaRef.current.focus();
            setIsOtherUserTyping(false);

            setDadosConversas(prev => prev.map(conversa => {
                if (conversa.id === conversaAtualId) {
                    if (conversa.naoLidas > 0) {
                        axiosWe.patch(`/message/chat/${conversaAtualId}/view`).catch(console.error);
                        socket.emit('markAsRead', { chatId: conversaAtualId });
                    }
                    return { ...conversa, naoLidas: 0 };
                }
                return conversa;
            }));
        }
    }, [conversaAtualId]);

    const handleChangeMsg = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setMensagemEnvio(e.target.value);
        e.target.style.height = 'auto';
        e.target.style.height = `${e.target.scrollHeight}px`;

        if (conversaAtualId !== '0') {
            socket.emit('typing', { chatId: conversaAtualId, isTyping: true });
            if (typingTimeoutRef.current) clearTimeout(typingTimeoutRef.current);
            typingTimeoutRef.current = setTimeout(() => {
                socket.emit('typing', { chatId: conversaAtualId, isTyping: false });
            }, 2000);
        }
    };

    if (carregando) return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
            <div className="w-16 h-16 bg-orange-200 border-t-orange-600 rounded-full animate-spin mb-4"></div>
            <p className="text-orange-600 font-bold animate-pulse text-lg">Iniciando Vivaju Chat...</p>
        </div>
    );

    const conversaAtual = dadosConversas.find(c => c.id === conversaAtualId);
    
    const mensagensFiltradas = conversaAtual?.mensagens.filter(m => 
        m.texto.toLowerCase().includes(searchMessages.toLowerCase())
    ) ? ordenarMensagens(conversaAtual.mensagens.filter(m => 
        m.texto.toLowerCase().includes(searchMessages.toLowerCase())
    )) : [];

    return (
        <div className="flex h-[100dvh] bg-gray-50 font-sans overflow-hidden w-full relative">
            {/* Sidebar de Navegação */}
            <aside className={`hidden lg:flex w-20 bg-orange-600 flex-col items-center py-6 text-white shrink-0 shadow-2xl z-20`}>
                <div className="mb-10 cursor-pointer hover:scale-110 transition-transform active:scale-90" onClick={() => navigate('/')}>
                    <img src={logoCaju} alt="Logo" className="w-10 h-10 object-contain brightness-0 invert" />
                </div>
                <div className="flex-1 space-y-8">
                    <div className="p-3 hover:bg-orange-500 rounded-xl transition-colors cursor-pointer group" onClick={() => navigate('/')}>
                        <FontAwesomeIcon icon={faHouse} className="text-xl opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="p-3 hover:bg-orange-500 rounded-xl transition-colors cursor-pointer group">
                        <FontAwesomeIcon icon={faStar} className="text-xl opacity-70 group-hover:opacity-100" />
                    </div>
                    <div className="p-3 hover:bg-orange-500 rounded-xl transition-colors cursor-pointer group">
                        <FontAwesomeIcon icon={faGear} className="text-xl opacity-70 group-hover:opacity-100" />
                    </div>
                </div>
                {!isConnected && (
                    <div className="mb-6 text-yellow-300 animate-pulse" title="Reconectando...">
                        <FontAwesomeIcon icon={faWifi} className="text-lg" />
                    </div>
                )}
                <div onClick={() => navigate(-1)} className="mt-auto cursor-pointer hover:scale-110 transition-transform active:scale-90 p-3">
                    <FontAwesomeIcon icon={faReply} className="text-xl" />
                </div>
            </aside>

            {/* Lista de Conversas */}
            <aside className={`${conversaAtualId !== '0' ? 'hidden md:flex' : 'flex'} w-full md:w-80 lg:w-96 bg-white border-r border-gray-200 flex-col shrink-0 shadow-sm relative z-10`}>
                <div className="p-4 md:p-6 border-b border-gray-100 flex justify-between items-center bg-white sticky top-0 z-10">
                    <div className="flex items-center gap-3">
                        <img src={logoCaju} alt="Vivaju" className="h-8 md:h-10 w-auto lg:hidden" />
                        <h2 className="text-xl md:text-2xl font-black text-gray-800 tracking-tight">Mensagens</h2>
                    </div>
                    <div className="lg:hidden p-2 hover:bg-orange-50 rounded-full transition-colors cursor-pointer" onClick={() => navigate('/')}>
                         <FontAwesomeIcon icon={faHouse} className="text-orange-600 text-lg" />
                    </div>
                </div>
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-white">
                    {dadosConversas.length === 0 ? (
                        <div className="flex flex-col items-center justify-center h-full p-10 text-center space-y-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center text-gray-300">
                                <FontAwesomeIcon icon={faSearch} className="text-2xl" />
                            </div>
                            <p className="text-gray-400 italic text-sm">Nenhuma conversa encontrada.</p>
                        </div>
                    ) : (
                        dadosConversas.map(conversa => (
                            <div
                                key={conversa.id}
                                onClick={() => setConversaAtualId(conversa.id)}
                                className={`flex items-center p-4 cursor-pointer transition-all duration-200 border-b border-gray-50 ${conversa.bloqueadoStatus
                                    ? (conversaAtualId === conversa.id
                                        ? 'bg-red-100 border-l-4 border-red-400'
                                        : 'bg-red-50 hover:bg-red-100 border-l-4 border-transparent')
                                    : (conversaAtualId === conversa.id
                                        ? 'bg-orange-50 border-l-4 border-orange-500'
                                        : 'hover:bg-gray-50 border-l-4 border-transparent')}`}
                            >
                                <div className="relative shrink-0">
                                    <img src={conversa.avatar || '/placeholder-avatar.png'} className="w-12 md:w-14 h-12 md:h-14 rounded-full object-cover bg-gray-200 shadow-sm ring-2 ring-transparent group-hover:ring-orange-200 transition-all" alt="" />
                                    {conversa.statusRemetente === 'Online' && (
                                        <span className="absolute bottom-0.5 right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 bg-green-500 border-2 border-white rounded-full"></span>
                                    )}
                                </div>
                                <div className="ml-3 md:ml-4 flex-1 min-w-0">
                                    <div className="flex justify-between items-baseline">
                                        <h3 className="font-bold text-gray-900 truncate text-xs md:text-sm">{conversa.nome}</h3>
                                        <span className="text-[9px] md:text-[10px] text-gray-400 whitespace-nowrap ml-2 font-medium">{conversa.hora}</span>
                                    </div>
                                    <p className={`text-[11px] md:text-xs truncate mt-1 ${conversa.naoLidas > 0 ? 'text-gray-900 font-bold' : 'text-gray-500'}`}>
                                        {conversa.ultimaMensagem || 'Inicie a conversa...'}
                                    </p>
                                </div>
                                {conversa.naoLidas > 0 && (
                                    <span className="ml-2 bg-orange-500 text-white text-[9px] md:text-[10px] font-bold rounded-full h-4 w-4 md:h-5 md:w-5 flex items-center justify-center shrink-0 shadow-sm">
                                        {conversa.naoLidas}
                                    </span>
                                )}
                            </div>
                        ))
                    )}
                </div>
            </aside>

            {/* Janela de Chat Principal */}
            <main className={`${conversaAtualId === '0' ? 'hidden md:flex' : 'flex'} flex-1 flex-col bg-white overflow-hidden relative shadow-2xl md:shadow-none z-0`}>
                {socketStatus === 'disconnected' && (
                    <div className="absolute top-0 left-0 right-0 bg-yellow-50 text-yellow-800 text-[10px] py-1.5 text-center font-bold z-50 border-b border-yellow-100 flex items-center justify-center gap-2">
                        <div className="w-2 h-2 bg-yellow-500 rounded-full animate-pulse"></div>
                        Problemas na conexão. Tentando reconectar...
                    </div>
                )}

                {!conversaAtual ? (
                    <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12 text-center bg-[#F9FAFB]">
                        <img src={logoCaju} alt="Vivaju" className="w-24 md:w-32 h-auto mb-8 opacity-20 grayscale" />
                        <h1 className="text-2xl md:text-4xl font-black text-gray-900 mb-4 tracking-tight">Chat Seguro Vivaju</h1>
                        <p className="text-gray-500 max-w-sm text-base md:text-lg font-medium">Conecte-se diretamente com as melhores lojas da cidade.</p>
                        <button 
                            onClick={() => navigate('/')}
                            className="mt-8 md:mt-10 px-8 py-3 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-lg active:scale-95 cursor-pointer"
                        >
                            Explorar Comércios
                        </button>
                    </div>
                ) : (
                    <>
                        <header className="px-4 md:px-8 py-3 md:py-4 border-b border-gray-100 flex items-center justify-between bg-white shrink-0 sticky top-0 z-20">
                            <div className="flex items-center min-w-0">
                                <div className="flex items-center gap-2 md:hidden mr-2">
                                    <button 
                                        onClick={() => setConversaAtualId('0')}
                                        className="p-1.5 text-orange-600 hover:bg-orange-50 rounded-full transition-colors active:scale-90 cursor-pointer"
                                    >
                                        <FontAwesomeIcon icon={faChevronLeft} className="text-lg" />
                                    </button>
                                </div>
                                <img src={conversaAtual.avatar || '/placeholder-avatar.png'} className="w-10 md:w-12 h-10 md:h-12 rounded-full object-cover bg-gray-200 shrink-0 border border-gray-100 shadow-sm ml-1 md:ml-0" alt="" />
                                <div className="ml-3 md:ml-4 min-w-0">
                                    <h2 className="font-bold text-gray-900 truncate text-sm md:text-lg tracking-tight leading-tight">{conversaAtual.nome}</h2>
                                    <div className="flex items-center mt-0.5">
                                        <span className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full mr-1.5 md:mr-2 shrink-0 ${conversaAtual.statusRemetente === 'Online' || isOtherUserTyping ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`}></span>
                                        <span className={`text-[9px] md:text-xs font-bold uppercase tracking-widest truncate ${isOtherUserTyping ? 'text-green-600' : 'text-gray-400'}`}>
                                            {isOtherUserTyping ? 'Digitando...' : conversaAtual.statusRemetente}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex items-center gap-1 md:gap-3 shrink-0 ml-2">
                                <button 
                                    onClick={() => { setShowSearch(!showSearch); if(showSearch) setSearchMessages(''); }} 
                                    className={`p-2 md:p-2.5 transition-colors rounded-full ${showSearch ? 'bg-orange-100 text-orange-600' : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50 cursor-pointer'}`}
                                >
                                    <FontAwesomeIcon icon={faSearch} className="text-base md:text-lg" />
                                </button>
                                <div className="relative">
                                    <button onClick={() => setMostrarMenu(!mostrarMenu)} className={`p-2 md:p-2.5 transition-colors rounded-full ${mostrarMenu ? 'bg-gray-100 text-gray-800' : 'text-gray-400 hover:text-orange-500 hover:bg-orange-50 cursor-pointer'}`}>
                                        <FontAwesomeIcon icon={faEllipsisVertical} className="text-base md:text-lg" />
                                    </button>
                                    {mostrarMenu && (
                                        <div className="absolute right-0 mt-3 w-56 md:w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 py-3 z-50 animate-in fade-in zoom-in-95 duration-200 cursor-pointer">
                                            <div className="px-4 py-2 text-[9px] md:text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] border-b border-gray-50 mb-2">Ações Rápidas</div>
                                            <button
                                                onClick={handleBloquear}
                                                className="w-full text-left px-4 py-3 text-xs md:text-sm text-gray-700 hover:bg-red-50 hover:text-red-600 flex items-center gap-3 transition-colors cursor-pointer"
                                            >
                                                <FontAwesomeIcon icon={faBan} className="w-4 opacity-70" />
                                                {conversaAtual.bloqueadoStatus ? 'Desbloquear Contato' : 'Bloquear Usuário'}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </header>

                        {showSearch && (
                            <div className="px-4 md:px-8 py-2 md:py-3 bg-orange-50 border-b border-orange-100 flex items-center gap-3 animate-in slide-in-from-top duration-300 shrink-0">
                                <FontAwesomeIcon icon={faSearch} className="text-orange-400" />
                                <input 
                                    type="text" 
                                    placeholder="Localizar na conversa..."
                                    className="flex-1 bg-transparent border-none outline-none text-xs md:text-sm text-gray-800 font-medium placeholder:text-orange-300"
                                    value={searchMessages}
                                    onChange={(e) => setSearchMessages(e.target.value)}
                                    autoFocus
                                />
                                <button onClick={() => { setShowSearch(false); setSearchMessages(''); }} className="p-1 hover:bg-orange-200 rounded-full transition-colors text-orange-400 cursor-pointer">
                                    <FontAwesomeIcon icon={faTimes} />
                                </button>
                            </div>
                        )}

                        <div ref={messagesContainerRef} className="flex-1 overflow-y-auto p-4 md:p-8 space-y-4 md:space-y-6 bg-[#F9FAFB] custom-scrollbar scroll-smooth">
                            {mensagensFiltradas.length === 0 && searchMessages && (
                                <div className="flex flex-col items-center justify-center py-20 text-gray-400 space-y-4">
                                    <FontAwesomeIcon icon={faSearch} className="text-5xl opacity-10" />
                                    <p className="font-medium italic">Nenhum resultado para "{searchMessages}"</p>
                                </div>
                            )}
                            
                            {mensagensFiltradas.map((msg, index) => {
                                const isUser = msg.remetente === 'usuario';
                                return (
                                    <div key={msg.id} className={`flex ${isUser ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`} style={{animationDelay: `${Math.min(index, 10) * 30}ms`}}>
                                        <div className={`max-w-[85%] md:max-w-[70%] p-3 md:p-4 rounded-2xl shadow-sm relative group ${isUser ? 'bg-orange-600 text-white rounded-tr-none' : 'bg-white text-gray-800 rounded-tl-none border border-gray-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]'}`}>
                                            <p className="text-xs md:text-sm leading-relaxed break-words whitespace-pre-wrap font-medium">{msg.texto}</p>
                                            <div className={`text-[8px] md:text-[10px] mt-1.5 md:mt-2 flex justify-end items-center gap-1.5 ${isUser ? 'text-orange-100' : 'text-gray-400'}`}>
                                                {msg.hora}
                                                {isUser && (
                                                    <FontAwesomeIcon icon={msg.lida ? faCheckDouble : faCheck} className={`text-[8px] md:text-[9px] ${msg.lida ? 'text-white' : 'opacity-60'}`} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })}
                            
                            {isOtherUserTyping && (
                                <div className="flex justify-start animate-in fade-in duration-300">
                                    <div className="bg-white border border-gray-100 px-4 py-3 rounded-2xl rounded-tl-none flex gap-1.5 items-center shadow-sm">
                                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce"></div>
                                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
                                        <div className="w-1.5 h-1.5 bg-orange-600 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
                                    </div>
                                </div>
                            )}
                        </div>

                        <footer className="p-3 md:p-6 bg-white border-t border-gray-100 shrink-0 shadow-[0_-4px_20px_rgba(0,0,0,0.03)] relative z-10">
                            <div className="flex items-end space-x-2 md:space-x-4 max-w-5xl mx-auto">
                                <div className="flex-1 bg-gray-100 rounded-2xl px-4 md:px-5 py-2 md:py-3 focus-within:ring-2 focus-within:ring-orange-500 transition-all border-2 border-transparent focus-within:bg-white focus-within:border-orange-100">
                                    <textarea
                                        ref={textareaRef}
                                        value={mensagemEnvio}
                                        onChange={handleChangeMsg}
                                        placeholder={
                                            socketStatus === 'connected'
                                                ? 'Escreva sua mensagem...'
                                                : socketStatus === 'connecting'
                                                    ? 'Conectando...'
                                                    : 'Conexão perdida...'
                                        }
                                        disabled={!isConnected}
                                        rows={1}
                                        className="w-full bg-transparent border-none outline-none text-gray-800 text-xs md:text-sm resize-none py-1 md:py-1.5 font-bold placeholder:text-gray-400 scroll-none"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && !e.shiftKey) {
                                                e.preventDefault();
                                                btnEnviarRef.current?.click();
                                            }
                                        }}
                                    />
                                </div>
                                <button
                                    ref={btnEnviarRef}
                                    disabled={!mensagemEnvio.trim() || !isConnected || isSendingMessage}
                                    onClick={async () => {
                                        const mensagemAtual = mensagemEnvio.trim();
                                        if (!mensagemAtual || isSendingMessageRef.current) return;

                                        isSendingMessageRef.current = true;
                                        setIsSendingMessage(true);

                                        const tempoAgora = new Date();
                                        const horaAgora = `${tempoAgora.getHours().toString().padStart(2, '0')}:${tempoAgora.getMinutes().toString().padStart(2, '0')}`;
                                        const mensagemTempId = `temp-${Date.now()}-${Math.random().toString(16).slice(2)}`;

                                        const mensagemTemp: Mensagem = {
                                            id: mensagemTempId,
                                            texto: mensagemAtual,
                                            remetente: 'usuario',
                                            hora: horaAgora,
                                            datetime: tempoAgora,
                                            lida: true
                                        };

                                        setDadosConversas(prev => prev.map(conversa =>
                                            conversa.id === conversaAtualId
                                                ? {
                                                    ...conversa,
                                                    mensagens: ordenarMensagens([...conversa.mensagens, mensagemTemp]),
                                                    contadorMensagens: conversa.mensagens.length + 1,
                                                    ultimaMensagem: mensagemTemp.texto,
                                                }
                                                : conversa
                                        ));

                                        setMensagemEnvio('');
                                        if (textareaRef.current) textareaRef.current.style.height = 'auto';
                                        socket.emit('typing', { chatId: conversaAtualId, isTyping: false });
                                        setTimeout(() => scrollToBottom('smooth'), 50);

                                        try {
                                            const res = await enviarMensagem(mensagemAtual, conversaAtualId);
                                            if (res.success) {
                                                setDadosConversas(prev => prev.map(conversa =>
                                                    conversa.id === conversaAtualId
                                                        ? {
                                                            ...conversa,
                                                            mensagens: conversa.mensagens.map(m =>
                                                                m.id === mensagemTempId
                                                                    ? {
                                                                        ...m,
                                                                        id: res.id || m.id,
                                                                        texto: res.texto || m.texto,
                                                                        hora: res.hora || m.hora,
                                                                        datetime: new Date(),
                                                                    }
                                                                    : m
                                                            ),
                                                        }
                                                        : conversa
                                                ));
                                            } else {
                                                setDadosConversas(prev => prev.map(conversa =>
                                                    conversa.id === conversaAtualId
                                                        ? { ...conversa, mensagens: conversa.mensagens.filter(m => m.id !== mensagemTempId) }
                                                        : conversa
                                                ));
                                            }
                                        } finally {
                                            isSendingMessageRef.current = false;
                                            setIsSendingMessage(false);
                                        }
                                    }}
                                    className="p-3 md:p-4 bg-orange-600 text-white rounded-2xl hover:bg-orange-700 transition-all shadow-xl active:scale-95 disabled:opacity-40 disabled:scale-100 disabled:shadow-none cursor-pointer"
                                >
                                    <FontAwesomeIcon icon={faPaperPlane} className="text-base md:text-lg" />
                                </button>
                            </div>
                        </footer>
                    </>
                )}
            </main>

            <style>{`
                @keyframes bounce-short {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-3px); }
                }
                .animate-bounce-short {
                    animation: bounce-short 1s infinite;
                }
                @keyframes gentle-bounce {
                    0%, 100% { transform: translateY(0) scale(1); }
                    50% { transform: translateY(-15px) scale(1.02); }
                }
                .animate-gentle-bounce {
                    animation: gentle-bounce 4s ease-in-out infinite;
                }
                .custom-scrollbar::-webkit-scrollbar {
                    width: 5px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #E5E7EB;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #D1D5DB;
                }
                textarea {
                    max-height: 200px;
                }
            `}</style>
        </div>
    );
}
