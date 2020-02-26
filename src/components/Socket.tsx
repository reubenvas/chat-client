import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';
import socket from '../sockets';
import useStores from '../hooks/useStores';
import { ChatMessage, ChatNotification } from '../stores/MessageStore';

const Socket = (): React.ReactElement => {
    const {
        messages: {
            addMessage, deleteAllMessages,
        },
        user: {
            isConnectedToServer, connectToServer,
            disconnectFromServer, isConnectedToChat,
            logIn, logOut,
        },
    } = useStores();

    useEffect(() => {
        socket.on('connect', () => {
            if (!isConnectedToServer) {
                connectToServer();
            }
        });
        socket.on('connect_error', () => {
            if (isConnectedToServer) {
                const message = 'Oh noo! It seems like the chat server is down. Please try again later.';
                disconnectFromServer();
                deleteAllMessages();
                toast.error(message);
            }
        });
        socket.on('nickname invalid', (message: string) => {
            toast.error(`💣 ${message}`);
        });
        socket.on('nickname approved', (nickname: string, nicknamesOnline: string[], loginTime: number) => { /* ⏰ */
            logIn(nickname);
            if (nicknamesOnline.length === 0) {
                return;
            }
            let nicknames: string;
            if (nicknamesOnline.length === 1) {
                nicknames = nicknamesOnline.join('');
            } else if (nicknamesOnline.length === 2) {
                nicknames = nicknamesOnline.join(' and ');
            } else {
                const last2Names = nicknamesOnline.splice(nicknamesOnline.length - 2, nicknamesOnline.length - 1).join(' and ');
                const otherNames = nicknamesOnline.length === 1 ? nicknamesOnline.join('') : nicknamesOnline.join(', ');
                nicknames = `${otherNames}, ${last2Names}`;
            }
            const notificationMessage: ChatNotification = {
                content: `${nicknames} has already joined`,
                type: 'notification',
                date: loginTime,
            };
            addMessage(notificationMessage);
        });
        socket.on('user joined', (notificationMessage: ChatNotification) => {
            addMessage(notificationMessage);
        });
        socket.on('new message', (chatMessage: ChatMessage) => {
            if (isConnectedToServer && isConnectedToChat) {
                addMessage(chatMessage);
            }
        });
        socket.on('message invalid', (message: string) => {
            toast.error(`💣 ${message}`);
        });
        socket.on('disconnect user', (message: string) => {
            toast.error(message);
            logOut();
            deleteAllMessages();
        });
        socket.on('user disconnected', (notificationMessage: ChatNotification) => {
            addMessage(notificationMessage);
        });

        return (): void => {
            socket.off('connect');
            socket.off('connect_error');
            socket.off('nickname invalid');
            socket.off('nickname approved');
            socket.off('user joined');
            socket.off('new message');
            socket.off('message invalid');
            socket.off('disconnect user');
            socket.off('user disconnected');
        };
    }, [
        addMessage, connectToServer, deleteAllMessages,
        disconnectFromServer, isConnectedToChat, isConnectedToServer,
        logIn, logOut,
    ]);

    return (
        <></>
    );
};

export default observer(Socket);
