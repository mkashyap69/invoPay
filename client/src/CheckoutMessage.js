import React, { useEffect } from 'react';
import { CloseIcon } from '@chakra-ui/icons';
import axios from 'axios';
import './css/CheckoutMessage.css';

const CheckoutMessage = ({ message, res, clientToken }) => {
  useEffect(() => {
    if (res?.get('success') && res?.get('id') && clientToken) {
      const invoiceId = res?.get('id');

      const config = {
        headers: {
          Authorization: `Bearer ${clientToken}`,
        },
      };
      const setPaymentDone = async () => {
        await axios.get(
          `http://localhost:9000/api/v1/invoice/setPaymentDoneTrue?invoiceId=${invoiceId}`,
          config
        );
      };
      setPaymentDone();
    }
  }, [res, clientToken]);
  return (
    <div className="app-checkoutMessage">
      <div className="app-checkoutMessage--success">
        {res.get('success') ? (
          <i className="checkmark">✓</i>
        ) : (
          <i className="checkmark-red">
            <CloseIcon />
          </i>
        )}
      </div>

      {res.get('success') ? (
        <p>{message}</p>
      ) : (
        <p style={{ color: 'red ' }}>{message}</p>
      )}
    </div>
  );
};

export default CheckoutMessage;
