import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';

const Index = ({ children }) => {
  return (
    <>
      <Header />
      <Container className='mt-4'>{children}</Container>
    </>
  );
};

export default Index;