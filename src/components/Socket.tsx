import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import socket from '../sockets';
import useStores from '../hooks/useStores';
import { ChatMessage, ChatNotification } from '../stores/MessageStore';

const Socket = (): React.ReactElement => {
    const { messages, user } = useStores();

    useEffect(() => {
        if (socket.id) {
            user.connectToServer();
        }
        socket.on('connect', () => {
            if (!user.isConnectedToServer) {
                user.connectToServer();
            }
        });
        socket.on('connect_error', () => {
            const message = 'Oh noo! It seems like the chat server is down. Please try again later.';
            if (user.isConnectedToServer) {
                user.disconnectFromServer();
                toast.error(message);
            }
        });

        socket.on('nickname invalid', (nickname: string, message: string) => {
            toast.error(`💣 ${message}`);
        });
        socket.on('nickname approved', (nickname: string) => { /* ⏰ */
            user.logIn(nickname);
        });

        socket.on('user joined', (notificationMessage: ChatNotification) => {
            messages.addMessage(notificationMessage);
        });

        socket.on('new message', (chatMessage: ChatMessage) => {
            if (user.isConnectedToServer && user.isConnectedToChat) {
                messages.addMessage(chatMessage);
            }
        });
        socket.on('message invalid', (chatMessageContent: ChatMessage['content'], message: string) => {
            toast.error(message);
        });

        socket.on('disconnect user', (nickname: string, message: string) => {
            toast.error(message);
            user.logOut();
            messages.deleteAllMessages();
        });
        socket.on('user disconnected', (nickname: string, notificationMessage: ChatNotification) => {
            messages.addMessage(notificationMessage);
        });
        socket.on('user inactivity', (nickname: string, notificationMessage: ChatNotification) => {
            messages.addMessage(notificationMessage);
        });

        return (): void => {
            socket.off('message');
            socket.off('message invalid');
            socket.off('nickname invalid');
            socket.off('nickname approved');
        };
    }, [messages, messages.addMessage, user]);

    return (
        <></>
    );
};

export default Socket;
