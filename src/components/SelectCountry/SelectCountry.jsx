import PropTypes from 'prop-types';
import {
  getCountries,
  getCountryCallingCode,
} from 'react-phone-number-input/input';
import en from 'react-phone-number-input/locale/en';
import {
  ArrowSelectCountry,
  ContainerOptionsCountry,
  ContainerSelectCountry,
  FlagCountry,
  OptionCountry,
  SelectCountries,
} from './SelectCountry.styled';
import { useState } from 'react';

const SelectCountry = ({ onGetChangeSelect, ...rest }) => {
  const [country, setCountry] = useState('UA');

  const onChange = ({ target }) => {
    const result = target.value || undefined;
    onGetChangeSelect(result);
    setCountry(target.value);
  };

  return (
    <ContainerSelectCountry>
      {country && (
        <FlagCountry
          src={`https://purecatamphetamine.github.io/country-flag-icons/3x2/${country}.svg`}
        />
      )}
      <ContainerOptionsCountry>
        <SelectCountries {...rest} onChange={onChange}>
          {getCountries().map(country => (
            <OptionCountry key={country} value={country}>
              {en[country]} +{getCountryCallingCode(country)}
            </OptionCountry>
          ))}
        </SelectCountries>

        <ArrowSelectCountry />
      </ContainerOptionsCountry>
    </ContainerSelectCountry>
  );
};

SelectCountry.propTypes = {
  onGetChangeSelect: PropTypes.func.isRequired,
};

export default SelectCountry;
