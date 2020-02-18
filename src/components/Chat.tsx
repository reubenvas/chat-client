import React from 'react';
import { observer } from 'mobx-react-lite';
import MessageInputForm from './MessageInputForm';
import useStore from '../hooks/useStores';


const Chat = observer(() => {
    const store = useStore();

    console.log(store);
    return (
        <div>
            CHAT
            <MessageInputForm />
        </div>
    );
});

export default Chat;
