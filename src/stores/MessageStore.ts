import {
    observable, action, configure,
} from 'mobx';


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
    type: 'message';
};

export type ChatNotification = {
    content: string;
    type: 'notification';
    date: number;
};

class MessageStore {
    @observable messages: (ChatMessage | ChatNotification)[] = [];

    @action addMessage = (message: ChatMessage | ChatNotification): void => {
        this.messages.push(message);
    };

    @action deleteAllMessages = (): void => {
        this.messages.length = 0;
    };
}

export default MessageStore;
