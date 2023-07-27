import styled from 'styled-components';

const ContactsUserList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;

const ContactsUser = styled.li`
  width: 100%;
  display: flex;
  justify-content: space-around;
`;

const ContactsUserName = styled.span`
  width: fit-content;
`;
const ContactsButtonDelite = styled.button`
  margin-left: auto;
  font-family: 'Roboto', sans-serif;
  text-transform: uppercase;
  outline: 0;
  background-color: #db0000;
  border: 0;
  padding: 5px;
  color: #ffffff;
  font-size: 12px;
  -webkit-transition: all 0.3 ease;
  transition: all 0.3 ease;
  cursor: pointer;

  :hover,
  :active,
  :focus {
    background: #cb0000;
  }
`;

export {
  ContactsUserList,
  ContactsUser,
  ContactsUserName,
  ContactsButtonDelite,
};
