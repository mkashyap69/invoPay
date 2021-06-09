import axios from 'axios';

export const getAllClients = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_ALL_CLIENTS_START',
    });

    const { user } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };

    const { data } = await axios.get('/api/v1/client/', config);

    dispatch({
      type: 'GET_ALL_CLIENTS_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_CLIENTS_FAIL',
      payload: error.response?.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getClientById = (clientId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_CLIENT_BY_ID_START',
    });

    const { user } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };

    const { data } = await axios.get(`/api/v1/client/${clientId}`, config);

    dispatch({
      type: 'GET_CLIENT_BY_ID_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_CLIENT_BY_ID_FAIL',
      payload: error.response?.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const addClient = (name, email, phone) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'ADD_CLIENT_START',
    });

    const { user } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };

    const { data } = await axios.post(
      '/api/v1/client/',
      { name, email, phone },
      config
    );

    dispatch({
      type: 'ADD_CLIENT_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'ADD_CLIENT_FAIL',
      payload: error.response?.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const updateClient =
  (name, email, phone, clientId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'UPDATE_CLIENT_START',
      });

      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/v1/client?clientId=${clientId}`,
        { name, email, phone },
        config
      );

      dispatch({
        type: 'UPDATE_CLIENT_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'UPDATE_CLIENT_FAIL',
        payload: error.response?.data
          ? error.response.data.message
          : error.message,
      });
    }
  };
