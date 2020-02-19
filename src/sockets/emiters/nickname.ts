import socket from '..';

export default (nickname: string): void => {
    socket.emit('set nickname', nickname);
};
