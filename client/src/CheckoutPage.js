import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import CheckoutMessage from './CheckoutMessage';
import PaymentButton from './PaymentButton';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getInvoiceById } from './redux/actions/invoiceAction';
import { useToast } from '@chakra-ui/react';

const stripePromise = loadStripe(
  'pk_test_51HTJZJKQ1x4GDojIMHF6JMj6i8mu8DExRDavRddWZyUKFNdcr5MIRZsp9pBrhB9XO2JhAunWlaQLiC0Zkpt1ZKRx00jEcG9K8D'
);

export default function CheckoutPage() {
  const [message, setMessage] = useState('');
  const [res, setRes] = useState('');
  const [total, setTotal] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const toast = useToast();
  const dispatch = useDispatch();
  const invoice = useSelector((state) => state.invoiceById?.data?.data);
  const { error } = useSelector((state) => state.invoiceById);

  const { invoiceId, clientToken } = useParams();

  useEffect(() => {
    if (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: 'Payment Link expired',
        duration: 5000,
      });
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  useEffect(() => {
    dispatch(getInvoiceById(invoiceId, clientToken));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [invoiceId, clientToken]);

  useEffect(() => {
    const tot = invoice?.invoiceList.reduce(
      (total, i) => total + parseFloat(i.rate),
      0
    );

    setTotal(tot * 100);
  }, [invoice]);

  useEffect(() => {
    if (total === 0) {
      setIsDisabled(true);
    }
  }, [total]);

  useEffect(() => {
    if (invoice && !invoice?.isPaymentDone) {
      setIsDisabled(false);
    }
  }, [invoice]);

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    setRes(query);
    if (query.get('success')) {
      setMessage('Success! You will receive an email confirmation.');
    }
    if (query.get('canceled')) {
      setMessage('Oops! Payment Failed -- Try Again.');
    }
  }, []);

  const handleClick = async (event) => {
    try {
      const stripe = await stripePromise;

      const { data } = await axios.post(
        '/api/v1/payment/create-checkout-session',
        {
          invoiceId: invoice?._id,
          total: total,
          clientEmail: invoice?.client?.email,
          clientId: invoice?.client?._id,
          clientToken,
        }
      );

      const result = await stripe.redirectToCheckout({
        sessionId: data.id,
      });
      if (result.error) {
        setMessage(result.error.message);
      }
    } catch (error) {
      toast({
        status: 'error',
        title: 'Error',
        description: error.response.data.message,
      });
      setIsDisabled(true);
    }
  };
  return message ? (
    <div className="app-checkout">
      <CheckoutMessage
        message={message}
        res={res}
        invoiceId={invoice?._id}
        clientToken={clientToken}
      />
    </div>
  ) : (
    <div className="app-checkout">
      <PaymentButton
        disabled={isDisabled}
        handleClick={handleClick}
        clientId={invoice?.client?._id}
      />
    </div>
  );
}
