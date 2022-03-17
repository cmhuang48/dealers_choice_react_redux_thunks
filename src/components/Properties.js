import React from 'react';

const Properties = ({properties}) => {
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
    </div>
  )
};

export default Properties;