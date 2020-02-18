import { observable, action, configure } from 'mobx';

configure({
    enforceActions: 'always',
    computedRequiresReaction: true,
    observableRequiresReaction: true,
    reactionRequiresObservable: true,
});

type chatMessage = {
    content: string;
    date: number;
    sender: string;
};

class MessageStore {
    @observable messages: chatMessage[] = [];

    @action addMessage = (message: chatMessage): void => {
        this.messages.push(message);
    };
}

export default MessageStore;
