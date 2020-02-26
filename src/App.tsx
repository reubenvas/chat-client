import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import { ToastContainer, Slide } from 'react-toastify';
import Socket from './components/Socket';
import Chat from './components/Chat/Chat';
import Login from './components/Login/Login';
import useStores from './hooks/useStores';
import 'react-toastify/dist/ReactToastify.css';


const App = observer(() => {
    const { user: { isConnectedToChat } } = useStores();

    return (
        <div className="App">
            <Socket />
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable={false}
                pauseOnHover
                transition={Slide}
            />
            {isConnectedToChat ? <Chat /> : <Login />}
        </div>
    );
});

export default App;
