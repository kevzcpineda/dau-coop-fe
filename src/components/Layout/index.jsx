import React from 'react';
import Container from 'react-bootstrap/Container';
import Header from './Header';

const Index = ({ children, className }) => {
  return (
    <>
      <Header />
      <Container className={className}>
        {children}
      </Container>
    </>
  );
};

export default Index;