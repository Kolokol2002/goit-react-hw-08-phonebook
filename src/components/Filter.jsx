import { Box, Input } from '@chakra-ui/react';
import { useDispatch, useSelector } from 'react-redux';
import { setValueFilter } from 'redux/filterSlice';
import { getIsLogin } from 'redux/selectors.';

const Filter = ({ contacts }) => {
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
        disabled={contacts?.length === 0 || !isLogin}
        mb={6}
        onChange={handleFilter}
      />
    </Box>
  );
};

export default Filter;
