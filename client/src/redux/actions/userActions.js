import axios from 'axios';

export const login = (email, password) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'USER_LOGIN_START',
    });

    const { data } = await axios.post(
      '/api/v1/auth/login',
      { email, password },
      { withCredentials: true }
    );
    dispatch({
      type: 'USER_LOGIN_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'USER_LOGIN_FAIL',
      payload: error.response?.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const signup =
  ({ email, phone, password, name }) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: 'USER_SIGNUP_START',
      });

      const { data } = await axios.post(
        '/api/v1/auth/',
        { email, password, name, phone },
        { withCredentials: true }
      );
      dispatch({
        type: 'USER_SIGNUP_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'USER_SIGNUP_FAIL',
        payload: error.response?.data
          ? error.response.data.message
          : error.message,
      });
    }
  };

export const getUserByCookie = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_USER_BY_COOKIE_START',
    });

    const config = {
      withCredentials: true,
    };

    const { data } = await axios.get('/api/v1/auth/user', config);

    dispatch({
      type: 'GET_USER_BY_COOKIE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_USER_BY_COOKIE_FAIL',
      payload: error.response?.data
        ? error.response.data.message
        : error.message,
    });
  }
};

