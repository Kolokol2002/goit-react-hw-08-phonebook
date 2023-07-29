import { Flex, Heading, useColorModeValue } from '@chakra-ui/react';
import PropTypes from 'prop-types';

const Title = ({ title, children }) => {
  const formBackground = useColorModeValue('gray.100', 'gray.700');

  return (
    <Flex mt={8} alignItems="center" justifyContent="center">
      <Flex
        flexDirection="column"
        bg={formBackground}
        p={10}
        borderRadius={8}
        boxShadow="lg"
        minWidth={400}
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
