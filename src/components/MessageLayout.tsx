import React from 'react';
import { observer } from 'mobx-react-lite';
import useStores from '../hooks/useStores';

const MessageLayout = () => {
    const { messages } = useStores();

    return (
        <div>
            MESSAGE LAYOUT
            <ul>
                {messages.messages.map((msg, i) => <li key={i}>{`${msg.date} ${msg.sender} says: ${msg.content}`}</li>)}

            </ul>
        </div>
    );
};

export default observer(MessageLayout);
