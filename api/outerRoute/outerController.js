const { authUserModel } = require('./outerModel');

class outerController {
  welcome(req, res) {
    res.sendFile('welcome.html', { root: `${ROOT_DIR}/public` });
  };
  authUser(req, res) {
    const { email, password } = req.body;

    authUserModel(email, password, (data, error) => {
      let response = { status: 0, data: data, error: null };

      if (data == false) {
        response.status = 0;
        response.error = error;
      } else {
        response.status = 1;
        response.data = data;
      };

      res.send(response);
    });
  };

}


module.exports = outerController;
