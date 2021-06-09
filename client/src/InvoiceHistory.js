import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Heading,
  Table,
  Tbody,
  Text,
  Th,
  Thead,
  Tr,
} from '@chakra-ui/react';
import './css/InvoiceHistory.css';
import InvoiceHistoryClients from './InvoiceHistoryClients';
import { useDispatch, useSelector } from 'react-redux';
import { getAllInvoice } from './redux/actions/invoiceAction';
import broke from './images/Empty-bro.svg';

const InvoiceHistory = () => {
  const dispatch = useDispatch();
  const [paid, setPaid] = useState(false);
  const [paidInvoice, setPaidInvoice] = useState([]);
  const [unPaidInvoice, setUnPaidInvoice] = useState([]);
  const [filteredInvoiceList, setFilteredInvoiceList] = useState([]);
  const allInvoice = useSelector((state) => state.allInvoice?.data?.data);

  useEffect(() => {
    dispatch(getAllInvoice());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const invNotPaid = allInvoice?.filter((inv) => inv.isPaymentDone === false);
    setUnPaidInvoice(invNotPaid);
    setFilteredInvoiceList(invNotPaid);
  }, [allInvoice]);

  useEffect(() => {
    const invPaid = allInvoice?.filter((inv) => inv.isPaymentDone === true);
    setPaidInvoice(invPaid);
  }, [allInvoice]);

  const paidInvoiceHandler = () => {
    setPaid(true);
    setFilteredInvoiceList(paidInvoice);
  };
  const unPaidInvoiceHandler = () => {
    setPaid(false);
    setFilteredInvoiceList(unPaidInvoice);
  };

  return (
    <div className="app-invoiceHistory">
      <Heading ml={4} color="teal">
        Invoice History
      </Heading>
      {allInvoice?.length !== 0 ? (
        <>
          <div className="app-invoiceHistory-filter">
            <Button
              size="sm"
              colorScheme={paid ? 'green' : 'white'}
              color="black"
              onClick={paidInvoiceHandler}
            >
              Paid
            </Button>
            <Button
              size="sm"
              colorScheme={paid ? 'white' : 'red'}
              color="black"
              onClick={unPaidInvoiceHandler}
            >
              Unpaid
            </Button>
          </div>
          {filteredInvoiceList?.length !== 0 ? (
            <div className="app-invoiceHistory--list">
              <Table size="sm" mt={4}>
                <Thead>
                  <Tr>
                    <Box
                      flex="1"
                      textAlign="left"
                      display="flex"
                      alignItems="center"
                      justifyContent="space-around"
                    >
                      <Th>#</Th>
                      <Th>
                        <span>Name</span>
                      </Th>
                      <Th>
                        <span>Payment</span>
                      </Th>
                      <Th>
                        <span>Invoice</span>
                      </Th>
                      <Th>
                        <span>Receipt</span>
                      </Th>
                    </Box>
                  </Tr>
                </Thead>
                <Tbody>
                  {filteredInvoiceList?.map((invoice) => {
                    return (
                      <InvoiceHistoryClients
                        invoice={invoice}
                        client={invoice.client}
                        key={Math.random()}
                      />
                    );
                  })}
                </Tbody>
              </Table>
            </div>
          ) : (
            <div className="app-invoiceHistory--broke">
              <Text fontSize="lg" color="red">
                You don't have any invoices here
              </Text>
            </div>
          )}
        </>
      ) : (
        <div>
          <object
            type="image/svg+xml"
            data={broke}
            className="app-invoiceHistory--brokeImage"
          >
            svg-animation
          </object>
          <div className="app-invoiceHistory--broke">
            <Text fontSize="lg" color="red">
              Look's like you are broke
            </Text>
            <Text fontSize="lg" color="red">
              Add some new invoices and start making money
            </Text>
          </div>
        </div>
      )}
    </div>
  );
};

export default InvoiceHistory;
//
