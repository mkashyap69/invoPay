import { Alert, AlertIcon } from '@chakra-ui/alert';
import { Button } from '@chakra-ui/button';
import { Spinner } from '@chakra-ui/spinner';
import { useToast } from '@chakra-ui/toast';
import React from 'react';

const PaymentButton = ({ handleClick, disabled, clientId }) => {
  const toast = useToast();
  return (
    <>
      <Button
        colorScheme="teal"
        type="button"
        id="checkout-button"
        role="link"
        onClick={handleClick}
        isDisabled={disabled}
      >
        Pay
      </Button>
      <>
        {disabled ? (
          <>
            <Spinner
              thickness="4px"
              speed="0.65s"
              emptyColor="gray.200"
              color="blue.500"
              size="xl"
            />
            <Alert status="error" width="50%">
              <AlertIcon />
              Error Processing. Please contact your seller.
            </Alert>
          </>
        ) : (
          toast({
            title: 'Success',
            description: 'Payment button validated',
            status: 'success',
            isClosable: true,
            duration: 2000,
          })
        )}
      </>
    </>
  );
};

export default PaymentButton;
