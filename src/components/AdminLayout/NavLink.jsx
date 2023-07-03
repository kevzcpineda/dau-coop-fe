import { Link, useLocation } from "react-router-dom";
import {
    HStack,
    Icon,
    useColorModeValue as mode,
    Text,
    Box,
  } from "@chakra-ui/react";

export const NavLink = (props) => {
    const { icon, label, href } = props;
    const location = useLocation();

    return (
      <Link to={href}>
        <Box
          display="block"
          py="2"
          px="3"
          borderRadius="md"
          transition="all 0.3s"
          fontWeight="medium"
          fontSize="sm"
          cursor="pointer"
          userSelect="none"
          aria-current={location.pathname == href ? "page" : undefined}
          color={mode("gray.700", "gray.400")}
          _hover={{
            bg: mode("gray.100", "gray.700"),
            color: mode("gray.900", "white"),
          }}
          _activeLink={{
            bg: mode("gray.200", "gray.700"),
            color: "inherit",
          }}
        >
          <HStack spacing="4">
            <Icon as={icon} fontSize="lg" opacity={0.64} />
            <Text as="span">{label}</Text>
          </HStack>
        </Box>
      </Link>
    );
  };