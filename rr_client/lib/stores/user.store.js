const RR = require('reactive-react');
const Rx = require('rx');
const UserAction = require('../actions/user.action');

module.exports = RR.Observable.createStore(
  UserAction, ['userLoaded$'],
  function(userLoaded$) {

    const data = { user: null };

    const userLoadedTransform$ = userLoaded$
      .map(function(user) {
        return function(sofar) {
          sofar.user = user;
          return sofar;
        };
      });

    const user$ = Rx.Observable
      .merge(
        userLoadedTransform$
      ).scan(data, function(sofar, transform) {
        return transform(sofar);
      });

    return { user$ };
  });
