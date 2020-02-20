import {
    observable, action, configure, computed,
} from 'mobx';
import emitMessageEvent from '../sockets/emiters/message';
import RootStore from './RootStore';


configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    observableRequiresReaction: true,
    reactionRequiresObservable: true,
});

export type ChatMessage = {
    content: string;
    date: number;
    sender: string;
};

class MessageStore {
    rootStore: RootStore;

    constructor(rootStore: RootStore) {
        this.rootStore = rootStore;
    }

    @observable messages: ChatMessage[] = [];

    @computed get SentMessages(): ChatMessage[] {
        return this.messages.filter((msg) => msg.sender === this.rootStore.UserStore.nickname);
    }

    @computed get receivedMessages(): ChatMessage[] {
        return this.messages.filter((msg) => msg.sender !== this.rootStore.UserStore.nickname);
    }

    @action addMessage = (message: ChatMessage): void => {
        this.messages.push(message);
    };

    @action deleteAllMessages = (): void => {
        this.messages.length = 0;
    };
}

export default MessageStore;
