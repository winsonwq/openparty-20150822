const React = require('react');
const RR = require('reactive-react');
const Rx = require('rx');

const ToastStore = require('../stores/toast.store');

const ToastView = React.createClass({

  mixins: [
    RR.subscribe(ToastStore, { toast$: 'toastChange' })
  ],

  toastChange(messageData) {
    this.setState({ message: messageData.message });
  },

  getInitialState() {
    return {};
  },

  render() {
    return (
      <div className="toast-view">
        <p>{ this.state.message }</p>
      </div>
    );
  }

});

module.exports = ToastView;
