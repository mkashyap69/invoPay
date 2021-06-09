import { Button } from '@chakra-ui/button';
import { Image } from '@chakra-ui/image';
import LoginModal from './LoginModal';
import logo from './images/logo5.png';
import './css/Header.css';
import { BiLogOut } from 'react-icons/bi';

import React, { useEffect, useState } from 'react';
import { useDisclosure } from '@chakra-ui/hooks';
import { useSelector } from 'react-redux';
import Icon from '@chakra-ui/icon';
import axios from 'axios';

const Header = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [disable, setDisable] = useState(false);
  const user = useSelector((state) => state.user?.data?.data);
  const userToken = useSelector((state) => state.user?.data);

  useEffect(() => {
    if (window.location.pathname.startsWith('/checkout')) {
      setDisable(true);
    }
  }, []);

  const logoutHandler = async () => {
    const config = {
      headers: {
        Authorization: `Bearer ${userToken.token}`,
      },
      withCredentials: true,
    };
    await axios.get('/api/v1/auth/logout', config);
    window.location.reload();
  };

  return (
    <>
      <div className="app-header">
        <Image src={logo} alt="logo" className="app-header--logo" />
        {user ? (
          <Button colorScheme="red" onClick={logoutHandler}>
            <Icon as={BiLogOut} />
          </Button>
        ) : (
          <Button colorScheme="teal" onClick={onOpen} isDisabled={disable}>
            Login
          </Button>
        )}
      </div>
      <LoginModal isOpen={isOpen} onClose={onClose} />
    </>
  );
};

export default Header;
