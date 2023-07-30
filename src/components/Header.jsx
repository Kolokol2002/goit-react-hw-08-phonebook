import {
  Button,
  Flex,
  Icon,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { LogoIcon } from 'data/icons';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, Outlet } from 'react-router-dom';
import { setLogOut } from 'redux/authSlice';
import { contactsApi, useLogoutUserMutation } from 'redux/contactsApi';
import { getCurrentUserEmail, getIsLogin } from 'redux/selectors.';

export const Header = () => {
  const isLogin = useSelector(getIsLogin);
  const email = useSelector(getCurrentUserEmail);
  const { toggleColorMode } = useColorMode();
  const [logoutUser] = useLogoutUserMutation();
  const dispath = useDispatch();
  const headerBackground = useColorModeValue('gray.100', 'gray.700');
  const logoColor = useColorModeValue('blackAlpha.900', 'whiteAlpha.700');

  const onLogOut = async () => {
    await logoutUser();
    dispath(setLogOut());
    dispath(contactsApi.util.resetApiState());
  };

  return (
    <>
      <Flex
        w={'60%'}
        justify={'space-between'}
        align={'center'}
        borderRadius={10}
        px={5}
        py={5}
        bg={headerBackground}
        mx={'auto'}
      >
        <Link as={NavLink} to={'/'}>
          <Icon as={LogoIcon} color={logoColor} boxSize={10} />
        </Link>
        <Flex align={'center'} gap={5}>
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
                <Button size={'sm'}>Login</Button>
              </Link>
            </>
          )}
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
};
