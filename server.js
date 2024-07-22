const express = require('express');
const app = express();
const port = process.env.PORT || 5000;
const cors = require('cors');
const mongoose = require("./helper/mongoose-connection");
const bodyParser = require('body-parser');
const { cliColorGreen } = require('./helper/util-helper');
const routes = require('./helper/router');
const requestLogger = require('./middleware/request-logger');
const serverless = require('serverless-http');
const path = require('path');

app.use(bodyParser.urlencoded());
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

// Route all other requests to index.html (important for client-side routing)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(requestLogger);

app.use('/api', routes);

app.use((_, res) => {
   res.status(404).json({ message: 'Resource not found' });
});

mongoose.connect().catch(console.dir);

// Disconnects MongoDB on Ctrl+C
process.on('SIGINT', async () => {
   try {
      await mongoose.disconnect();
      console.log('Disconnected from MongoDB');
      process.exit(0); // Exit the process gracefully
   } catch (error) {
      console.error('Error disconnecting from MongoDB:', error);
      process.exit(1); // Exit with an error code
   }
});

// app.listen(port, () => {
//    const url = cliColorGreen(`http://127.0.0.1:${port}`);
//    console.log(`Server is up at ${url}`);
// });

module.exports.handler = serverless(app);