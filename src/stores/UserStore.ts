import {
    observable, configure, action, computed,
} from 'mobx';
import RootStore from './RootStore';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    observableRequiresReaction: true,
    reactionRequiresObservable: true,
});

class UserStore {
    rootStore: RootStore;
    // private socket = '';

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable isConnectedToServer = false;

    @observable nickname = '';

    @computed get isConnected(): boolean {
        return Boolean(this.nickname);
    }

    @action connectToServer = (): void => {
        this.isConnectedToServer = true;
    };

    @action disconnectFromServer = (): void => {
        this.isConnectedToServer = false;
    };

    @action logIn = (nickname: string): void => {
        this.nickname = nickname;
    };

    @action logOut = (): void => {
        this.nickname = '';
    };
}

export default UserStore;
