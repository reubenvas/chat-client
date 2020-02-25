import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import emitSetNicknameEvent from '../sockets/emiters/nickname';

const useStyles = makeStyles((theme: Theme) => createStyles({
    root: {
        height: '-webkit-fill-available',
    },
    paper: {
        width: '19vw',
        height: '35vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    margin: {
        margin: theme.spacing(2),
    },
}));

const LoginPage = (): React.ReactElement => {
    const [nickname, setNickname] = useState<string>(''); // create ref for nickname instead
    const classes = useStyles();

    const inputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
        setNickname(e.currentTarget.value);
    };

    const submit = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();
        emitSetNicknameEvent(nickname);
    };

    return (
        <Grid container justify="center" alignItems="center" className={classes.root}>
            <div>
                <Paper className={classes.paper} elevation={2}>
                    <form onSubmit={submit}>
                        <Grid item container direction="column">
                            <Typography variant="h4" gutterBottom>
                                Welcome
                            </Typography>
                            <TextField
                                variant="outlined"
                                label="username"
                                size="small"
                                onChange={inputChange}
                                margin="normal"
                            />
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                size="small"
                                className={classes.margin}
                            >
                                Start chatting
                            </Button>
                        </Grid>
                    </form>
                </Paper>
            </div>
        </Grid>
    );
};

export default LoginPage;
