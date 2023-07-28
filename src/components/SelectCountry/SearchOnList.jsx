import { useState } from 'react';
import {
  Box,
  Flex,
  Input,
  List,
  ListItem,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Flag from 'react-flagkit';

export const SearchOnList = ({ data, onChange }) => {
  const [filteredList, setFilteredList] = useState(data);
  const [selectedItem, setSelectedItem] = useState();

  const selectBackground = useColorModeValue('gray.100', 'gray.700');

  const handleSearch = event => {
    const value = event.target.value.toLowerCase();
    const result =
      data?.filter(item => {
        return item.name.toLowerCase().includes(value);
      }) || [];
    setFilteredList(result);
  };

  return (
    <Box
      my={'-6'}
      maxH="xs"
      bg={selectBackground}
      width="full"
      zIndex={999}
      height="auto"
      overflow="auto"
      borderRadius="lg"
      position="absolute"
      boxShadow="0px 1px 30px rgba(0, 0, 0, 0.1)"
    >
      <Box position="sticky" top="0" padding={4} bg={selectBackground}>
        <Input
          size="sm"
          mb={3}
          variant="filled"
          type="search"
          borderRadius="md"
          autoComplete="off"
          placeholder="Search country..."
          onChange={event => handleSearch(event)}
          _focusWithin={{ borderColor: 'secondary' }}
          _invalid={{ bg: 'gray.200', borderColor: 'gray.50' }}
        />
      </Box>

      <List>
        {filteredList?.map((item, index) => (
          <ListItem
            key={index}
            paddingY={2}
            color="#ACB9C4"
            cursor="pointer"
            fontWeight="500"
            textTransform="capitalize"
            onClick={() => {
              onChange(item);
              setSelectedItem(item);
            }}
            style={{ transition: 'all .125s ease' }}
            _hover={{ bg: 'gray.50', color: '#396070' }}
            sx={
              item?.flag === selectedItem?.flag
                ? { backgroundColor: 'gray.50', color: '#396070' }
                : {}
            }
          >
            <Flex px={5} gap={8}>
              <Flag country={item?.code} size={30} />
              <Text>{item?.name}</Text>
            </Flex>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
