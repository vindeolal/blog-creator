import React, {Component} from 'react';
import './App.css';
import {HashRouter as Router, Route} from 'react-router-dom'
import Blog from "./blog/Blog";
import {Post} from "./blog/Post";

class App extends Component {
    render() {
        return (
            <Router>
                <Route exact path='/' component={Blog}/>
                <Route exact path='/:dir' component={Blog}/>
                <Route exact path='/:dir/:index' component={Post}/>
            </Router>
        );
    }
}

export default App;
