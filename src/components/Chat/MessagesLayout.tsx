import React from 'react';
import { observer } from 'mobx-react-lite';
import { makeStyles, createStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import useStores from '../../hooks/useStores';
import MessageBubble from './MessageBubble';

const useStyles = makeStyles(() => createStyles({
    root: {
        flexGrow: 1,
        height: '90vmin',
        overflowY: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 12,
        paddingLeft: 12,
    },
}));


const MessageLayout = (): React.ReactElement => {
    const { messages } = useStores();
    const classes = useStyles();

    return (
        <Grid className={`${classes.root}`} container direction="column" wrap="nowrap">
            {messages.messages.map((msg) => (msg.type === 'message'
                ? (
                    <MessageBubble
                        key={msg.date}
                        type="message"
                        content={msg.content}
                        date={msg.date}
                        sender={msg.sender}
                    />
                )
                : (
                    <Typography variant="body1" gutterBottom key={msg.date}>
                        {msg.content}
                    </Typography>
                )))}
        </Grid>
    );
};

export default observer(MessageLayout);
