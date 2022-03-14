const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DATABASE_URL || 'postgres://localhost/acme-react-redux');

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
  }
});

const syncAndSeed = async () => {
  try {
    await sequelize.sync({force: true});
    await Promise.all([
      Agent.create({name: 'Yamei Huang', licenseId: 'RB-15085', title: 'Principal Broker'}),
      Agent.create({name: 'Charles Huang', licenseId: 'RS-52789', title: 'Realtor Associate'}),
      Agent.create({name: 'Chanelle Huang', licenseId: 'RS-83461', title: 'Realtor Associate'})
    ]);
    await Promise.all([
      Property.create({name: 'Ilikai Hotel', address: '1777 Ala Moana Blvd, Honolulu, HI 96815', bedrooms: 2, bathrooms: 2, squareFootage: 900}),
      Property.create({name: 'Kahala Beach House', address: '4284 Kahala Ave, Honolulu, HI 96816', bedrooms: 4, bathrooms: 3, squareFootage: 5000}),
      Property.create({name: 'The Park Ward Village', address: '333 Ward Ave, Honolulu, HI 96814', bedrooms: 3, bathrooms: 2, squareFootage: 1600}),
      Property.create({name: 'Azure Ala Moana', address: '629 Keeaumoku St, Honolulu, HI 96814', bedrooms: 1, bathrooms: 1, squareFootage: 680})
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