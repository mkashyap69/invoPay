export const addInvoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'ADD_INVOICE_START':
      return { ...state, loading: true, error: null };

    case 'ADD_INVOICE_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'ADD_INVOICE_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getAllInvoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_ALL_INVOICE_START':
      return { ...state, loading: true, error: null };

    case 'GET_ALL_INVOICE_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'GET_ALL_INVOICE_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getInvoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_INVOICE_START':
      return { ...state, loading: true, error: null };

    case 'GET_INVOICE_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'GET_INVOICE_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const getInvoiceByClientReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_INVOICE_BY_CLIENT_START':
      return { ...state, loading: true, error: null };

    case 'GET_INVOICE_BY_CLIENT_SUCCESS':
      return { ...state, loading: false, data: action.payload };
    case 'GET_INVOICE_BY_CLIENT_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

export const sendInvoiceReducer = (state = {}, action) => {
  switch (action.type) {
    case 'SEND_INVOICE_START':
      return { ...state, loading: true, error: null };

    case 'SEND_INVOICE_SUCCESS':
      return { ...state, loading: false };
    case 'SEND_INVOICE_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};
