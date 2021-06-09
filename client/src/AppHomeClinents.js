import { Avatar } from '@chakra-ui/avatar';
import { Button } from '@chakra-ui/button';
import { Box, Icon } from '@chakra-ui/react';
import React from 'react';
import './css/AppHomeClients.css';
import { useHistory } from 'react-router-dom';
import { CgProfile } from 'react-icons/cg';

const AppHomeClients = ({ name, client }) => {
  const history = useHistory();
  return (
    <Box
      flex="1"
      textAlign="left"
      display="flex"
      alignItems="center"
      justifyContent="space-around"
    >
      <Avatar name={client.name} bg="teal" color="white" />
      <span>{client.name}</span>
      <Button onClick={() => history.push(`/generateInvoice/${client._id}`)}>
        📄 + 🔔
      </Button>
      <Button onClick={() => history.push(`/client/${client._id}`)}>
        <Icon as={CgProfile} color="teal" />
      </Button>
    </Box>
  );
};

export default AppHomeClients;
