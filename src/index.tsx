import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import UserStore from './stores/UserStore';
import { StoreProvider } from './StoreContext';
import { initSocketListeners } from './sockets';
import MessageStore from './stores/MessageStore';

initSocketListeners();


const user = new UserStore();
const messages = new MessageStore();

ReactDOM.render(
    <StoreProvider value={{user, messages}}>
        <App />
    </StoreProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
