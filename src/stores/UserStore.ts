import { observable, action, configure } from 'mobx';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    observableRequiresReaction: true,
    reactionRequiresObservable: true,
});

class UserStore {
    // private socket = '';

    @observable id = '';

    @observable nickname = '';

    @observable loginTime: Date | null = null;

    @observable isConnected = false;

    @action connect = (): void => { this.isConnected = true; };

    @action disConnect = (): void => { this.isConnected = false; };
}

export default UserStore;
