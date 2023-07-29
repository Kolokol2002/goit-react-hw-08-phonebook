import { Flex } from '@chakra-ui/react';
import Contacts from 'components/Contacts';
import Filter from 'components/Filter';
import Form from 'components/Form';
import Title from 'components/Title';
import { useSelector } from 'react-redux';
import { useGetContactsQuery } from 'redux/contactsApi';
import { getIsLogin } from 'redux/selectors.';

export const Home = () => {
  const { data: contacts, isFetching, isError } = useGetContactsQuery(1);
  const isLogin = useSelector(getIsLogin);

  return (
    <Flex direction={'column'}>
      <Title title={'Phonebook'}>
        <Form contacts={contacts} />
      </Title>

      <Title title={'Contacts'}>
        <Filter contacts={contacts} />
        <Contacts contacts={contacts} />
        {isFetching && !isError && isLogin && <b>Request in progress...</b>}
      </Title>
    </Flex>
  );
};
