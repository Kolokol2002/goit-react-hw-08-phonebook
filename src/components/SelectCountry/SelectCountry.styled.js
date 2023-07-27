import styled from 'styled-components';
import { IoIosArrowDown } from 'react-icons/io';
// import { Form, Field } from 'formik';
import 'react-phone-number-input/style.css';
// import Input from 'react-phone-number-input/input';

export const SelectCountries = styled.select`
  width: 20px;
  border: 0;
  opacity: 0;
  cursor: pointer;
`;

export const ContainerSelectCountry = styled.div`
  position: absolute;
  top: 25%;
  left: 5px;
  z-index: 1;
  display: flex;
  gap: 2px;
`;

export const ContainerOptionsCountry = styled.div`
  position: relative;
`;
export const FlagCountry = styled.img`
  display: block;
`;
export const OptionCountry = styled.option`
  font-weight: normal;
  display: block;
  white-space-collapse: collapse;
  text-wrap: nowrap;
  min-height: 1.2em;
  padding: 0px 2px 1px;
`;
export const ArrowSelectCountry = styled(IoIosArrowDown)`
  display: block;
  position: absolute;
  z-index: -1;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;
