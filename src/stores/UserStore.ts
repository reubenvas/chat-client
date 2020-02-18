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

    @observable id = '';

    @observable nickname = '';

    @observable loginTime: Date | null = null;

    @observable isConnected = false;

    @action connect = (): void => { this.isConnected = true; };

    @action disConnect = (): void => { this.isConnected = false; };

}

export default UserStore;
