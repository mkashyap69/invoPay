import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Input } from '@chakra-ui/input';
import { Divider, Heading, Text } from '@chakra-ui/layout';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router';
import { addInvoice } from './redux/actions/invoiceAction';
import './css/GenerateInvoice.css';
import { useToast } from '@chakra-ui/toast';
import { getClientById } from './redux/actions/clientAction';

const GenerateInvoice = () => {
  const [inputList, setInputList] = useState([{ item: '', rate: 0 }]);
  const { clientId } = useParams();
  const [clickedClient, setClickedClient] = useState();
  const history = useHistory();
  const dispatch = useDispatch();
  const toast = useToast();

  const getClient = useSelector((state) => state.getClient);

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

  function handleInputChange(e, index) {
    const { name, value } = e.target;
    const list = [...inputList];
    list[index][name] = value;
    setInputList(list);
  }

  const handleRemove = (index) => {
    const list = [...inputList];
    list.splice(index, 1);
    setInputList(list);
  };

  const handleAdd = () => {
    setInputList([...inputList, { item: '', rate: 0 }]);
  };

  const generateInvoice = async () => {
    if (inputList[0].item !== '' && inputList[0].rate !== 0) {
      await dispatch(addInvoice(inputList, clickedClient._id));
      history.push(`/invoice/${clientId}`);
    } else {
      toast({
        title: `Add at least one item`,
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <div className="app-generateInvoice">
      <Heading size="md" mt={6} ml={4}>
        Generate Invoice
      </Heading>
      <Text size="xs" color="gray.500" mt={6} ml={4}>
        Client
      </Text>
      <div className="app-generateInvoice--client">
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
      <div className="app-generateInvoice--form">
        <div className="app-generateInvoice--formText">
          <Text fontSize="lg">Item</Text>
          <Text fontSize="lg" mr={100}>
            Rate
          </Text>
        </div>
        {inputList.map((i, index) => {
          return (
            <div
              className="app-generateInvoice--formInput"
              key={`${i}-${index}`}
            >
              <Input
                width="25%"
                ml={2}
                variant="flushed"
                type="text"
                value={i.item}
                placeholder="Enter Item"
                name="item"
                onChange={(e) => handleInputChange(e, index)}
              />

              <Input
                width="25%"
                ml={2}
                variant="flushed"
                step="0.0001"
                value={i.rate}
                placeholder="Enter Rate (₹)"
                name="rate"
                onChange={(e) => handleInputChange(e, index)}
              />

              <div className="app-generateInvoice--button">
                {inputList.length !== 1 && (
                  <Button colorScheme="red" onClick={() => handleRemove(index)}>
                    −
                  </Button>
                )}
                {inputList.length - 1 === index && (
                  <Button ml={1} colorScheme="teal" onClick={handleAdd}>
                    +
                  </Button>
                )}
              </div>
            </div>
          );
        })}
        <Divider />
        <div className="app-generateInvoice--total">
          <Text color="gray.500">Total:</Text>
          <Heading size="md">
            ₹{inputList.reduce((total, i) => total + parseFloat(i.rate), 0)}
          </Heading>
        </div>
        <div className="app-generateInvoice--submit">
          <Button
            width="60%"
            colorScheme="cyan"
            mt={6}
            onClick={generateInvoice}
          >
            Generate Invoice
          </Button>
        </div>
      </div>
    </div>
  );
};

export default GenerateInvoice;
