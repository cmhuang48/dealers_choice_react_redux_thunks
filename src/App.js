import React from 'react';
import axios from 'axios';
import Nav from './components/Nav';
import Agents from './components/Agents';
import Properties from './components/Properties';
import { loadAgents, loadProperties, loaded, setView } from './store';
import { connect } from 'react-redux';

class _App extends React.Component {
  componentDidMount () {
    this.props.load();
    window.addEventListener('hashchange', () => {
      this.props.setView(window.location.hash.slice(1));
    });
    this.props.setView(window.location.hash.slice(1));
  }
  render () {
    const { loading, view } = this.props;
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

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => {
  return {
    load: () => {
      dispatch(loadAgents());
      dispatch(loadProperties());
      dispatch(loaded());
    },
    setView: function (view) {
      dispatch(setView(view));
    }
  };
};

const App = connect(mapStateToProps, mapDispatchToProps)(_App);

export default App;