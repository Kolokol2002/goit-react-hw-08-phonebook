import React, { useState } from 'react';
import {
  Input,
  Button,
  FormControl,
  Text,
  Link,
  Flex,
  InputGroup,
  InputRightElement,
  useColorModeValue,
} from '@chakra-ui/react';
import Title from 'components/Title';
import { NavLink, Navigate, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useLoginUserMutation } from 'redux/contactsApi';
import { useDispatch, useSelector } from 'react-redux';
import { setCredentials } from 'redux/authSlice';
import { toast } from 'react-toastify';
import { getIsLogin } from 'redux/selectors.';

const Login = () => {
  const inputBackground = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
  const isLogin = useSelector(getIsLogin);
  const [showPassword, setShowPassword] = useState(false);

  const [loginUser] = useLoginUserMutation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async data => {
    try {
      const user = await loginUser(data).unwrap();
      dispatch(setCredentials(user));
      reset();
      navigate('/');
    } catch (error) {
      toast.warn('Email or password is not correct!!!', {
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
            autoComplete="password"
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
