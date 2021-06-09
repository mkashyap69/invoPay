import React from 'react';
import { Button, Heading, useDisclosure } from '@chakra-ui/react';
import vector from './images/Invoice-amico.svg';
import SignUpModal from './SignUpModal';

const Homepage = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <div className="app-homepage">
        <Heading size="3xl" className="app-homepage-h1">
          Create
        </Heading>
        <Heading size="3xl" className="app-homepage-h2">
          Remind
        </Heading>
        <Heading size="3xl" className="app-homepage-h3">
          Pay
        </Heading>
        <object type="image/svg+xml" data={vector}>
          svg-animation
        </object>
        <div className="app-homepage-button">
          <Button colorScheme="orange" onClick={onOpen} isDisabled>
            Register
          </Button>
        </div>
      </div>
      <SignUpModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Homepage;
