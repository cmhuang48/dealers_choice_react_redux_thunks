import React from 'react';
import store from '../store';

class Agents extends React.Component {
  constructor () {
    super();
    this.state = {
      agents: store.getState().agents
    };
  }
  componentDidMount () {
    store.subscribe(() => {
      this.setState({
        agents: store.getState().agents
      });
    });
  }
  render () {
    const { agents } = this.state;
    return (
      <div>
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
      </div>
    )
  }
};

export default Agents;