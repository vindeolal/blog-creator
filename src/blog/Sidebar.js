import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import GitHubIcon from '@material-ui/icons/GitHub';
import FacebookIcon from '@material-ui/icons/Facebook';
import TwitterIcon from '@material-ui/icons/Twitter';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({
    sidebarAboutBox: {
        padding: theme.spacing(2),
        backgroundColor: theme.palette.grey[200],
    },
    sidebarSection: {
        marginTop: theme.spacing(3),
    },
}));

const iconMap = {
    GitHubIcon: <GitHubIcon/>,
    FacebookIcon: <FacebookIcon/>,
    TwitterIcon: <TwitterIcon/>,
    InstagramIcon: <InstagramIcon/>
};

export default function Sidebar(props) {
    const classes = useStyles();
    const {archives, description, social, title} = props;

    return (
        <Grid item xs={12}>
            {title ? <Paper elevation={0} className={classes.sidebarAboutBox}>
                <Typography variant="h6" gutterBottom>
                    {title}
                </Typography>
                <Typography>{description}</Typography>
            </Paper> : null}
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Archives
            </Typography>
            {archives.map((archive, index) => (
                <div key={index}>
                    <Link display="block" variant="body1" href={`#/${archive}`} key={archive}>
                        {archive}
                    </Link>
                </div>
            ))}
            <Typography variant="h6" gutterBottom className={classes.sidebarSection}>
                Social
            </Typography>
            {social.map((network, index) => (
                <div key={index}>
                    <Link display="block" variant="body1" href="#" key={network}>
                        <Grid container direction="row" spacing={1} alignItems="center">
                            <Grid item>
                                {iconMap[network.icon]}
                            </Grid>
                            <Grid item>{network.name}</Grid>
                        </Grid>
                    </Link>
                </div>
            ))}
        </Grid>
    );
}

Sidebar.propTypes = {
    archives: PropTypes.array,
    description: PropTypes.string,
    social: PropTypes.array,
    title: PropTypes.string,
};
