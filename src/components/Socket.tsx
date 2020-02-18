import React, { useEffect } from 'react';
import io from 'socket.io-client';

const Socket = (): React.ReactElement => {
    // const socket = io('localhost:8000');

    // socket.on('usr_joined', (data: string) => {
    //     console.log('someone connected', data);
    // });

    // useEffect(() => {
    //     socket.emit('connection');
    // }, [socket]);

    return (
        <div>SOCKET </div>
    );
};

export default Socket;
