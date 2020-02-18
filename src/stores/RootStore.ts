import UserStore from './UserStore';
import MessageStore from './MessageStore';


class RootStore {
    UserStore: UserStore;

    MessageStore: MessageStore;

    constructor() {
        this.UserStore = new UserStore(this);
        this.MessageStore = new MessageStore(this);
    }
}

export default RootStore;
