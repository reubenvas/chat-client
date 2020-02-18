import socket from '..';

export default (message: string): void => {
    socket.emit('message', message);
};
