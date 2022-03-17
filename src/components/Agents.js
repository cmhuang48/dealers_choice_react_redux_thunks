import React from 'react';

const Agents = ({agents}) => {
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
};

export default Agents;