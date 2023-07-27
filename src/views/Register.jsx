import React from 'react';
import { Input, Button, FormControl, Flex, Text, Link } from '@chakra-ui/react';
import Title from 'components/Title/Title';
import { NavLink } from 'react-router-dom';

const Register = () => {
  return (
    <Title title={'Register'}>
      <form>
        <FormControl display="flex" flexDirection={'column'}>
          <Input placeholder="Name" type="name" variant="filled" mb={3} />
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
            Register
          </Button>
        </FormControl>
      </form>
      <Flex w={'100%'} justify={'center'} gap={1}>
        <Text>Alredy have account?</Text>
        <Link color="teal" as={NavLink} to={'/login'}>
          Log In
        </Link>
      </Flex>
    </Title>
  );
};

export default Register;
