const sequelize = require('./conn');
const Agent = require('./Agent');
const Property = require('./Property');
const faker = require('faker');

const syncAndSeed = async () => {
  try {
    await sequelize.sync({force: true});
    await Promise.all([
      Agent.create({name: 'Yamei Huang', licenseId: 'RB-15085', title: 'Principal Broker', bio: faker.lorem.paragraph()}),
      Agent.create({name: 'Charles Huang', licenseId: 'RS-52789', title: 'Realtor Associate', bio: faker.lorem.paragraph()}),
      Agent.create({name: 'Chanelle Huang', licenseId: 'RS-83461', title: 'Realtor Associate', bio: faker.lorem.paragraph()})
    ]);
    await Promise.all([
      Property.create({name: 'Ilikai Hotel', address: '1777 Ala Moana Blvd, Honolulu, HI 96815', bedrooms: 2, bathrooms: 2, squareFootage: 900, image: 'Ilikai_Hotel.png'}),
      Property.create({name: 'Kahala Beach House', address: '4284 Kahala Ave, Honolulu, HI 96816', bedrooms: 4, bathrooms: 3, squareFootage: 5000, image: 'Kahala_Beach_House.png'}),
      Property.create({name: 'The Park Ward Village', address: '333 Ward Ave, Honolulu, HI 96814', bedrooms: 3, bathrooms: 2, squareFootage: 1600, image: 'The_Park_Ward_Village.png'}),
      Property.create({name: 'Azure Ala Moana', address: '629 Keeaumoku St, Honolulu, HI 96814', bedrooms: 1, bathrooms: 1, squareFootage: 680, image: 'Azure_Ala_Moana.png'})
    ]);
  }
  catch(ex) {
    console.log(ex);
  }
};

module.exports = {
  Agent,
  Property,
  syncAndSeed
};