import * as React from 'react';
import { ProcessListContainer } from './ProcessListContainer';
import '../styles/App.css';

class App extends React.Component<{}, null> {
  render() {
    return (
      <div>

        <section className="hero is-light is-bold">
          <div className="hero-body">
            <div className="container">
              <h1 className="title">Process list</h1>
              <h2 className="subtitle">
                View an interactive listing of the processes running on this Heroku instance.
              </h2>
            </div>
          </div>
        </section>

        <section className="section">
          <div className="container thing-container">
            <ProcessListContainer />
          </div>
        </section>

      </div>
    );
  }
}

export default App;
