const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-react-redux');
const faker = require('faker');

const Agent = sequelize.define('agent', {
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  licenseId: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  title: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  },
  bio: {
    type: Sequelize.DataTypes.TEXT,
    allowNull: false,
    validate: {
      notEmpty: true
    }
  }
});

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

const express = require('express');
const app = express();
const path = require('path');

app.use('/dist', express.static(path.join(__dirname, 'dist')));
app.get('/', (req, res)=> res.sendFile(path.join(__dirname, 'index.html')));

app.get('/api/agents', async (req, res, next) => {
  try {
    res.send(await Agent.findAll());
  }
  catch(ex) {
    next(ex);
  }
})

app.get('/api/properties', async (req, res, next) => {
  try {
    res.send(await Property.findAll());
  }
  catch(ex) {
    next(ex);
  }
})

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
  }
  catch(ex) {
    console.log(ex);
  }
};

init();