const Sequelize = require('sequelize');
const sequelize = require('./conn');
const faker = require('faker');

const Property = sequelize.define('property', {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  address: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bedrooms: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bathrooms: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  squareFootage: {
    type: Sequelize.DataTypes.INTEGER,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  image: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

Property.createRandomProperty = function () {
  return this.create({
    name: faker.company.companyName(), 
    address: faker.address.streetAddress(), 
    bedrooms: Math.ceil(Math.random()*10), 
    bathrooms: Math.ceil(Math.random()*10),
    squareFootage: Math.ceil(Math.random()*10000),
    image: faker.system.fileName()
  });
}

module.exports = Property;