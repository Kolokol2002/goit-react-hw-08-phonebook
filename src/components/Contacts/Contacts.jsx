import { getValueFilter } from 'redux/selectors.';
// import {
//   ContactsUserList,
//   ContactsUser,
//   ContactsUserName,
//   ContactsButtonDelite,
// } from './Contacts.styled';
import { useSelector } from 'react-redux';
import { useDeleteContactMutation } from 'redux/contactsSlice';
import { Button, Flex, Text } from '@chakra-ui/react';

const Contacts = ({ contacts }) => {
  const [deleteContact] = useDeleteContactMutation();

  const filter = useSelector(getValueFilter);

  const filterChange = () => {
    return contacts.filter(
      item =>
        item.name.toLowerCase().includes(filter.toLowerCase()) ||
        item.number.includes(filter)
    );
  };

  const onDelete = ({ target }) => {
    const { userId } = target.dataset;
    deleteContact(userId);
  };

  const filteredContacts = filter !== '' ? filterChange() : contacts;

  return (
    <Flex direction={'column'} gap={5} p={4} w={400}>
      {filteredContacts?.map(({ name, number, id }) => (
        <Flex
          paddingY={2}
          borderBottom={'1px'}
          justify={'space-between'}
          key={id}
        >
          <Flex marginRight={8} w={'100%'} justify={'space-between'}>
            <Text>{name}:</Text> <Text>{number}</Text>
          </Flex>

          <Button
            data-user-id={id}
            onClick={onDelete}
            size={'sm'}
            colorScheme="red"
          >
            Delete
          </Button>
        </Flex>
      ))}
    </Flex>
  );
};

export default Contacts;
