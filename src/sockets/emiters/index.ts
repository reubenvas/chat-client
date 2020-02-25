import socket from '..';

export const emitMessageEvent = (message: string): void => {
    socket.emit('message', message);
};

export const emitNicknameEvent = (nickname: string): void => {
    socket.emit('set nickname', nickname);
};

export const emitDisconnectUserEvent = (): void => {
    socket.emit('disconnect user');
};
