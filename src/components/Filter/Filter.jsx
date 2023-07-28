import { Box, Input } from '@chakra-ui/react';
// import { ContainerFilter, TitleFilter, InputFilter } from './Filter.styled';
import { useDispatch } from 'react-redux';
import { setValueFilter } from 'redux/filterSlice';

const Filter = ({ contacts }) => {
  const dispatch = useDispatch();

  const handleFilter = ({ target: { value } }) => {
    dispatch(setValueFilter(value));
  };

  return (
    <Box>
      <Input
        placeholder="Find number"
        type="text"
        variant="filled"
        disabled={contacts?.length === 0}
        mb={6}
        onChange={handleFilter}
      />
    </Box>
  );
};

export default Filter;
