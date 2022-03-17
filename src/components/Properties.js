import React from 'react';
import { createProperty, destroyProperty } from '../store';
import { connect } from 'react-redux';

const Properties = ({ properties, createProperty, destroyProperty }) => {
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
              <button onClick={() => destroyProperty(property)}>Delete Property</button>
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
    createProperty: () => {
      dispatch(createProperty());
    },
    destroyProperty: (property) => {
      dispatch(destroyProperty(property));
    }
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Properties);