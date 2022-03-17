const express = require('express');
const app = express();
const path = require('path');
const { Agent, Property, syncAndSeed } = require('./db');

app.use('/dist', express.static(path.join(__dirname, '../dist')));

app.get('/', (req, res)=> res.sendFile(path.join(__dirname, '../index.html')));

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