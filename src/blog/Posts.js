import React from 'react';
import PropTypes from 'prop-types';
import {makeStyles} from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';

const useStyles = makeStyles({
    root: {
        flexGrow: 1,
    },
    card: {
        display: 'flex',
    },
    cardDetails: {
        flex: 1,
    },
    cardMedia: {
        width: 160,
    },
});

export default function Posts({posts, dir}) {
    const classes = useStyles();

    return (
        <Grid container item spacing={3} xs={12} md={12}>
            {posts.map((post, index) =>
                <Grid key={index} item xs={12} md={6}>
                    <CardActionArea component="a" href={`#/${dir}/${index}`}>
                        <Card className={classes.card}>
                            <div className={classes.cardDetails}>
                                <CardContent>
                                    <Typography component="h2" variant="h5">
                                        {post.title}
                                    </Typography>
                                    <Typography variant="subtitle1" color="textSecondary">
                                        {post.date}
                                    </Typography>
                                    <Typography variant="subtitle1" color="primary">
                                        Read content...
                                    </Typography>
                                </CardContent>
                            </div>
                            <Hidden xsDown>
                                <CardMedia className={classes.cardMedia} image={post.image}
                                           title={post.imageTitle}/>
                            </Hidden>
                        </Card>
                    </CardActionArea>
                </Grid>
            )}
        </Grid>
    );
}

Posts.propTypes = {
    post: PropTypes.object,
};
