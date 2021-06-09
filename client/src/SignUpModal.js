/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react';
import {
  InputGroup,
  InputRightElement,
  Input,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  useToast,
} from '@chakra-ui/react';
import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/modal';
import { Button } from '@chakra-ui/button';

import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signup } from './redux/actions/userActions';

const SignUpModal = ({ isOpen, onClose }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState();
  const toast = useToast();

  const error = useSelector((state) => state.user?.error);
  const data = useSelector((state) => state.user?.data);

  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const history = useHistory();

  useEffect(() => {
    if (data?.status === 'Success') {
      onClose();
    }
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
  }, [error]);

  const [show, setShow] = React.useState(false);
  const handleClick = () => setShow(!show);

  const onSubmit = () => {
    dispatch(signup({ name, email, password, phone }));
  };
  return (
    <div>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl isRequired>
              <FormLabel>Name</FormLabel>
              <Input
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter Your Name"
              />
            </FormControl>

            <FormControl mt={4} isRequired>
              <FormLabel>Email Address</FormLabel>
              <Input
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email Address"
              />
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Phone Number</FormLabel>
              <NumberInput
                inputMode="tel"
                pattern="[0-9]{3}-[0-9]{2}-[0-9]{3}"
                variant="outline"
                value={phone}
                onChange={(phone) => setPhone(phone)}
              >
                <NumberInputField placeholder="Phone No" />
              </NumberInput>
            </FormControl>
            <FormControl mt={4} isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup size="md">
                <Input
                  pr="4.5rem"
                  type={show ? 'text' : 'password'}
                  placeholder="Enter password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                <InputRightElement width="4.5rem">
                  <Button h="1.75rem" size="sm" onClick={handleClick}>
                    {show ? 'Hide' : 'Show'}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button
              loadingText="Submitting"
              onClick={onSubmit}
              colorScheme="blue"
              mr={3}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </div>
  );
};

export default SignUpModal;

/* if (data?.status === 'Success') {
      toast({
        title: 'Signup Success.',
        description: 'You will be redirected to the main page',
        status: 'success',
        duration: 2000,
        isClosable: true,
      });
    }*/
