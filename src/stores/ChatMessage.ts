class ChatMessage {
    constructor(content: string, date: number, sender: string) {
        this.content = content;
        this.date = date;
        this.sender = sender;
    }

    content: string;

    date: number;

    sender: string;

    // get isSentByMe () {
    //     if
    // }

}

export default ChatMessage;
