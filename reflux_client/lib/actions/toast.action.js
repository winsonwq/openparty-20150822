const Reflux = require('reflux');

var actions = Reflux.createActions({
  fillToast: { asyncResult: true }
});

actions.fillToast.listen(function(message) {
  this.completed(message);
});

module.exports = actions;
