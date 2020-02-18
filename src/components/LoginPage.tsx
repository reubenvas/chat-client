import React, { useState, useEffect } from 'react';
import useStores from '../hooks/useStores';

const LoginPage = () => {
    const [userName, setuserName] = useState<string>('');
    const { user } = useStores();

    const inputChange = (e: React.FormEvent<HTMLInputElement>) => {
        setuserName(e.currentTarget.value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        console.log('clicked submit');
        console.log(userName);
    };

    useEffect(() => {
        user.connect();
    });

    return (
        <div className="">
            LOGIN
            <form onSubmit={submit}>
                <label htmlFor="user_name">
                    Enter username:
                    <input type="text" onChange={inputChange} />
                </label>

            </form>
        </div>
    );
};

export default LoginPage;
