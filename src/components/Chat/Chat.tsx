import React from 'react';
import { observer } from 'mobx-react-lite';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import MessageInputForm from './MessageInputForm';
import useStores from '../../hooks/useStores';
import MessageLayout from './MessagesLayout';
import { emitDisconnectUserEvent } from '../../sockets/emitters';

const useStyles = makeStyles(() => createStyles({
    root: {
        paddingTop: 65,
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const Chat = (): React.ReactElement => {
    const classes = useStyles();
    const { user, messages } = useStores();

    const leaveChat = (): void => {
        user.logOut();
        messages.deleteAllMessages();
        emitDisconnectUserEvent();
    };

    return (
        <>
            <AppBar color="primary">
                <Toolbar>
                    <Typography variant="subtitle1" component="span" className={classes.title}>
                        visible as:
                        <Typography variant="h5" className={classes.title}>
                            {user.nickname}
                        </Typography>
                    </Typography>
                    <Button onClick={leaveChat} variant="outlined" color="inherit">
                        Leave chat
                    </Button>
                </Toolbar>
            </AppBar>
            <Grid container className={classes.root} justify="center">
                <MessageLayout />
                <MessageInputForm />
            </Grid>
        </>
    );
};

export default observer(Chat);
