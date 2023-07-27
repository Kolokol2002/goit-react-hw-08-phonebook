import {
  Flex,
  Link,
  Switch,
  Text,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import { NavLink, Outlet } from 'react-router-dom';

export const Header = () => {
  const { toggleColorMode } = useColorMode();
  const headerBackground = useColorModeValue('gray.100', 'gray.700');
  return (
    <>
      <Flex
        w={'60%'}
        justify={'space-between'}
        // borderBottom={'1px'}
        // borderX={'1px'}
        borderRadius={10}
        px={5}
        py={5}
        bg={headerBackground}
        mx={'auto'}
      >
        {/* <Text>PhoneBook</Text> */}
        <Link as={NavLink} to={'/'}>
          PhoneBook
        </Link>
        <Flex gap={5}>
          {/* <Link as={NavLink} to={'register'}>
            Register
          </Link> */}
          <Switch
            id="dark_mode"
            colorScheme="teal"
            size="lg"
            onChange={toggleColorMode}
          />
          <Text>maks.karalash@gmail.com</Text>
          <Text></Text>
          <Link as={NavLink} to={'login'}>
            Login
          </Link>
          {/* <Button size={'sm'}>LogOut</Button> */}
        </Flex>
      </Flex>
      <Outlet />
    </>
  );
};
