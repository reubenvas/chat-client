/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import socket from '../sockets';
// import io from 'socket.io-client';
import useStores from '../hooks/useStores';
import { ChatMessage } from '../stores/MessageStore';
// const socket = io('localhost:8000');

const Socket = (): React.ReactElement => {
    const { messages, user } = useStores();

    useEffect(() => {
        console.log(socket.id);
        if (socket.id) {
            user.connectToServer();
        }
        socket.on('connect', () => {
            console.log('Connected w/ socket id:', socket.id);
            if (!user.isConnectedToServer) {
                user.connectToServer();
            }
        });
        socket.on('connect_error', (err: Error) => {
            const message = 'Oh noo! It seems like the chat server is down. Please try again later.';
            if (user.isConnectedToServer) {
                user.disconnectFromServer();
                toast.error(message);
            }
        });

        socket.on('nickname invalid', (nickname: string, message: string) => {
            toast.error(`🧨 ${message} 🕳`);
        });
        socket.on('nickname approved', (nickname: string) => { /* ⏰ */
            toast.success('🌞 Wow! That\'s a great nickname!');
            user.logIn(nickname);
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
        socket.on('user disconnected', (nickname: string, message: string) => {
            toast.warn(message);
        });

        return (): void => {
            socket.off('message');
            socket.off('message invalid');
            socket.off('nickname invalid');
            socket.off('nickname approved');
        };
    }, [messages, messages.addMessage, user]);


    // socket.on('message', user.)

    // const socket = io('localhost:8000');

    // socket.on('usr_joined', (data: string) => {
    //     console.log('someone connected', data);
    // });

    // useEffect(() => {
    //     socket.emit('connection');
    // }, [socket]);

    return (
        <></>
    );
};

export default Socket;
