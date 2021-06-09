import React, { useEffect } from 'react';
import { Button, Spinner, Tag, Text } from '@chakra-ui/react';
import './css/Home.css';
import AppHomeClients from './AppHomeClinents';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getAllClients } from './redux/actions/clientAction';
import { footerStateUpdate } from './redux/actions/footerStateAction';
import { AddIcon } from '@chakra-ui/icons';
import noClient from './images/People search-rafiki.svg';

const Home = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const { loading, data } = useSelector((state) => state.allClients);

  useEffect(() => {
    dispatch(getAllClients());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div className="app-home">
      <div className="app-home--button">
        <Button
          colorScheme="teal"
          onClick={() => {
            dispatch(footerStateUpdate('add'));
            history.push('/addClient');
          }}
        >
          <AddIcon mr={2} />
          Add Client
        </Button>
      </div>
      <div className="app-home--clientsTag">
        <Tag size="lg" variant="solid" colorScheme="white" color="white">
          Your Clients
        </Tag>
      </div>
      <div className="app-home-clients">
        {loading ? (
          <Spinner />
        ) : data?.data.length !== 0 ? (
          data?.data.map((d) => (
            <AppHomeClients name={d.name} client={d} key={Math.random()} />
          ))
        ) : (
          <div>
            <object
              type="image/svg+xml"
              data={noClient}
              className="app-invoiceHistory--noClientImage"
            >
              svg-animation
            </object>

            <div className="app-invoiceHistory--noClient">
              <Text fontSize="lg" color="red">
                Seems like you don't have anyone here.
              </Text>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
