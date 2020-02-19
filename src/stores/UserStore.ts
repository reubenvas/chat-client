import { observable, action, configure } from 'mobx';
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

    @observable nickname = '';

    @observable loginTime: number | null = null;

    @observable isConnected = false;

    @action connect = (): void => { this.isConnected = true; };

    @action disConnect = (): void => { this.isConnected = false; };

    @action logIn = (nickname: string): void => {
        this.nickname = nickname;
        this.loginTime = Date.now();
        this.connect();
    };
}

export default UserStore;
