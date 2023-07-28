import { MainContainer } from 'components/App/App.styled';
import Contacts from 'components/Contacts/Contacts';
import Filter from 'components/Filter/Filter';
import Form from 'components/Form/Form';
import Title from 'components/Title/Title';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUserInfo } from 'redux/authSlice';
import { useGetContactsQuery, useGetCurrentUserQuery } from 'redux/contactsApi';

export const Home = () => {
  const { data: contacts, isFetching, isError } = useGetContactsQuery();
  const dispatch = useDispatch();
  const { data } = useGetCurrentUserQuery();
  // console.log(data);

  useEffect(() => {
    data !== undefined && dispatch(setUserInfo(data));
  }, [data, dispatch]);

  return (
    <MainContainer>
      <Title title={'Phonebook'}>
        <Form contacts={contacts} />
      </Title>
      {/* {console.log(contactsApi.endpoints.getContacts.matchFulfilled)} */}

      <Title title={'Contacts'}>
        <Filter contacts={contacts} />
        <Contacts contacts={contacts} />
        {isFetching && !isError && <b>Request in progress...</b>}
      </Title>
    </MainContainer>
  );
};
