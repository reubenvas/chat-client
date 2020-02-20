import React, { useEffect } from 'react';
import { toast } from 'react-toastify';
import socket from '../sockets';
import useStores from '../hooks/useStores';
import { ChatMessage } from '../stores/MessageStore';

const Socket = (): React.ReactElement => {
    const { messages, user } = useStores();

    useEffect(() => {
        console.log(socket.id);
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
