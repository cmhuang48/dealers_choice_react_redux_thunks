import React from 'react';
import axios from 'axios';
import Agents from './components/Agents';
import Properties from './components/Properties';

class App extends React.Component {
  constructor () {
    super();
    this.state = {
      agents: [],
      properties: [],
      loading: true
    };
  }
  async componentDidMount () {
    this.setState({
      agents: (await axios.get('/api/agents')).data,
      properties: (await axios.get('/api/properties')).data,
      loading: false
    });
  }
  render () {
    const {agents, properties, loading} = this.state;
    if (loading) {
      return null;
    }
    return (
      <div>
        <h1>Golden Properties LLC</h1>
        <Agents agents={agents} />
        <Properties properties={properties} />
      </div>      
    );
  }
};

export default App;