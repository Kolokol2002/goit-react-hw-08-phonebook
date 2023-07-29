import React from 'react';
import { Input, Button, FormControl, Text, Link, Flex } from '@chakra-ui/react';
import Title from 'components/Title/Title';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from 'redux/contactsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'redux/authSlice';
import { toast } from 'react-toastify';
import { getCurrentToken } from 'redux/selectors.';

const Login = () => {
  const isAuthorized = useSelector(getCurrentToken);

  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    // formState: { errors },
  } = useForm();

  const onSubmit = async data => {
    try {
      const user = await loginUser(data).unwrap();
      dispatch(setCredentials(user));
      reset();
      navigate('/');
    } catch (error) {
      console.log(error);

      toast.warn('Email or password is not correct!!!', {
        hideProgressBar: true,
        autoClose: 2000,
        theme: 'dark',
      });
    }
  };
  if (isAuthorized !== null) {
    return <Navigate to={'/'} />;
  }
  return (
    <Title title={'Log In'}>
      <FormControl
        as={'form'}
        onSubmit={handleSubmit(onSubmit)}
        display="flex"
        flexDirection={'column'}
      >
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          autoComplete="new-password"
          mb={3}
          {...register('email', { required: 'Required!!!' })}
        />
        <Input
          placeholder="**********"
          type="password"
          variant="filled"
          autoComplete="new-password"
          mb={6}
          {...register('password', { required: 'Required!!!' })}
        />
        <Button type="submit" colorScheme="teal" mb={8}>
          Log In
        </Button>
      </FormControl>
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
