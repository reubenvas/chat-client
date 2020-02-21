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

    const userInterface = (): React.ReactNode => {
        if (!user.isConnectedToServer) {
            return <div>NOT EVEN CONNECTED TO SERVER</div>;
        }
        if (user.isConnected) {
            return <Chat />;
        }
        return <LoginPage />;
    };

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
            {userInterface()}

        </div>
    );
});

export default App;
