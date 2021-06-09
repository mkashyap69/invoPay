import React from 'react';
import { Icon } from '@chakra-ui/react';
import { AiFillHome } from 'react-icons/ai';
import { AiOutlineUser } from 'react-icons/ai';
import { AiOutlineUserAdd } from 'react-icons/ai';
import { AiOutlineHistory } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import './css/Footer.css';
import { footerStateUpdate } from './redux/actions/footerStateAction';
import { useHistory } from 'react-router-dom';

const Footer = () => {
  const dispatch = useDispatch();
  const footerState = useSelector((state) => state.footerState?.data);
  const history = useHistory();

  const onClickHomeHandler = () => {
    dispatch(footerStateUpdate('home'));
    history.push('/home');
  };

  const onClickAddHandler = () => {
    dispatch(footerStateUpdate('add'));
    history.push('/addClient');
  };

  const onClickHisHandler = () => {
    dispatch(footerStateUpdate('history'));
    history.push('/history');
  };

  const onClickProfHandler = () => {
    dispatch(footerStateUpdate('prof'));
    history.push('/profile');
  };

  return (
    <div className="app-footer">
      <Icon
        as={AiFillHome}
        color={`${footerState === 'home' ? 'orange' : 'white'}`}
        boxSize={8}
        className="app-footer--icon"
        onClick={onClickHomeHandler}
      />
      <Icon
        as={AiOutlineUserAdd}
        color={`${footerState === 'add' ? 'orange' : 'white'}`}
        boxSize={8}
        className="app-footer--icon"
        onClick={onClickAddHandler}
      />
      <Icon
        as={AiOutlineHistory}
        color={`${footerState === 'history' ? 'orange' : 'white'}`}
        boxSize={8}
        className="app-footer--icon"
        onClick={onClickHisHandler}
      />
      <Icon
        as={AiOutlineUser}
        color={`${footerState === 'prof' ? 'orange' : 'white'}`}
        boxSize={8}
        className="app-footer--icon"
        onClick={onClickProfHandler}
      />
    </div>
  );
};

export default Footer;
