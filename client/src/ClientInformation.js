/* eslint-disable react-hooks/exhaustive-deps */
import { CgProfile } from 'react-icons/cg';
import { Avatar } from '@chakra-ui/avatar';
import {
  Button,
  Input,
  IconButton,
  Stack,
  NumberInput,
  NumberInputField,
  SkeletonCircle,
  SkeletonText,
  useToast,
  Icon,
  Spinner,
  Tag,
} from '@chakra-ui/react';
import { EditIcon, CloseIcon } from '@chakra-ui/icons';
import { Box, Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './css/ClientInformationScreen.css';
import { getClientById, updateClient } from './redux/actions/clientAction';
import { getInvoiceByClient } from './redux/actions/invoiceAction';

const ClientInformation = () => {
  const { clientId } = useParams();
  const dispatch = useDispatch();
  const toast = useToast();
  const [isEditable, setIsEditable] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState();

  const { error } = useSelector((state) => state.updateClient);
  const getClient = useSelector((state) => state.getClient);
  const clientInvoices = useSelector((state) => state.clientInvoices);

  useEffect(() => {
    dispatch(getClientById(clientId));
    dispatch(getInvoiceByClient(clientId));
  }, [clientId]);

  useEffect(() => {
    if (error) {
      toast({
        title: 'Error',
        description: error,
        status: 'error',
      });
    }
  }, [error]);

  useEffect(() => {
    if (getClient) {
      setName(getClient?.data?.data.name);
      setEmail(getClient?.data?.data.email);
      setPhone(getClient?.data?.data.phone);
    }
  }, [getClient]);

  const onUpdateHandler = async () => {
    if (!name || !email || !phone) {
      toast({
        title: 'Error',
        description: 'Fields are required',
        status: 'error',
        isClosable: true,
        duration: 2000,
      });
      return;
    }
    if (clientId) {
      await dispatch(updateClient(name, phone, email, clientId));
      window.location.reload();
    }
  };

  return (
    <>
      {getClient?.data ? (
        <div className="app-clientInfo">
          <div className="app-invoiceView--sendTo--client">
            <div>
              <Heading size="md" color="white">
                {name}
              </Heading>
              <Text size="sm" color="white">
                {email}
              </Text>
              <Text size="sm" color="white">
                {phone}
              </Text>
            </div>
            <Avatar name={name} bg="white" color="black" />
          </div>
          <div className="app-clientInfo--inputs">
            <Stack className="app-clientInfo--stack" direction="row">
              <Input
                variant="outline"
                placeholder="Name"
                value={name}
                isReadOnly={isEditable ? false : true}
                onChange={(e) => setName(e.target.value)}
                isRequired={true}
              />
              {isEditable ? (
                <>
                  <IconButton
                    size="sm"
                    icon={<CloseIcon />}
                    onClick={() => setIsEditable(false)}
                  />
                </>
              ) : (
                <IconButton
                  size="sm"
                  icon={<EditIcon />}
                  onClick={() => setIsEditable(true)}
                />
              )}
            </Stack>
            <Stack className="app-clientInfo--stack" direction="row">
              <Input
                variant="outline"
                placeholder="Email ID"
                value={email}
                isReadOnly={isEditable ? false : true}
                onChange={(e) => setEmail(e.target.value)}
                isRequired={true}
              />
              {isEditable ? (
                <>
                  <IconButton
                    size="sm"
                    icon={<CloseIcon />}
                    onClick={() => setIsEditable(false)}
                  />
                </>
              ) : (
                <IconButton
                  size="sm"
                  icon={<EditIcon />}
                  onClick={() => setIsEditable(true)}
                />
              )}
            </Stack>

            <Stack className="app-clientInfo--stack" direction="row">
              <NumberInput
                inputMode="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                variant="outline"
                isReadOnly={isEditable ? false : true}
                value={phone}
                onChange={(phone) => setPhone(phone)}
                isRequired={true}
              >
                <NumberInputField placeholder="Phone No" />
              </NumberInput>

              {isEditable ? (
                <>
                  <IconButton
                    size="sm"
                    icon={<CloseIcon />}
                    onClick={() => setIsEditable(false)}
                  />
                </>
              ) : (
                <IconButton
                  size="sm"
                  icon={<EditIcon />}
                  onClick={() => setIsEditable(true)}
                />
              )}
            </Stack>

            <Button colorScheme="teal" mt={2} onClick={onUpdateHandler}>
              Update Profile{' '}
              <Icon ml={3} as={CgProfile} color="white" fontSize="1.5rem" />
            </Button>
          </div>
          <div className="app-clientInfo--recentInvoices">
            <Heading size="lg" mt={6}>
              Recent Invoices
            </Heading>
            {clientInvoices.loading ? (
              <Spinner />
            ) : (
              clientInvoices?.data?.data.map((inv) => (
                <>
                  <div className="app-clientInfo--recentInvoices--listItem">
                    <div className="app-clientInfo--recentInvoices--listItem--left">
                      <Avatar
                        name={name}
                        size="sm"
                        bg="teal"
                        color="white"
                        mr={3}
                      />
                      <div className="app-clientInfo--recentInvoices--listItem--info">
                        <Text fontSize="0.85rem">{name}</Text>
                        <Text fontSize="0.8rem">#{inv._id}</Text>
                      </div>
                    </div>

                    <div className="app-clientInfo--recentInvoices--listItem--right">
                      <div className="app-clientInfo--recentInvoices--listItem--rate">
                        <Text fontSize="1rem" textAlign="right">
                          {inv.invoiceList.reduce(
                            (total, i) => total + i.rate,
                            0
                          )}
                        </Text>
                        <Tag
                          size="sm"
                          colorScheme={inv.isPaymentDone ? 'green' : 'red'}
                        >
                          {inv.isPaymentDone ? 'PAID' : 'UNPAID'}
                        </Tag>
                      </div>
                    </div>
                  </div>
                </>
              ))
            )}
          </div>
        </div>
      ) : (
        <Box padding="6" boxShadow="lg" bg="white">
          <SkeletonCircle size="10" />
          <SkeletonText mt="4" noOfLines={4} spacing="4" />
        </Box>
      )}{' '}
    </>
  );
};

export default ClientInformation;
