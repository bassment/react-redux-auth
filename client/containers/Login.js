import Firebase from 'firebase';
import * as API from '../api/RestAPI';

import { browserHistory } from 'react-router';
import { connect } from 'react-redux';

import LoginForm from '../components/LoginForm';
import { signin, signout } from '../actions/login';
import { reset } from '../actions/counter';

const mapStateToProps = (state) => {
  return {
    user: state.login.user,
    error: state.login.error
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onSignIn: (username, password) => {
      API.signin(username, password).then(response => {
        if (response.signedIn) {
          const user = response.user.username;
          localStorage.setItem('user', user);
          dispatch(signin(user));
          browserHistory.push('/count');
        } else {
          const error = response.message;
          dispatch(signin(null, error));
        }
      });
    },
    onGoogleSignIn: () => {
      const firebaseRef = new Firebase('https://automat.firebaseio.com/users');
      firebaseRef.authWithOAuthPopup('google', (error, user) => {
        if (error) { return; }
        const googleUser = user.google.displayName;
        localStorage.setItem('user', googleUser);
        dispatch(signin(googleUser, null));
        browserHistory.push('/count');
      });
    },
    onSignUp: (username, password) => {
      API.signup(username, password).then(response => {
        if (response.signedIn) {
          const user = response.user.username;
          localStorage.setItem('user', user);
          dispatch(signin(user, null));
          browserHistory.push('/count');
        } else {
          const error = response.message;
          dispatch(signin(null, error));
        }
      });
    },
    onSignOut: () => {
      localStorage.clear();
      dispatch(signout(null));
      dispatch(reset());
    }
  };
};

const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginForm);

export default Login;
