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
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { setCredentials } from 'redux/authSlice';
import { useLogoutUserMutation } from 'redux/contactsApi';
import { getCurrentUserEmail } from 'redux/selectors.';

export const Header = () => {
  const email = useSelector(getCurrentUserEmail);
  const { toggleColorMode } = useColorMode();
  const [logoutUser] = useLogoutUserMutation();
  const navigate = useNavigate();
  const dispath = useDispatch();
  const headerBackground = useColorModeValue('gray.100', 'gray.700');

  const onLogOut = async () => {
    await logoutUser();
    dispath(setCredentials({ user: null, token: null }));
    navigate(0);
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
          {email !== null ? (
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
