const React = require('react');
const LoginView = require('./components/login-view.react');
const ToastView = require('./components/toast.react');

const App = React.createClass({

  render() {
    return (
      <div className="app-container">
        <ToastView />
        <LoginView />
      </div>
    );
  }

});

React.render(<App />, document.body);
