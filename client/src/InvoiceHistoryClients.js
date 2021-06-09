import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Box } from '@chakra-ui/layout';
import { Th } from '@chakra-ui/table';
import { useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { Tag } from '@chakra-ui/tag';
import html from './utils/createHTMLForReciept';
import { useSelector } from 'react-redux';
import html2pdf from 'html2pdf.js';

const InvoiceHistoryClients = ({ invoice, client }) => {
  const user = useSelector((state) => state.user?.data?.data);

  const [total, setTotal] = useState();

  useEffect(() => {
    const tot = invoice?.invoiceList.reduce(
      (total, i) => total + parseFloat(i.rate),
      0
    );
    setTotal(tot);
  }, [invoice]);

  const recieptPDFDownloader = () => {
    const htmlForReceipt = html(
      user.name,
      client.name,
      user.email,
      invoice._id,
      invoice.invoiceDate,
      invoice.receiptDate,
      total,
      invoice.invoiceList,
      'pdfUrl',
      '',
      ''
    );
    html2pdf().from(htmlForReceipt).save(`reciept.pdf`);
  };

  const history = useHistory();
  return (
    <Box
      flex="1"
      textAlign="left"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      <Th ml={-2} mr={-2}>
        <Avatar name={client?.name} size="sm" bg="teal" color="white" />
      </Th>
      <Th ml={-2} mr={-2}>
        <span>{client?.name}</span>
      </Th>
      <Th ml={-2} mr={-2}>
        {invoice.isPaymentDone ? (
          <Tag
            size="xs"
            variant="outline"
            borderRadius="full"
            colorScheme="white"
            color="#2EE56A"
          >
            Paid
          </Tag>
        ) : (
          <Tag
            size="xs"
            variant="outline"
            borderRadius="full"
            colorScheme="white"
            color="#FA7778"
          >
            Unpaid
          </Tag>
        )}
      </Th>
      <Th ml={-4}>
        <Button onClick={() => history.push(`/invoiceHis/${invoice._id}`)}>
          📄
        </Button>
      </Th>
      <Th>
        {invoice.isPaymentDone ? (
          <Button onClick={recieptPDFDownloader}>📄</Button>
        ) : (
          <span>NA</span>
        )}
      </Th>
    </Box>
  );
};

export default InvoiceHistoryClients;
