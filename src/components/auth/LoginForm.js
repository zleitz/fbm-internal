import React from 'react';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import {
  Heading,
  GridItem,
  Alert,
  AlertIcon,
  FormLabel,
  FormControl,
  Input,
  Button,
} from '@chakra-ui/react';

import { useAuth } from '../../hooks/useAuth';

const LoginForm = () => {
  const { handleSubmit, register, errors, setError, formState } = useForm();

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
        Login with Google
      </Button>
    </GridItem>
  );
};

export default LoginForm;
