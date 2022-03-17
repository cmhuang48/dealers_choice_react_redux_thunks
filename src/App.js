import React from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import Agents from './components/Agents';
import Properties from './components/Properties';
import store, { LOAD_AGENTS, LOAD_PROPERTIES, LOADED } from './store';

class App extends React.Component {
  constructor () {
    super();
    this.state = {...store.getState(), view: ''};
  }
  async componentDidMount () {
    window.addEventListener('hashchange', () => {
      this.setState({ view: window.location.hash.slice(1) });
    });
    this.setState({ view: window.location.hash.slice(1) });
    const agents = (await axios.get('/api/agents')).data;
    const properties = (await axios.get('/api/properties')).data;
    store.subscribe(() => {
      this.setState(store.getState());
    });
    store.dispatch({
      type: LOAD_AGENTS,
      agents
    });
    store.dispatch({
      type: LOAD_PROPERTIES,
      properties
    });
    store.dispatch({
      type: LOADED
    });
  }
  render () {
    const { loading, view } = this.state;
    if (loading) {
      return null;
    }
    return (
      <div>
        <h1>Golden Properties LLC</h1>
        <Nav />
        { view === '' && <div>Home</div>}
        { view === 'agents' && <Agents />}
        { view === 'properties' && <Properties />}
      </div>
    );
  }
};

export default App;