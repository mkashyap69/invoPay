import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import './css/Profile.css';
import { getAllInvoice } from './redux/actions/invoiceAction';

const Profile = () => {
  const [isPaymentDoneLength, setIsPaymentDoneLength] = useState(0);
  const [totalRevenue, setTotalRevenue] = useState(0);

  const user = useSelector((state) => state.user?.data?.data);
  const allInvoice = useSelector((state) => state.allInvoice?.data?.data);
  const dispatch = useDispatch();

  const history = useHistory();

  useEffect(() => {
    const inv = allInvoice?.filter((inv) => inv.isPaymentDone === false);
    setIsPaymentDoneLength(inv?.length);
  }, [allInvoice]);

  useEffect(() => {
    let revenue = 0;
    allInvoice?.forEach((inv) => {
      if (inv.isPaymentDone === true) {
        const tot = inv.invoiceList.reduce((total, i) => total + i.rate, 0);
        revenue = tot + revenue;
      }
    });
    setTotalRevenue(revenue);
  }, [allInvoice]);

  useEffect(() => {
    dispatch(getAllInvoice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="app-profile">
      <div className="app-profile--avatar">
        <Avatar name={user?.name} bg="teal" color="white" />
      </div>
      <div className="app-profile--name">
        <Heading size="sm">Hello,</Heading>
        <Heading size="lg">{user?.name}</Heading>
      </div>
      <div className="app-profile--buttons">
        <Button width="60vw" color="teal" isDisabled>
          Create new invoice
        </Button>
        <Button
          width="60vw"
          color="teal"
          mt={4}
          onClick={() => history.push('/addClient')}
        >
          Add new client
        </Button>
      </div>
      <Heading size="sm" ml={8}>
        Overview
      </Heading>
      <div className="app-profile--overview">
        <div className="app-profile--overview-unpaid">
          <Text color="white" size="sm" ml={8}>
            Invoices
          </Text>
          <div className="app-profile--overview-unpaid-info">
            <Heading color="white" size="lg" ml={8}>
              {isPaymentDoneLength?isPaymentDoneLength:0}
            </Heading>
            <Text color="white" size="sm" ml={8}>
              Unpaid
            </Text>
          </div>
        </div>
        <div className="app-profile--overview-projects">
          <Text color="white" size="sm" ml={8}>
            Clients
          </Text>
          <div className="app-profile--overview-projects-info">
            <Heading color="white" size="lg" ml={8}>
              {isPaymentDoneLength?isPaymentDoneLength:0}
            </Heading>
            <Text color="white" size="sm" ml={8}>
              Ongoing
            </Text>
            <Heading color="white" size="lg" ml={8}>
              {allInvoice?.length - isPaymentDoneLength}
            </Heading>
            <Text color="white" size="sm" ml={8}>
              Done
            </Text>
          </div>
        </div>
      </div>
      <div className="app-profile--revenueOverview">
        <div className="app-profile--margin">
          <Text color="teal" size="sm" ml={8}>
            Margin
          </Text>
          <div className="app-profile--revenueOverview-margin-info">
            <Heading color="black" size="lg" ml={8}>
              7%
            </Heading>
          </div>
        </div>
        <div className="app-profile--revenue">
          <Text color="teal" size="sm" ml={8}>
            Revenue
          </Text>
          <div className="app-profile--overview-unpaid-info">
            <Heading color="teal" size="lg" ml={8}>
              ₹{totalRevenue?totalRevenue:0}
            </Heading>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
