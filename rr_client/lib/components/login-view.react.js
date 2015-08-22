const React = require('react');
const RR = require('reactive-react');
const Rx = require('rx');
const formSerialize = require('form-serialize');

const UserStore = require('../stores/user.store');

const LoginView = React.createClass({

  mixins: [
    RR.subscribe(UserStore, { user$: 'userChange' })
  ],

  userChange(userData) {
    this.setState({ user: userData.user });
  },

    handleLogin: RR.Observable.bind('loginSubmit$', function(observable, _this) {
    return observable.map(function(evt) {
      evt.preventDefault();
      return formSerialize(evt.target, { hash: true });
    })
  }),

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
