import React from 'react';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';

import ErrorBoundary from '../../components/error-boundary';
import {RootState} from '../../redux/reducers';

type Props = {
  children?: React.ReactNode;
};

const Home: React.FC = (props: Props) => {
  const username = useSelector((state: RootState) => state.account.username);
  return (
    <>
      <h1>Home</h1>
      <h3>username: {username}</h3>
      <Link to="/1"> 1 </Link>
      <Link to="/2"> 2 </Link>
      {props.children}
    </>
  );
};

const SubHome1: React.FC = () => {
  return (
    <ErrorBoundary>
      <h2>SubHome1</h2>
      <SubHomeError />
    </ErrorBoundary>
  );
};

const SubHome2: React.FC = () => {
  return (
    <>
      <h2>SubHome2</h2>
      {/* <SubHomeError /> */}
    </>
  );
};

const SubHomeError: React.FC = () => {
  throw new Error();
  return null;
};

export {Home, SubHome1, SubHome2};
