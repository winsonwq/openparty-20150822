const Reflux = require('reflux');
const ToastAction = require('../actions/toast.action');

module.exports = Reflux.createStore({

  listenables: ToastAction,

  init() {
    this.data = { message: null };
  },

  onFillToastCompleted(payload) {
    this.data.message = payload;
    this.trigger(this.data);
  },

  getInitialState() {
    return this.data;
  }
});
