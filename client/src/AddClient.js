import React, { useEffect, useState } from 'react';
import {
  Avatar,
  Button,
  Heading,
  Input,
  NumberInput,
  NumberInputField,
  Text,
  useToast,
} from '@chakra-ui/react';
import './css/AddClient.css';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router';
import { addClient } from './redux/actions/clientAction';
import { footerStateUpdate } from './redux/actions/footerStateAction';
import { AddIcon } from '@chakra-ui/icons';
import addClientSvg from './images/addClinet.svg';

const AddClient = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState();
  const toast = useToast();

  const dispatch = useDispatch();
  const history = useHistory();

  const { error, data, loading } = useSelector((state) => state.addClient);

  useEffect(() => {
    if (data?.status === 'Success') {
      toast({
        title: `Client Added`,
        status: 'success',
        isClosable: true,
      });

      dispatch(footerStateUpdate('home'));
      history.push('/home');
      dispatch({ type: 'ADD_CLIENT_RESET' });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  useEffect(() => {
    if (error) {
      if (error.indexOf('E11000') > -1) {
        toast({
          title: `This userId is already taken`,
          status: 'error',
          isClosable: true,
        });
      } else {
        toast({
          title: `${error}`,
          status: 'warning',
          isClosable: true,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  const addClientHandler = async () => {
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
    await dispatch(addClient(name, email, phone));
  };
  return (
    <div className="app-addClient">
      <Heading textAlign="start" width="100%" size="lg" ml={4}>
        Client Information
      </Heading>
      {name || email || phone ? (
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
      ) : (
        <object type="image/svg+xml" data={addClientSvg}>
          svg-animation
        </object>
      )}
      <div className="app-addClient--input">
        <Text mb="8px">Enter Name</Text>
        <Input
          variant="flushed"
          type="text"
          isRequired
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div className="app-addClient--input">
        <Text mb="8px">Enter Phone Number</Text>
        <NumberInput
          variant="flushed"
          type="tel"
          isRequired
          onChange={(value) => setPhone(value)}
        >
          <NumberInputField />
        </NumberInput>
      </div>
      <div className="app-addClient--input">
        <Text mb="8px">Enter Email ID</Text>

        <Input
          variant="flushed"
          type="email"
          isRequired
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="app-addClient--button">
        <Button
          colorScheme="teal"
          onClick={addClientHandler}
          isLoading={loading}
          loadingText="Adding"
        >
          Add Client <AddIcon ml={3} mb={1} />
        </Button>
      </div>
    </div>
  );
};

export default AddClient;
