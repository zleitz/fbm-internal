import React from 'react';
import {
  GridItem,
  Box,
  Flex,
  Text,
  Stack,
  Avatar,
  Button,
} from '@chakra-ui/react';
import { Link } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';

const Nav = () => {
  const { user, logout } = useAuth();

  return (
    <GridItem colStart={1} colSpan={3} p={3}>
      <Flex>
        {user && (
          <>
            <Stack direction="column" justify="center" align="center">
              <Avatar name={user.displayName} src={user.photoURL} />
              <Text fontSize="md">{user.displayName}</Text>
              {/* <Box as="button" onClick={logout}>
                <Text fontSize="md">Logout</Text>
              </Box> */}
              <Button onClick={logout}>Logout</Button>
            </Stack>
          </>
        )}
        {!user && (
          <Link to="/login">
            <Text fontSize="md" mr={8}>
              FBM Internal Tooling
            </Text>
          </Link>
        )}
      </Flex>
    </GridItem>
  );
};

export default Nav;
