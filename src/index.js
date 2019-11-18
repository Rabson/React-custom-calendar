import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/css/bootstrap-theme.min.css';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import App from './App';

ReactDOM.render(
  <Router>
    <div>
      <Route exact path='/' component={App} />
    </div>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
