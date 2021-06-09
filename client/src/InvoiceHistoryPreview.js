import {
  Heading,
  Text,
  Avatar,
  Table,
  Tr,
  Tbody,
  Td,
  Button,
  useToast,
  TableCaption,
  Icon,
} from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import './css/InvoicePreview.css';
import html from './utils/createHTMLForInvoice';
import html2pdf from 'html2pdf.js';
import { getInvoiceById, sendInvoice } from './redux/actions/invoiceAction';
import { CheckCircleIcon, DownloadIcon } from '@chakra-ui/icons';
import { RiSendPlaneFill } from 'react-icons/ri';
import axios from 'axios';

const InvoiceHistoryPreview = () => {
  const { invoiceId } = useParams();
  const [total, setTotal] = useState();
  const history = useHistory();
  const toast = useToast();
  const dispatch = useDispatch();

  const invoiceById = useSelector((state) => state.invoiceById?.data?.data);
  const user = useSelector((state) => state.user?.data);

  useEffect(() => {
    dispatch(getInvoiceById(invoiceId));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const tot = invoiceById?.invoiceList.reduce(
      (total, i) => total + parseFloat(i.rate),
      0
    );
    setTotal(tot);
  }, [invoiceById]);

  const pdfDownloadHandler = () => {
    const htmlForInvoice = html(
      invoiceById?.seller?.name,
      invoiceById?.seller?.email,
      invoiceById?.client?.name,
      invoiceById?._id,
      invoiceById?.invoiceDate,
      total,
      invoiceById?.invoiceList,
      `https://invopay.netlify.app/checkout/${invoiceById?._id}`,
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
      `https://invopay.herokuapp.com/api/v1/auth/clientToken?clientId=${invoiceById?.client?._id}`,
      config
    );
    await dispatch(
      sendInvoice(invoiceById?.client, invoiceById, total, data.token)
    );

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
              {invoiceById?.client?.name}
            </Heading>
            <Text size="sm" color="white">
              {invoiceById?.client?.email}
            </Text>
            <Text size="sm" color="white">
              {invoiceById?.client?.phone}
            </Text>
          </div>
          <Avatar name={invoiceById?.client?.name} bg="white" color="black" />
        </div>
      </div>
      <div className="app-invoiceView--details">
        <div className="app-invoiceView--date">
          <Heading size="sm" mt={8} ml={5}>
            Invoice details
          </Heading>
          <Heading size="xs" mt={8} ml={5}>
            {invoiceById?.invoiceDate}
          </Heading>
        </div>

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
              {invoiceById?.invoiceList?.map((i) => (
                <Tr key={Math.random()}>
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

export default InvoiceHistoryPreview;
