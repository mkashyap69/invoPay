import { Avatar } from '@chakra-ui/avatar';
import { Heading, Text } from '@chakra-ui/layout';
import { CheckCircleIcon, DownloadIcon, Icon } from '@chakra-ui/icons';
import './css/InvoiceView.css';
import { RiSendPlaneFill } from 'react-icons/ri';
import { Table, TableCaption, Tbody, Td, Tr } from '@chakra-ui/table';
import { Button } from '@chakra-ui/button';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import html from './utils/createHTMLForInvoice';
import html2pdf from 'html2pdf.js';
import { sendInvoice } from './redux/actions/invoiceAction';
import { getClientById } from './redux/actions/clientAction';
import { useToast } from '@chakra-ui/toast';
import axios from 'axios';

const InvoiceView = () => {
  const { clientId } = useParams();
  const [clickedClient, setClickedClient] = useState();
  const [total, setTotal] = useState();
  const history = useHistory();
  const toast = useToast();
  const dispatch = useDispatch();

  const invoiceData = useSelector((state) => state.addInvoice?.data?.data);
  const user = useSelector((state) => state.user?.data);

  const getClient = useSelector((state) => state.getClient);
  let htmlForInvoice;

  useEffect(() => {
    dispatch(getClientById(clientId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  useEffect(() => {
    if (getClient) {
      setClickedClient(getClient?.data?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [getClient]);

  useEffect(() => {
    const tot = invoiceData?.invoiceList.reduce(
      (total, i) => total + parseFloat(i.rate),
      0
    );
    setTotal(tot);
  }, [invoiceData]);

  const pdfDownloadHandler = () => {
    htmlForInvoice = html(
      user?.data.name,
      user?.data.email,
      clickedClient.name,
      invoiceData?._id,
      invoiceData?.invoiceDate,
      total,
      invoiceData?.invoiceList,
      `https://invopay.netlify.app/checkout/${invoiceData?._id}`,
      'supportUrl'
    );

    html2pdf().from(htmlForInvoice).save(`invoice.pdf`);
  };

  const sendInvoiceMailHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    };
    const { data } = await axios.get(
      `https://invopay.herokuapp.com/api/v1/auth/clientToken?clientId=${clientId}`,
      config
    );
    await dispatch(sendInvoice(clickedClient, invoiceData, total, data.token));

    // htmlForInvoice = html(
    //   user?.data.name,
    //   user?.data.email,
    //   clickedClient.name,
    //   invoiceData?._id,
    //   invoiceData?.invoiceDate,
    //   total,
    //   invoiceData?.invoiceList,
    //   `https://invopay.netlify.app/checkout/${invoiceData?._id}`,
    //   'supportUrl'
    // );

    // html2pdf()
    //   .from(htmlForInvoice)
    //   .outputPdf('datauristring')
    //   .then((response) => {
    //     uploadToS3(response);
    //   });

    toast({
      title: `Invoice send to the client`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    history.push('/home');
  };
  return (
    <div className="app-invoiceView">
      <div className="app-invoiceView--heading">
        <Heading size="md">Create new invoice</Heading>
      </div>
      <div className="app-invoiceView--sendTo">
        <Heading size="sm" color="black" mt={4} mr="19rem">
          Send to
        </Heading>
        <div className="app-invoiceView--sendTo--client">
          <div>
            <Heading size="md" color="white">
              {clickedClient?.name}
            </Heading>
            <Text size="sm" color="white">
              {clickedClient?.email}
            </Text>
            <Text size="sm" color="white">
              {clickedClient?.phone}
            </Text>
          </div>
          <Avatar name={clickedClient?.name} bg="white" color="black" />
        </div>
      </div>
      <div className="app-invoiceView--details">
        <Heading size="sm" mt={8} ml={5}>
          Invoice details
        </Heading>
        <div className="app-invoiceView--details--table">
          <Table
            variant="simple"
            mt={4}
            width="85%"
            bg="#F8FBFC"
            borderRadius="1rem"
          >
            <TableCaption>
              Total Amount:{' '}
              <strong style={{ fontSize: '1rem' }}>₹{total}</strong>
            </TableCaption>
            <Tbody>
              {invoiceData?.invoiceList?.map((i) => (
                <Tr>
                  <Td>
                    <CheckCircleIcon color="teal" />
                  </Td>
                  <Td>{i.item}</Td>
                  <Td isNumeric>₹{i.rate}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </div>
      </div>
      <div className="app-invoiceView--details--buttons">
        <Button width="60vw" color="teal" onClick={pdfDownloadHandler}>
          <DownloadIcon mr={3} /> Download PDF
        </Button>
        <Button
          width="60vw"
          colorScheme="teal"
          mt={4}
          mb={4}
          onClick={sendInvoiceMailHandler}
        >
          <Icon as={RiSendPlaneFill} mr={3} />
          Send Invoice
        </Button>
      </div>
    </div>
  );
};

export default InvoiceView;
