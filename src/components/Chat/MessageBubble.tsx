import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import grey from '@material-ui/core/colors/grey';
import { observer } from 'mobx-react-lite';
import { ChatMessage } from '../../stores/MessageStore';
import useStores from '../../hooks/useStores';

const useStyles = makeStyles((theme: Theme) => createStyles({
    containerCenter: {
        display: 'flex',
        alignItems: 'center',
    },
    timeArrow: {
        display: 'flex',
        alignItems: 'center',
        paddingRight: 8,
        paddingLeft: 5,
        clipPath: 'polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0 100%)',
        backgroundColor: 'rgba(60, 47, 51, 0.33)',
    },
    paper: {
        height: 55,
        paddingRight: 15,
        paddingLeft: 15,
        display: 'flex',
        alignItems: 'center',
        borderRadius: 100,
    },
    grey: {
        color: theme.palette.getContrastText(grey[200]),
        backgroundColor: grey[200],
    },
}));

const MessageBubble = ({ date, sender, content }: ChatMessage): React.ReactElement => {
    const classes = useStyles();
    const { user } = useStores();
    const [timeVisible, setTimeVisible] = useState<boolean>(false);

    const messageStyling: {
        borderBottomLeftRadius?: 10; borderBottomRightRadius?: 10;
        paddingRight?: 20; paddingLeft?: 20;
    } = {};
    const timeArrowStyling: { paddingRight?: 14; paddingLeft?: 14; marginRight?: 10; marginLeft?: 10; clipPath?: 'polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0 100%)' | 'polygon(10% 0, 100% 1%, 100% 100%, 10% 100%, 0% 50%)' } = {};
    let alignment: 'flex-start' | 'flex-end';
    let isReceived = false;

    if (sender === user.nickname) {
        messageStyling.borderBottomRightRadius = 10;
        messageStyling.paddingLeft = 20;
        timeArrowStyling.paddingRight = 14;
        timeArrowStyling.marginRight = 10;
        timeArrowStyling.clipPath = 'polygon(0% 0%, 90% 0, 100% 50%, 90% 100%, 0 100%)';
        alignment = 'flex-end';
    } else {
        messageStyling.borderBottomLeftRadius = 10;
        messageStyling.paddingRight = 20;
        timeArrowStyling.paddingLeft = 14;
        timeArrowStyling.marginLeft = 10;
        timeArrowStyling.clipPath = 'polygon(10% 0, 100% 1%, 100% 100%, 10% 100%, 0% 50%)';
        alignment = 'flex-start';
        isReceived = true;
    }

    const hoverEnter = (): void => {
        setTimeVisible(true);
    };

    const hoverLeave = (): void => {
        setTimeVisible(false);
    };


    const TimeArrow = (): React.ReactElement | null => (timeVisible ? (
        <div className={classes.containerCenter}>
            <Typography className={classes.timeArrow} style={timeArrowStyling} variant="caption" display="block">
                {(new Date(date)).toLocaleString()}
            </Typography>
        </div>
    ) : null
    );

    return (
        <Grid item container>
            <Grid item container direction="column" alignItems={alignment}>
                <Grid item container direction="row" justify={alignment}>
                    {!isReceived && <TimeArrow />}
                    <Paper
                        className={`${classes.paper} ${isReceived ? '' : classes.grey}`}
                        style={messageStyling}
                        onMouseEnter={hoverEnter}
                        onMouseLeave={hoverLeave}
                        onFocus={hoverEnter}
                    >
                        <Typography variant="h6">
                            {content}
                        </Typography>
                    </Paper>
                    {isReceived && <TimeArrow />}
                </Grid>
                <Typography variant="body2" gutterBottom>
                    {isReceived ? sender : ''}
                </Typography>
            </Grid>
        </Grid>
    );
};

export default observer(MessageBubble);
