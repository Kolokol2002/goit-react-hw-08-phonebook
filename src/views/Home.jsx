import { MainContainer } from 'components/App/App.styled';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';
import Title from 'components/Title/Title';
import { useGetContactsQuery } from 'redux/contactsSlice';

export const Home = () => {
  const { data: contacts, isFetching, isError } = useGetContactsQuery();
  return (
    <MainContainer>
      <Title title={'Phonebook'}>
        <Form contacts={contacts} />
      </Title>

      {contacts?.length !== 0 && (
        <Title title={'Contacts'}>
          <Filter />
          {isFetching && !isError && <b>Request in progress...</b>}
          <Contacts contacts={contacts} />
        </Title>
      )}
    </MainContainer>
  );
};
