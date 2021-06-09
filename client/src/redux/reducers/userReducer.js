export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case 'USER_LOGIN_START':
      return { ...state, loading: true, error: null };
    case 'USER_LOGIN_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'USER_LOGIN_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'USER_SIGNUP_START':
      return { ...state, loading: true, error: null };
    case 'USER_SIGNUP_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'USER_SIGNUP_FAIL':
      return { ...state, loading: false, error: action.payload };
    case 'GET_USER_BY_COOKIE_START':
      return { ...state, loading: true, error: null };
    case 'GET_USER_BY_COOKIE_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'GET_USER_BY_COOKIE_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
