import io from 'socket.io-client';

const socket = io('localhost:8000');

export const initSocketListeners = () => {
    console.log(socket);
    socket.on('message', (message: any) => {
        console.log(message);
        // message
    });
};

export default socket;
