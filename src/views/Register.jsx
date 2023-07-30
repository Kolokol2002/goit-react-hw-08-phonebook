import React, { useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  Flex,
  Text,
  Link,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import Title from 'components/Title';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useRegisterUserMutation } from 'redux/contactsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'redux/authSlice';
import { toast } from 'react-toastify';
import { getIsLogin } from 'redux/selectors.';

const Register = () => {
  const inputBackground = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
  const isLogin = useSelector(getIsLogin);
  const [showPassword, setShowPassword] = useState(false);
  const [registerUser] = useRegisterUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async data => {
    try {
      const user = await registerUser(data).unwrap();
      dispatch(setCredentials(user));
      reset();
      navigate('/');
    } catch (error) {
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

  if (isLogin) {
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
          _focusWithin={{ backgroundColor: { inputBackground } }}
          backgroundColor={inputBackground}
          autoComplete="name"
          mb={3}
          {...register('name', { required: 'Required!!!' })}
        />
        <Input
          placeholder="johndoe@gmail.com"
          type="email"
          variant="filled"
          _focusWithin={{ backgroundColor: { inputBackground } }}
          backgroundColor={inputBackground}
          autoComplete="email"
          mb={3}
          {...register('email', { required: 'Required!!!' })}
        />
        <InputGroup>
          <Input
            placeholder="**********"
            type={showPassword ? 'text' : 'password'}
            variant="filled"
            _focusWithin={{ backgroundColor: { inputBackground } }}
            backgroundColor={inputBackground}
            autoComplete="new-password"
            mb={6}
            {...register('password', { required: 'Required!!!' })}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.75rem"
              w={50}
              size="sm"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? 'Hide' : 'Show'}
            </Button>
          </InputRightElement>
        </InputGroup>
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
