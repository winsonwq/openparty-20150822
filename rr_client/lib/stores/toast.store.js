const RR = require('reactive-react');
const Rx = require('rx');
const ToastAction = require('../actions/toast.action');

module.exports = RR.Observable.createStore(
  ToastAction, ['toastLoaded$'],
  function(toastLoaded$) {

    const data = { message: null };

    const toastLoadedTransform$ = toastLoaded$
      .map(function(toastData) {
        return function(sofar) {
          sofar.message = toastData.message;
          return sofar;
        };
      });

    const toast$ = Rx.Observable
      .merge(
        toastLoadedTransform$
      ).scan(data, function(sofar, transform) {
        return transform(sofar);
      });

    return { toast$ };
  });
