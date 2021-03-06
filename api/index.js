const outerRoute = require('./outerRoute');
const userRoute = require('./userRoute');

class RoutesCustom {
  constructor(app) {
    app.use('/', outerRoute);
    app.use('/admin', userRoute);
  };
};

module.exports = RoutesCustom;
