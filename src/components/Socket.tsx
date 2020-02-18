import React, { useEffect } from 'react';
import socket from '../sockets';
import useStores from '../hooks/useStores';

const Socket = (): React.ReactElement => {
    const { messages } = useStores();

    useEffect(() => {
        socket.on('message', messages.addMessage);
    }, [messages.addMessage]);

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
