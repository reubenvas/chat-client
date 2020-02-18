import { useContext } from 'react';
import UserStore from '../stores/UserStore';
import { StoreContext } from '../StoreContext';
import MessageStore from '../stores/MessageStore';

export default (): {user: UserStore; messages: MessageStore} => useContext(StoreContext);
