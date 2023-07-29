import {
  Button,
  Flex,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { setLogOut } from 'redux/authSlice';
import { useGetContactsQuery, useLogoutUserMutation } from 'redux/contactsApi';
import { getCurrentUserEmail, getIsLogin } from 'redux/selectors.';

export const Header = () => {
  const isLogin = useSelector(getIsLogin);
  const email = useSelector(getCurrentUserEmail);
  const { refetch } = useGetContactsQuery(1);
  const { toggleColorMode } = useColorMode();
  const [logoutUser] = useLogoutUserMutation();
  const dispath = useDispatch();
  const headerBackground = useColorModeValue('gray.100', 'gray.700');

  const onLogOut = async () => {
    await logoutUser();
    dispath(setLogOut());
    refetch();
  };

  return (
    <>
      <Flex
        w={'60%'}
        justify={'space-between'}
        borderRadius={10}
        px={5}
        py={5}
        bg={headerBackground}
        mx={'auto'}
      >
        <Link as={NavLink} to={'/'}>
          PhoneBook
        </Link>
        <Flex gap={5}>
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
          {isLogin ? (
            <>
              <Text>{email}</Text>

              <Button onClick={onLogOut} size={'sm'}>
                LogOut
              </Button>
            </>
          ) : (
            <>
              <Link as={NavLink} to={'login'}>
                Login
              </Link>
            </>
          )}
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
};
