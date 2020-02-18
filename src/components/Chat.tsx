import React from 'react';
import { observer } from 'mobx-react-lite';
import MessageInputForm from './MessageInputForm';
import useStores from '../hooks/useStores';
import MessageLayout from './MessageLayout';


const Chat = observer(() => {
    const store = useStores();

    console.log(store);
    return (
        <div>
            CHAT
            <MessageLayout />
            <MessageInputForm />
        </div>
    );
});

export default Chat;
