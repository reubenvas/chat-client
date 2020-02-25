import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { StoreProvider } from './StoreContext';
import { initSocketListeners } from './sockets';
import RootStore from './stores/RootStore';
import 'typeface-roboto';

initSocketListeners();

// const user = new UserStore();
// const messages = new MessageStore();

const { UserStore: user, MessageStore: messages } = new RootStore();

ReactDOM.render(
    <StoreProvider value={{ user, messages }}>
        <App />
    </StoreProvider>,
    document.getElementById('root'),
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
