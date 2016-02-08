import shared from '../css/shared.css';
import styles from '../css/LoginForm.css';

import React, {PropTypes} from 'react';
import Helmet from 'react-helmet';

export default class Login extends React.Component {
  static propTypes = {
    onSignIn: PropTypes.func.isRequired,
    onSignUp: PropTypes.func.isRequired,
    onSignOut: PropTypes.func.isRequired,
    onGoogleSignIn: PropTypes.func.isRequired,
    user: PropTypes.string,
    error: PropTypes.string
  };

  render() {
    const {user, error, onSignIn,
      onGoogleSignIn, onSignUp, onSignOut} = this.props;
    let username;
    let password;

    if (user) {
      return (
        <div>
          <section className={shared.section}>
            <p>Hi {user}!</p>
            <p>
              <button
                className={styles.button}
                onClick={onSignOut}>Sign Out</button>
            </p>
          </section>
        </div>
      );
    }

    return (
      <div>
        <Helmet title="Login"/>
        <section className={shared.section}>
          <p>
            <input
              type="text"
              placeholder="Username"
              ref={node => {
                username = node;
              }}
            />
          </p>
          <p>
            <input
              type="password"
              placeholder="Password"
              ref={node => {
                password = node;
              }}
            />
          </p>
          {
            error ?
              <span className={styles.errorMessage}>
                {error}
              </span> :
                null
          }
          <p>
            <button
              className={styles.button}
              onClick={() => onSignIn(username.value, password.value)}>
              Sign In
            </button>
            <button
              className={styles.button}
              onClick={() => onSignUp(username.value, password.value)}>
              Sign Up
            </button>
            <button
              className={styles.googleButton}
              onClick={onGoogleSignIn}>Login with Google</button>
          </p>
        </section>
      </div>
    );
  }
}
