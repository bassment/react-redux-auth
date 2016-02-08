import { SIGN_IN, SIGN_OUT } from '../actions/login';

export default function login(
  state = {
    user: null || localStorage.getItem('user'),
    error: null
  },
  action
) {
  switch (action.type) {
  case SIGN_IN: {
    return {
      user: action.user,
      error: action.error
    };
  }
  case SIGN_OUT: {
    return {
      user: null,
      error: null
    };
  }
  default: {
    return state;
  }
  }
}
