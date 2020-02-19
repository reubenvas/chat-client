import React from 'react';
import './App.css';
import { observer } from 'mobx-react-lite';
import { ToastContainer, toast, Slide } from 'react-toastify';
import Socket from './components/Socket';
import Chat from './components/Chat';
import LoginPage from './components/LoginPage';
import useStores from './hooks/useStores';
import 'react-toastify/dist/ReactToastify.css';


const App = observer(() => {
    const { user } = useStores();

    React.useEffect(() => {
        toast.success('HEEEEELLO');
        toast.warn('HEEEEELLO');
        toast.error('HEEEEELLO');
    });

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
            {user.isConnected ? <Chat /> : <LoginPage />}

        </div>
    );
});

export default App;
