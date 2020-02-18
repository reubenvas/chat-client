import React, { useState } from 'react';
import emitMessageEvent from '../sockets/emiters/message';
import useStores from '../hooks/useStores';

const MessageInputForm = () => {
    const [message, setMessage] = useState<string>('');
    const { messages, user } = useStores();

    const inputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setMessage(e.currentTarget.value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('clicked submit, now SEND');
        console.log(message);
        sendMessage(message);
    };

    const sendMessage = (msg: string): void => {
        emitMessageEvent(msg);
        messages.addMessage({
            content: msg,
            date: Date.now(),
            sender: user.nickname,
        });
    };

    return (
        <form onSubmit={submit}>
            <label htmlFor="message">
                Input ur message
                <input type="text" id="message" value={message} onChange={inputChange} />
                <input type="submit" value="Send" />
            </label>

        </form>
    );
};

export default MessageInputForm;
