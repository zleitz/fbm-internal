import React from 'react';
import { useHistory } from 'react-router-dom';
import { Heading, GridItem, Button } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';

import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const history = useHistory();
  const { sendSignInPopup } = useAuth();

  const onClick = async () => {
    try {
      await sendSignInPopup();
      history.push('/');
    } catch (error) {}
  };

  return (
    <GridItem
      colStart={[1, null, null, 2, null, null]}
      colSpan={[3, null, null, 1, null, null]}
      p={6}
    >
      <Heading as="h1" mb={6}>
        Login to FBM Internal
      </Heading>
      <Button onClick={onClick} mt={4} colorScheme="teal">
        <FontAwesomeIcon pull="left" icon={faGoogle} />
        Login with Google
      </Button>
    </GridItem>
  );
};

export default LoginForm;
