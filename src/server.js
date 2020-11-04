const { PORT } = require('./common/config');
const app = require('./app');
const connectToDB = require('./common/db.client');
const usersService = require('./resources/users/user.service');

const startApp = () => {
  // add admin user
  const adminUser = {
    name: 'admin',
    login: 'admin',
    password: 'admin'
  };
  usersService.createUser(adminUser);

  app.listen(PORT, () =>
    console.log(`App is running on http://localhost:${PORT}`)
  );
};

connectToDB(startApp);
