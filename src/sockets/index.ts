import io from 'socket.io-client';

const { hostname } = window.location;

const socket = io(`${hostname}:8000`);

export const initSocketListeners = () => {
    // console.log(socket);
    // socket.on('message', (message: any) => {
    //     console.log(message);
    //     // message
    // });
};

export default socket;
