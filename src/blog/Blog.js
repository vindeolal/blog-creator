import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import ImageHeader from './ImageHeader';
import Posts from './Posts';
import Footer from './Footer';
import {useParams} from "react-router-dom";
import Sidebar from "./Sidebar";
import {fetchJson} from "./FetchUtil";


const useStyles = makeStyles((theme) => ({
    mainGrid: {
        marginTop: theme.spacing(3),
    }
}));

export default function Blog() {
    const classes = useStyles();
    const {dir} = useParams();

    const [blogHeader, setBlogHeader] = React.useState({});
    const [sidebar, setSidebar] = React.useState({});
    const [footer, setFooter] = React.useState({});
    const [loadApp, setLoadApp] = React.useState(false);
    const [latestPostDir, setLatestPostDir] = React.useState(dir);
    const [posts, setPosts] = React.useState();

    React.useEffect(() => {
        posts && setLatestPostDir(dir)
    }, [dir]);

    const fetchData = async () => {
        await fetchJson(`/post/postMetadata.json`).then(data => {
            const {header, footer, sidebar, posts} = data;
            const latestPostDir = dir || sidebar.archives[0];
            setBlogHeader(header);
            setSidebar(sidebar);
            setFooter(footer);
            setPosts(posts);
            setLatestPostDir(latestPostDir);
        });
        setLoadApp(true);
    };

    React.useEffect(() => {
        fetchData();
    }, []);


    const renderContent = () => {
        return (
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <p/>
                    <main>
                        <ImageHeader content={blogHeader}/>
                        <Grid container>
                            <Grid container item xs={9} className={classes.mainGrid}>
                                <Posts posts={posts[latestPostDir]} dir={latestPostDir}/>
                            </Grid>
                            <Grid item xs={3}>
                                <Sidebar
                                    title={sidebar.title}
                                    description={sidebar.description}
                                    archives={sidebar.archives}
                                    social={sidebar.social}
                                />
                            </Grid>
                        </Grid>
                    </main>
                </Container>
                <Footer title={footer.title}
                        description={footer.description}
                        websiteName={footer.websiteName}
                        websiteURL={footer.websiteURL}/>
            </React.Fragment>
        );
    };

    return (
        loadApp ? renderContent() : <div/>
    );
}
