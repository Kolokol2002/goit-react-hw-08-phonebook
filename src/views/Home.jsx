import { MainContainer } from 'components/App/App.styled';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';
import Title from 'components/Title/Title';
import { useGetContactsQuery } from 'redux/contactsApi';

export const Home = () => {
  const { data: contacts, isFetching, isError } = useGetContactsQuery();
  return (
    <MainContainer>
      <Title title={'Phonebook'}>
        <Form contacts={contacts} />
      </Title>

      <Title title={'Contacts'}>
        <Filter contacts={contacts} />
        <Contacts contacts={contacts} />
        {isFetching && !isError && <b>Request in progress...</b>}
      </Title>
    </MainContainer>
  );
};
