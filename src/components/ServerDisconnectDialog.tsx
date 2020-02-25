import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const ServerDisconnectDialog = (): React.ReactElement => {
    const [open, setOpen] = React.useState(true);

    const handleClose = (): void => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Chat server is down</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    Oh noo! It seems like the chat server is down. Please try again later.
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Ok, I&apos;ll try later
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ServerDisconnectDialog;
