import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import Socket from './components/Socket';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import useStores from './hooks/useStores';

const App = observer(() => {
    const { user } = useStores();

    return (
        <div className="App">
            <Socket />
            {user.isConnected ? <Chat /> : <LoginPage />}

        </div>
    );
});

export default App;
