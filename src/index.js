import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';

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
        <h2>Agents ({agents.length})</h2>
        <ul id='agents'>
          {agents.map(agent => {
            return (
              <li key={agent.id}>
                <h3>{agent.name}</h3>
                <ul>
                  <li>License ID: {agent.licenseId}</li>
                  <li>Title: {agent.title}</li>
                  <li>Bio: {agent.bio}</li>
                </ul>
              </li>
            );
          })}
        </ul>
        <h2>Properties ({properties.length})</h2>
        <ul id='properties'>
          {properties.map(property => {
            return (
              <li key={property.id}>
                <h3>{property.name}</h3>
                <ul>
                  <li>Address: {property.address}</li>
                  <li>{property.bedrooms} bedrooms | {property.bathrooms} bathrooms | {property.squareFootage} sq ft</li>
                  <li>{property.image}</li>
                </ul>
              </li>
            );
          })}
        </ul>
      </div>      
    );
  }
};

render(<App />, document.querySelector('#root'));