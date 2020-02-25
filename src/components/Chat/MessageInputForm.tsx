import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { emitMessageEvent } from '../../sockets/emitters';

const useStyles = makeStyles(() => createStyles({
    root: {
        position: 'absolute',
        bottom: 50,
        width: 'fit-content',
        transition: 'opacity .5s',
    },
    inputForm: {
        width: '60vw',
    },
}));

const MessageInputForm = (): React.ReactElement => {
    const [message, setMessage] = useState<string>('');
    const [opacity, setOpacity] = useState<number>(1);
    const classes = useStyles();

    const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setMessage(e.currentTarget.value);
        if (opacity !== 1) {
            setOpacity(1);
        }
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        emitMessageEvent(message);
        setMessage('');
    };


    const fadeIn = (): void => {
        setOpacity(1);
    };
    const fadeOut = (): void => {
        setOpacity(0.2);
    };


    return (
        <Grid
            onMouseEnter={fadeIn}
            onMouseLeave={fadeOut}
            item
            container
            className={classes.root}
            style={{ opacity }}
            direction="column"
            justify="center"
            alignItems="center"
        >
            <form onSubmit={submit} className={classes.inputForm}>
                <TextField
                    autoFocus
                    value={message}
                    onFocus={fadeIn}
                    onBlur={fadeOut}
                    onChange={inputChange}
                    id="outlined-basi70c"
                    label="Type your message"
                    placeholder="Chat..."
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    size="medium"
                />
            </form>
        </Grid>
    );
};

export default MessageInputForm;
