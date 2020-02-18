import { createContext } from 'react';
import UserStore from './stores/UserStore';
import MessageStore from './stores/MessageStore';

export const StoreContext = createContext<{ user: UserStore; messages: MessageStore }>(
    { user: {} as UserStore, messages: {} as MessageStore },
);
export const StoreProvider = StoreContext.Provider;
