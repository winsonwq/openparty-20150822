const Reflux = require('reflux');
const UserService = require('../services/user.service');

const ToastAction = require('./toast.action');

var actions = Reflux.createActions({
  login: { asyncResult: true }
});

actions.login.listen(function({ username, password }) {
  const _this = this;
  UserService.login(username, password)
    .then(function(response) {
      if (response.ok) {
        this.completed(response.body);
        ToastAction.fillToast(`${response.body.username}, 登陆成功`);
      } else {
        this.failed(response.body);
        ToastAction.fillToast(`登陆失败，${response.body.error}`);
      }
    }.bind(this));
});

module.exports = actions;
