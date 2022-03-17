import React from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import Agents from './components/Agents';
import Properties from './components/Properties';
import { loadAgents, loadProperties, loaded } from './store';
import { connect } from 'react-redux';

class _App extends React.Component {
  constructor () {
    super();
    this.state = { view: '' };
  }
  async componentDidMount () {
    window.addEventListener('hashchange', () => {
      this.setState({ view: window.location.hash.slice(1) });
    });
    this.setState({ view: window.location.hash.slice(1) });
    this.props.load();
  }
  render () {
    const { view } = this.state;
    const { loading } = this.props;
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

const mapStateToProps = ({ loading }) => ({loading});

const mapDispatchToProps = (dispatch) => {
  return {
    load: async () => {
      const agents = (await axios.get('/api/agents')).data;
      const properties = (await axios.get('/api/properties')).data;
      dispatch(loadAgents(agents));
      dispatch(loadProperties(properties));
      dispatch(loaded());
    }
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;