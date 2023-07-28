import {
  Box,
  InputGroup,
  useDisclosure,
  useOutsideClick,
  InputLeftElement,
} from '@chakra-ui/react';
import Countries from './countries.json';

import { useState, useRef } from 'react';
import { SearchOnList } from './SearchOnList';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import Flag from 'react-flagkit';

const SelectCountry = ({ setCountry, children }) => {
  const ref = useRef(null);

  const [countryFlag, setCountryFlag] = useState(`UA`);
  const { isOpen, onToggle, onClose } = useDisclosure();

  useOutsideClick({
    ref: ref,
    handler: () => onClose(),
  });

  const onCountryChange = item => {
    setCountry(item?.dial_code);
    setCountryFlag(item?.code);
    onClose();
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
          {children}
        </InputGroup>

        {isOpen && <SearchOnList data={Countries} onChange={onCountryChange} />}
      </Box>
    </>
  );
};

export default SelectCountry;
