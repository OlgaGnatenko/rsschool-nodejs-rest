const { PORT } = require('./common/config');
const app = require('./app');
const connectToDB = require('./common/db.client');

const startApp = () => {
  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
};

connectToDB(startApp);
