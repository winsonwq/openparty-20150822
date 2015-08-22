var { Promise } = require('es6-promise');

module.exports = {

  promise: function(request) {
    return new Promise(function(resolve, reject) {
      request.end(function(err, res) {
        if (err) {
          reject(err);
        } else if (!res.ok) {
          reject(res);
        } else {
          resolve(res);
        }
      });
    });
  }
};
