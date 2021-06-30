import React from 'react';
import {
  Heading,
  GridItem,
  Text,
  Avatar,
  Wrap,
  WrapItem,
} from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <GridItem
      colStart={[1, null, null, 2, null, null]}
      colSpan={[3, null, null, 1, null, null]}
      p={6}
    >
      <Heading as="h1" mb={6}>
        Dashboard
      </Heading>
      <Text fontSize="lg">Welcome, {user.email}!</Text>
      <Wrap>
        <WrapItem>
          <Avatar name={user.displayName} src={user.photoURL} />
        </WrapItem>
      </Wrap>
    </GridItem>
  );
};

export default Dashboard;
