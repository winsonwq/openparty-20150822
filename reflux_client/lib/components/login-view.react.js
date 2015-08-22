const React = require('react');
const Reflux = require('reflux');
const formSerialize = require('form-serialize');

const UserAction = require('../actions/user.action');
const UserStore = require('../stores/user.store');

const LoginView = React.createClass({

  mixins: [Reflux.listenTo(UserStore, 'onUserChange')],

  onUserChange(userData) {
    this.setState({ user: userData.user });
  },

  handleLogin(evt) {
    evt.preventDefault();
    UserAction.login(formSerialize(evt.target, { hash: true }));
  },

  render() {
    return (
      <div className="login-view">
        <form onSubmit={ this.handleLogin }>
          <p>
            <label>
              Username:
              <input type="text" name="username" />
            </label>
          </p>
          <p>
            <label>
              Password:
            <input type="password" name="password" />
            </label>
          </p>
          <p>
            <button>登陆</button>
          </p>
        </form>
      </div>
    );
  }

});

module.exports = LoginView;
