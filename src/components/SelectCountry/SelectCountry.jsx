import {
  Box,
  Input,
  InputGroup,
  useDisclosure,
  useOutsideClick,
  InputLeftElement,
} from '@chakra-ui/react';
import Countries from './countries.json';
import { AsYouType } from 'libphonenumber-js';
import { useState, useRef } from 'react';
import { SearchOnList } from './SearchOnList';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Flag from 'react-flagkit';

const SelectCountry = ({ inputProps, isError, onChange }) => {
  const ref = useRef(null);
  const [number, setNumber] = useState('+380');
  const [country, setCountry] = useState('');
  const [countryFlag, setCountryFlag] = useState(`UA`);
  const { isOpen, onToggle, onClose } = useDisclosure();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const onCountryChange = item => {
    // const parsedNumber = new AsYouType().input(`${country}${number}`);

    setNumber(item?.dial_code);
    setCountry(item?.dial_code);
    setCountryFlag(item?.code);
    // onChange(parsedNumber);
    onClose();
  };

  const onPhoneNumberChange = event => {
    const value = event.target.value;
    const parsedNumber = new AsYouType().input(`${country}${number}`);

    setNumber(value);
    onChange(parsedNumber);
  };

  return (
    <>
      <Box as="section" ref={ref} position="relative">
        <InputGroup>
          <InputLeftElement width="5em" cursor="pointer" onClick={onToggle}>
            <Flag country={countryFlag} size={30} />
            {isOpen ? (
              <ChevronUpIcon boxSize={6} color="gray.500" />
            ) : (
              <ChevronDownIcon boxSize={6} color="gray.500" />
            )}
          </InputLeftElement>
          <Input
            name={inputProps.name}
            ref={inputProps.ref}
            isInvalid={isError}
            pl="5em"
            mb={6}
            variant="filled"
            errorBorderColor="crimson"
            type="tel"
            value={number}
            placeholder="Phone number"
            onChange={onPhoneNumberChange}
          />
        </InputGroup>

        {isOpen && <SearchOnList data={Countries} onChange={onCountryChange} />}
      </Box>
    </>
  );
};

export default SelectCountry;
