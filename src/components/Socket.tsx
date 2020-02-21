/* eslint-disable no-shadow */
import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import socket from '../sockets';
// import io from 'socket.io-client';
import useStores from '../hooks/useStores';
import { ChatMessage } from '../stores/MessageStore';
import message from '../sockets/emiters/message';

// const socket = io('localhost:8000');

const Socket = (): React.ReactElement => {
    const { messages, user } = useStores();

    useEffect(() => {
        console.log(socket.id);
        socket.on('connect', () => {
            console.log('Connected w/ socket id:', socket.id);
            user.connectToServer();
        });
        socket.on('connect_error', (err: Error) => {
            console.error('NO CONNECTION TO SERVER.');
            console.log(err);
            if (user.isConnectedToServer) {
                user.disconnectFromServer();
                toast.error(err.message);
            }
        });

        socket.on('new message', (chatMessage: ChatMessage) => {
            if (user.isConnected) {
                messages.addMessage(chatMessage);
            }
        });
        socket.on('message invalid', (chatMessageContent: ChatMessage['content'], message: string) => {
            toast.error(message);
        });

        socket.on('nickname invalid', (nickname: string, message: string) => {
            toast.error(`🧨 ${message} 🕳`);
        });
        socket.on('nickname approved', (nickname: string) => { /* ⏰ */
            toast.success('🌞 Wow! That\'s a great nickname!');
            user.logIn(nickname);
        });
        socket.on('disconnect user', (nickname: string, message: string) => {
            toast.error(message);
            user.logOut();
            messages.deleteAllMessages();
        });
        socket.on('user inactivity', (nickname: string, message: string) => {
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
