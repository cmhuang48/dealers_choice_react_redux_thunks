import React from 'react';
import axios from 'axios';
import { createProperty } from '../store';
import { connect } from 'react-redux';

const Properties = ({ properties, createProperty }) => {
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
      <button onClick={createProperty}>Create Property</button>
    </div>
  )
};

const mapStateToProps = ({ properties }) => ({properties});

const mapDispatchToProps = (dispatch) => {
  return {
    createProperty: async () => {
      const property = (await axios.post('/api/properties')).data;
      dispatch(createProperty(property));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);