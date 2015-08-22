const Reflux = require('reflux');
const UserAction = require('../actions/user.action');

module.exports = Reflux.createStore({

  listenables: UserAction,

  init() {
    this.data = { user: null };
  },

  onLoginCompleted(payload) {
    this.data.user = payload;
    this.trigger(this.data);
  }

});
