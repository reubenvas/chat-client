import { useContext } from 'react';
import UserStore from '../stores/UserStore';
import { StoreContext } from '../StoreContext';
import MessageStore from '../stores/MessageStore';

type Store = {
    user: UserStore;
    messages: MessageStore;
};

export default (): Store => useContext(StoreContext);
