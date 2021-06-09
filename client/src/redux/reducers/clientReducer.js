export const allClientReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_CLIENTS_START':
      return { ...state, loading: true, error: null };
    case 'GET_ALL_CLIENTS_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'GET_ALL_CLIENTS_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const addClientReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_CLIENT_START':
      return { ...state, loading: true, error: null };
    case 'ADD_CLIENT_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'ADD_CLIENT_FAIL':
      return { ...state, loading: false, error: action.payload };

    case 'ADD_CLIENT_RESET':
      return { ...state, loading: false, error: null, data: null };

    default:
      return state;
  }
};

export const getClientByIdReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_CLIENT_BY_ID_START':
      return { ...state, loading: true, error: null };
    case 'GET_CLIENT_BY_ID_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'GET_CLIENT_BY_ID_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};

export const updateClientReducer = (state = {}, action) => {
  switch (action.type) {
    case 'UPDATE_CLIENT_START':
      return { ...state, loading: true, error: null };
    case 'UPDATE_CLIENT_SUCCESS':
      return { ...state, loading: false, data: action.payload };

    case 'UPDATE_CLIENT_FAIL':
      return { ...state, loading: false, error: action.payload };

    default:
      return state;
  }
};
