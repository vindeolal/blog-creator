import React from 'react'
import {useParams} from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline/CssBaseline";
import Container from "@material-ui/core/Container";
import ImageHeader from "./ImageHeader";
import Grid from "@material-ui/core/Grid";
import Footer from "./Footer";
import Divider from "@material-ui/core/Divider";
import {makeStyles} from "@material-ui/core/styles";
import {fetchJson, fetchText} from "./FetchUtil";
import ReactMarkdown from "react-markdown";

const useStyles = makeStyles((theme) => ({
    body: {
        ...theme.typography.body2,
        padding: theme.spacing(3, 0),
        textAlign: 'center',
        fontSize: 20
    },
}));

export const Post = () => {
    const classes = useStyles();
    const {dir, index} = useParams();

    const [postMetadata, setPostMetadata] = React.useState();
    const [content, setContent] = React.useState();
    const [loadPost, setLoadPost] = React.useState(false);
    const [footer, setFooter] = React.useState({});

    const fetchPost = async () => {
        await fetchJson(`/post/postMetadata.json`).then(data => {
            const {posts, footer} = data;
            const metadata = posts[dir][index];
            setPostMetadata(metadata);
            setFooter(footer);
            return metadata.fileName;
        }).then((filename) => fetchText(`/content/${filename}`))
            .then(content => setContent(content))
            .then(() => setLoadPost(true));
    };

    React.useEffect(() => {
        fetchPost();
    }, []);


    const renderPost = () => {
        const {title, date, image, imageText} = postMetadata;
        const header = {image, imageText, title};
        return (
            <React.Fragment>
                <CssBaseline/>
                <Container maxWidth="lg">
                    <p/>
                    <main>
                        <ImageHeader content={header}/>
                        <Divider/>
                        <Grid className={classes.body}>
                            <ReactMarkdown
                                source={content}
                                escapeHtml={false}
                            />
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
        loadPost ? renderPost() : <div/>
    );
};
