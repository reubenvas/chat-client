import {
    observable, configure, action, computed,
} from 'mobx';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    observableRequiresReaction: true,
    reactionRequiresObservable: true,
});

class UserStore {
    @observable isConnectedToServer = false;

    @observable nickname = '';

    socket?: SocketIOClient.Socket;

    @computed get isConnectedToChat(): boolean {
        return Boolean(this.nickname);
    }

    @action connectToServer = (): void => {
        this.isConnectedToServer = true;
    };

    @action disconnectFromServer = (): void => {
        this.isConnectedToServer = false;
        this.logOut();
    };

    @action logIn = (nickname: string): void => {
        this.nickname = nickname;
    };

    @action logOut = (): void => {
        this.nickname = '';
    };
}

export default UserStore;
