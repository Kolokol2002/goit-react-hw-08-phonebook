import React from 'react';
import { Input, Button, FormControl, Flex, Text, Link } from '@chakra-ui/react';
import Title from 'components/Title/Title';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from 'redux/contactsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'redux/authSlice';
import { toast } from 'react-toastify';
import { getCurrentToken } from 'redux/selectors.';

const Register = () => {
  const isAuthorized = useSelector(getCurrentToken);
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
    console.log(data);
    // console.log(error);
    try {
      const user = await registerUser(data).unwrap();
      dispatch(setCredentials(user));
      reset();
      navigate('/');
    } catch (error) {
      console.log(error);
      const errorMessage =
        error.data.code === 11000
          ? `This email already exist!!!`
          : 'Email is invalid!!!';

      toast.warn(errorMessage, {
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
          autoComplete="name"
          mb={3}
          {...register('name', { required: 'Required!!!' })}
        />
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          autoComplete="email"
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
