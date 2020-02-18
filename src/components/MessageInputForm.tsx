import React, { useState } from 'react';
import emitMessageEvent from '../sockets/emiters/message';

const MessageInputForm = (): React.ReactElement => {
    const [message, setMessage] = useState<string>('');

    const inputChange = (e: React.FormEvent<HTMLInputElement>): void => {
        setMessage(e.currentTarget.value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('clicked submit, now SEND');
        console.log(message);
        emitMessageEvent(message);
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
