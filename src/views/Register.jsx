import React from 'react';
import { Input, Button, FormControl, Flex, Text, Link } from '@chakra-ui/react';
import Title from 'components/Title/Title';
import { NavLink, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from 'redux/contactsApi';
import { useDispatch } from 'react-redux';
import { setCredentials } from 'redux/authSlice';

const Register = () => {
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    // console.log({ name, email, password });
    const user = await registerUser(data).unwrap();
    console.log(user);
    dispatch(setCredentials(user));
    reset();
    navigate('/');
  };

  return (
    <Title title={'Register'}>
      <FormControl
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection={'column'}
      >
        <Input
          placeholder="Name"
          type="name"
          variant="filled"
          mb={3}
          {...register('name', { required: 'Required!!!' })}
        />
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          mb={3}
          {...register('email', { required: 'Required!!!' })}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="filled"
          mb={6}
          {...register('password', { required: 'Required!!!' })}
        />
        <Button type="submit" colorScheme="teal" mb={8}>
          Register
        </Button>
      </FormControl>
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
