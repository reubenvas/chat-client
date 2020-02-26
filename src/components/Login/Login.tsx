import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { observer } from 'mobx-react-lite';
import { emitNicknameEvent } from '../../sockets/emitters';
import ServerDisconnectDialog from './ServerDisconnectDialog';
import useStores from '../../hooks/useStores';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: '-webkit-fill-available',
    },
    paper: {
        width: '28vw',
        height: '35vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    margin: {
        margin: theme.spacing(2),
    },
}));

const Login = (): React.ReactElement => {
    const { user: { isConnectedToServer } } = useStores();
    const [nickname, setNickname] = useState<string>('');
    const classes = useStyles();

    const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNickname(e.currentTarget.value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        emitNicknameEvent(nickname);
    };

    return (
        <>
            {!isConnectedToServer && <ServerDisconnectDialog />}
            <Grid container justify="center" alignItems="center" className={classes.root}>
                <div>
                    <Paper className={classes.paper} elevation={2}>
                        <form onSubmit={submit}>
                            <Grid item container direction="column">
                                <Typography variant="h4" gutterBottom>
                                    Welcome
                                </Typography>
                                <TextField
                                    autoFocus
                                    variant="outlined"
                                    label="username"
                                    size="small"
                                    onChange={inputChange}
                                    margin="normal"
                                    disabled={!isConnectedToServer}
                                />
                                <Button
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    size="small"
                                    className={classes.margin}
                                    disabled={!isConnectedToServer}
                                >
                                    Start chatting
                                </Button>
                            </Grid>
                        </form>
                    </Paper>
                </div>
            </Grid>
        </>
    );
};

export default observer(Login);
