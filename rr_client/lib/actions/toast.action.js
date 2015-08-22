const RR = require('reactive-react');
const Rx = require('rx');
const UserAction = require('./user.action');

module.exports = RR.Observable.createAction({

  toastLoaded$() {
    return Rx.Observable
      .merge(
        UserAction.userActionMergedToast$
      );
  }

});
