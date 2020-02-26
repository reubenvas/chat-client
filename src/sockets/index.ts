import io from 'socket.io-client';

const { hostname } = window.location;
const socket = io(`${hostname}:8000`);

export default socket;
