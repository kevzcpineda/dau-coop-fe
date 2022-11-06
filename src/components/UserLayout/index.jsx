import React from 'react';
import { Container } from '@chakra-ui/react'
import Header from './Header';

const Index = ({ children, showHeader, props }) => {
  return (
    <>
      {showHeader && (
        <Header />
      )}
      <Container maxW='container.xl' {...props}>
        {children}
      </Container>
    </>
  );
};

export default Index;