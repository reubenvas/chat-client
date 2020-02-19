import React, { useState, useEffect } from 'react';
import useStores from '../hooks/useStores';
import emitSetNicknameEvent from '../sockets/emiters/nickname';

const LoginPage = () => {
    const [nickname, setNickname] = useState<string>(''); // create ref for nickname instead
    const { user } = useStores();

    const inputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setNickname(e.currentTarget.value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('clicked submit');
        console.log(nickname);
        emitSetNicknameEvent(nickname);
    };

    // useEffect(() => {
    //     user.connect();
    // });

    return (
        <div className="">
            LOGIN
            <form onSubmit={submit}>
                <label htmlFor="user_name">
                    Enter username:
                    <input type="text" onChange={inputChange} />
                </label>
                <input type="submit" value="Login" />

            </form>
        </div>
    );
};

export default LoginPage;
