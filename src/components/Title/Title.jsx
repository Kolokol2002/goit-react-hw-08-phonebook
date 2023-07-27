import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import { Container, MainTitle } from './Title.styled';
import PropTypes from 'prop-types';

const Title = ({ title, children }) => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex my={5} alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={12}
        borderRadius={8}
        boxShadow="lg"
      >
        <Heading mb={6}>{title}</Heading>
        {children}
      </Flex>
    </Flex>
  );
};

Title.propType = {
  title: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default Title;
