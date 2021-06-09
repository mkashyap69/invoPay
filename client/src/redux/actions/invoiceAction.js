import axios from 'axios';

export const addInvoice =
  (invoiceList, clientId) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'ADD_INVOICE_START',
      });

      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      const { data } = await axios.post(
        `https://invopay.herokuapp.com/api/v1/invoice?client=${clientId}`,
        { invoiceList },
        config
      );

      dispatch({
        type: 'ADD_INVOICE_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'ADD_INVOICE_FAIL',
        payload: error.response?.data
          ? error.response.data.message
          : error.message,
      });
    }
  };

export const sendInvoice =
  (clickedClient, invoiceData, total, clientToken) =>
  async (dispatch, getState) => {
    try {
      dispatch({
        type: 'SEND_INVOICE_START',
      });
      const { user } = getState();
      const config = {
        headers: {
          Authorization: `Bearer ${user.data.token}`,
        },
      };

      await axios.post(
        'https://invopay.herokuapp.com/api/v1/invoice/sendInvoiceMail',
        {
          seller: user?.data?.data.name,
          sellerEmail: user?.data?.data.email,
          clientName: clickedClient.name,
          clientEmail: clickedClient.email,
          invoiceId: invoiceData?._id,
          invoiceDate: invoiceData?.invoiceDate,
          total: total,
          invoiceListArray: invoiceData?.invoiceList,
          payUrl: `https://invopay.netlify.app/checkout/${clientToken}/${invoiceData?._id}`,
        },
        config
      );

      dispatch({
        type: 'SEND_INVOICE_SUCCESS',
      });
    } catch (error) {
      dispatch({
        type: 'SEND_INVOICE_FAIL',
        payload: error.response?.data
          ? error.response.data.message
          : error.message,
      });
    }
  };

export const getAllInvoice = () => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_ALL_INVOICE_START',
    });

    const { user } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };

    const { data } = await axios.get(
      `https://invopay.herokuapp.com/api/v1/invoice`,
      config
    );

    dispatch({
      type: 'GET_ALL_INVOICE_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_ALL_INVOICE_FAIL',
      payload: error.response?.data
        ? error.response.data.message
        : error.message,
    });
  }
};

export const getInvoiceById =
  (invoiceId, clientToken) => async (dispatch, getState) => {
    try {
      dispatch({
        type: 'GET_INVOICE_START',
      });
      const { user } = getState();
      let config;
      console.log(clientToken);
      if (clientToken) {
        config = {
          headers: {
            Authorization: `Bearer ${clientToken}`,
          },
        };
      } else {
        config = {
          headers: {
            Authorization: `Bearer ${user.data.token}`,
          },
        };
      }
      const { data } = await axios.get(
        `https://invopay.herokuapp.com/api/v1/invoice/invoiceById?invoiceId=${invoiceId}`,
        config
      );

      dispatch({
        type: 'GET_INVOICE_SUCCESS',
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: 'GET_INVOICE_FAIL',
        payload: error.response?.data
          ? error.response.data.message
          : error.message,
      });
    }
  };

export const getInvoiceByClient = (clientId) => async (dispatch, getState) => {
  try {
    dispatch({
      type: 'GET_INVOICE_BY_CLIENT_START',
    });

    const { user } = getState();
    const config = {
      headers: {
        Authorization: `Bearer ${user.data.token}`,
      },
    };

    const { data } = await axios.get(
      `https://invopay.herokuapp.com/api/v1/invoice/${clientId}`,
      config
    );

    dispatch({
      type: 'GET_INVOICE_BY_CLIENT_SUCCESS',
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: 'GET_INVOICE_BY_CLIENT_FAIL',
      payload: error.response?.data
        ? error.response.data.message
        : error.message,
    });
  }
};
