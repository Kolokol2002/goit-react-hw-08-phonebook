import React from 'react';
import { Input, Button, FormControl, Text, Link, Flex } from '@chakra-ui/react';
import Title from 'components/Title/Title';
import { NavLink } from 'react-router-dom';

const Login = () => {
  return (
    <Title title={'Log In'}>
      <form>
        <FormControl display="flex" flexDirection={'column'}>
          <Input
            placeholder="johndoe@gmail.com"
            type="email"
            variant="filled"
            mb={3}
          />
          <Input
            placeholder="**********"
            type="password"
            variant="filled"
            mb={6}
          />
          <Button colorScheme="teal" mb={8}>
            Log In
          </Button>
        </FormControl>
      </form>
      <Flex w={'100%'} justify={'center'} gap={1}>
        <Text>Don't have account?</Text>
        <Link color="teal" as={NavLink} to={'/register'}>
          Register
        </Link>
      </Flex>
    </Title>
  );
};

export default Login;
