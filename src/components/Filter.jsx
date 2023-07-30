import { Box, Input, useColorModeValue } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setValueFilter } from 'redux/filterSlice';
import { getIsLogin } from 'redux/selectors.';

const Filter = ({ contacts }) => {
  const inputBackground = useColorModeValue('blackAlpha.50', 'whiteAlpha.50');
  const dispatch = useDispatch();
  const isLogin = useSelector(getIsLogin);

  const handleFilter = ({ target: { value } }) => {
    dispatch(setValueFilter(value));
  };

  return (
    <Box>
      <Input
        placeholder="Find number"
        type="text"
        variant="filled"
        backgroundColor={inputBackground}
        disabled={contacts?.length === 0 || !isLogin}
        mb={6}
        onChange={handleFilter}
      />
    </Box>
  );
};

export default Filter;
