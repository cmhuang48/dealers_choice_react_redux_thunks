import React from 'react';
import store from '../store';
import axios from 'axios';
import { CREATE_PROPERTY } from '../store';

class Properties extends React.Component {
  constructor () {
    super();
    this.state = {
      properties: store.getState().properties
    };
  }
  async createProperty () {
    const property = (await axios.post('/api/properties')).data;
    store.dispatch({
      type: CREATE_PROPERTY,
      property
    });
  }
  componentWillUnmount () {
    this.unsubscribe();
  }
  componentDidMount () {
    this.unsubscribe = store.subscribe(() => {
      this.setState({
        properties: store.getState().properties
      });
    });
  }
  render () {
    const { properties } = this.state;
    return (
      <div>
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
        <button onClick={this.createProperty}>Create Property</button>
      </div>
    )
  }
};

export default Properties;