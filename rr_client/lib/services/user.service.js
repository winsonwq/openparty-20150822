var superagent = require('superagent');
var requestHelper = require('../utils/request-helper');

var HOST = 'http://localhost:9997';

module.exports = {
  login(username, password) {
    var request = superagent
      .post(HOST + '/login')
      .send({ username, password });

    return requestHelper.promise(request).catch((err) => err.response);
  }
};
