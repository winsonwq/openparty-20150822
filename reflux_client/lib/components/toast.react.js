const React = require('react');
const Reflux = require('reflux');

const ToastStore = require('../stores/toast.store');

const ToastView = React.createClass({

  mixins: [Reflux.listenTo(ToastStore, 'onMessageChange')],

  onMessageChange(messageData) {
    console.log(messageData);
    this.setState({ message: messageData.message });
  },

  getInitialState() {
    return ToastStore.getInitialState();
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
