const mongoose = require('mongoose');

module.exports = callback => {
  mongoose.connect(process.env.MONGO_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  const db = mongoose.connection;
  db.on('error', console.error.bind(console, 'connection error: '));
  db.once('open', () => {
    console.log('Connected to db');
    if (callback) {
      return callback();
    }
  });
};
