import React, { Component, Fragment } from 'react';
import Calendar from './components/calendar';

class App extends Component {
  render() {
    return (
      <Fragment>
        <nav className="navbar navbar-default">
          <div className="container-fluid">
            <div className="navbar-header">
              <a className="navbar-brand" href="">calendar</a>
            </div>
          </div>
        </nav>
        <div className="container">
          <Calendar />
        </div>
      </Fragment>
    );
  }
}

export default App;
