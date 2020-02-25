import React, { useRef, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import {
    Grid, makeStyles, Theme, createStyles,
} from '@material-ui/core';
import useStores from '../../hooks/useStores';
import MessageBubble from './MessageBubble';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        flexGrow: 1,
        height: '90vmin',
        overflowY: 'auto',
        paddingTop: 10,
        paddingBottom: 10,
        paddingRight: 12,
        paddingLeft: 12,
    },
    paper: {
        height: 40,
        paddingRight: 10,
        paddingLeft: 10,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 100,
        borderBottomLeftRadius: 10,
    },
    control: {
        padding: theme.spacing(2),
    },
}));



const MessageLayout = () => {
    const { messages } = useStores();
    const classes = useStyles();

    return (
        <Grid className={`${classes.root} auto-scrollable-cont`} container direction="column" wrap="nowrap">
            {messages.messages.map(({ content, date, sender }, i) => (
                <MessageBubble
                    key={i}
                    content={content}
                    date={date}
                    sender={sender}
                />
            ))}
        </Grid>
    );
};

export default observer(MessageLayout);
