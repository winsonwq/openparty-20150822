const RR = require('reactive-react');
const Rx = require('rx');
const UserService = require('../services/user.service');

module.exports = RR.Observable.createAction({

  _loginSubmitted$(loginSubmit$) {
    return loginSubmit$
      .flatMapLatest(({ username, password }) => UserService.login(username, password))
      .share();
  },

  userLoaded$: function() {
    return this._loginSubmitted$
      .filter(resp => resp.ok)
      .map(resp => resp.body);
  },

  loginSubmittedSuccessToast$() {
    return this.userLoaded$
      .map(user => ({ message: `${user.username}，登陆成功` }));
  },

  loginSubmittedFailToast$() {
    return this._loginSubmitted$
      .filter(resp => !resp.ok)
      .map(resp => ({ message: `登陆失败，${resp.body.error}` }));
  },

  userActionMergedToast$() {
    return Rx.Observable
      .merge(
        this.loginSubmittedSuccessToast$,
        this.loginSubmittedFailToast$
      );
  }

});
