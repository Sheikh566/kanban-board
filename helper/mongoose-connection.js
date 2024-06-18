
const mongoose = require('mongoose');
const { cliColorYellow } = require('./util-helper');

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function connect() {
  // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
  const db = await mongoose.connect(process.env.MONGODB_URI, clientOptions);
  await mongoose.connection.db.admin().command({ ping: 1 });
  console.log(`Pinged your deployment. You successfully connected to ${cliColorYellow("MongoDB")}!`);
  return db;
}

async function disconnect() {
  await mongoose.disconnect();
  console.log('Disconnected from MongoDB');
}

module.exports = { connect, disconnect };