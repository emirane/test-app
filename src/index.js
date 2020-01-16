import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import App from './App';
import Groups from './components/groups/Groups';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Router >
        <Route path='/' exact component={ App } />
        <Route path='/exp/:expID' exact component={ Groups } />
    </Router>,
document.getElementById('root'))

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
