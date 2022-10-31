import React from 'react';
import { Flex } from "@chakra-ui/react";
import { MobileTopBar } from "./MobileTopBar";
import { Sidebar } from "./Sidebar";

const Index = ({ children }) => {
  return (
    <Flex h="100vh" flexDirection="column">
      <MobileTopBar />
      <Flex flex="1" overflow="hidden">
        <Sidebar display={{ base: "none", md: "flex" }} />
        <Flex
          display={{ base: "block", lg: "block" }}
          width="full"
          direction="column"
          overflowY="auto"
          borderRightWidth="1px"
          p="6"
        >
          {children}
        </Flex>
      </Flex>
    </Flex>
  );
};

export default Index;