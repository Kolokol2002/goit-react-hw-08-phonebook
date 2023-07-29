import { getIsLogin, getValueFilter } from 'redux/selectors.';
import { useSelector } from 'react-redux';
import {
  useDeleteContactMutation,
  useEditContactMutation,
} from 'redux/contactsApi';
import {
  Flex,
  FormControl,
  Heading,
  IconButton,
  Input,
} from '@chakra-ui/react';
import { CheckIcon, DeleteIcon, EditIcon } from '@chakra-ui/icons';
import { useRef, useState } from 'react';

const Contacts = ({ contacts }) => {
  const [deleteContact] = useDeleteContactMutation();
  const [editContact] = useEditContactMutation();
  const isLogin = useSelector(getIsLogin);
  const [currentItemId, setCurrentItemId] = useState(null);

  const refFormContact = useRef([]);

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
  const onEdit = () => {
    const test = [...refFormContact.current].filter(
      tar => tar?.dataset.userId === currentItemId
    )[0];
    const {
      name: { value: name },
      number: { value: number },
    } = test.elements;
    const data = { name, number };
    console.log(currentItemId, { name, number });
    editContact({ currentItemId, ...data });
    setCurrentItemId(null);
  };

  const onClickEdit = id => {
    setCurrentItemId(id);
  };

  const filteredContacts = filter !== '' ? filterChange() : contacts;

  return (
    <Flex direction={'column'} gap={5} p={4} w={500}>
      {contacts?.length === 0 && <Heading>Contacts is empty😞</Heading>}
      {!isLogin ? (
        <Heading size={'lg'}>You don't authorized😞</Heading>
      ) : (
        filteredContacts?.map(({ name, number, id }, index) => (
          <Flex
            paddingY={2}
            borderBottom={'1px'}
            justify={'space-between'}
            key={id}
          >
            <FormControl
              as={'form'}
              preventdefalut={'true'}
              data-user-id={id}
              ref={element => refFormContact.current.push(element)}
              display={'flex'}
              w={'100%'}
              justifyContent={'space-between'}
            >
              <Input
                name="name"
                disabled={currentItemId !== id}
                _disabled={{ colorScheme: 'black' }}
                variant="filled"
                defaultValue={name}
              />
              <Input
                name="number"
                disabled={currentItemId !== id}
                _disabled={{ colorScheme: 'black' }}
                defaultValue={number}
                variant="filled"
                maxW={180}
              />
              <Flex gap={2} align={'center'}>
                {currentItemId === id ? (
                  <IconButton
                    icon={<CheckIcon />}
                    onClick={onEdit}
                    size={'xs'}
                    colorScheme="green"
                  />
                ) : (
                  <IconButton
                    icon={<EditIcon />}
                    onClick={() => onClickEdit(id)}
                    size={'xs'}
                    colorScheme="teal"
                  />
                )}

                <IconButton
                  data-user-id={id}
                  icon={<DeleteIcon />}
                  onClick={onDelete}
                  size={'xs'}
                  colorScheme="red"
                />
              </Flex>
            </FormControl>
          </Flex>
        ))
      )}
    </Flex>
  );
};

export default Contacts;
