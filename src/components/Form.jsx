import 'yup-phone-lite';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Controller, useForm } from 'react-hook-form';
import 'react-phone-input-2/lib/style.css';
import { useAddNewContactMutation } from 'redux/contactsApi';
import { Button, FormControl, Input } from '@chakra-ui/react';
import SelectCountry from 'components/SelectCountry';
import { useEffect, useState } from 'react';
import { AsYouType } from 'libphonenumber-js';
import { getIsLogin } from 'redux/selectors.';
import { useSelector } from 'react-redux';

function Form({ contacts }) {
  const [number, setNumber] = useState('');
  const [country, setCountry] = useState('+380');
  const isLogin = useSelector(getIsLogin);

  const [addNewContact] = useAddNewContactMutation();

  useEffect(() => {
    setNumber(country);
  }, [country]);

  const {
    register,
    handleSubmit,
    reset,
    control,
    setFocus,
    formState: { errors },
  } = useForm();

  const isEmpty = userData => {
    let isResetForm = true;

    const isEmptyName = contacts.filter(
      ({ name }) => name.toLowerCase() === userData.name.toLowerCase()
    ).length;

    const isEmptyNumber = contacts.filter(
      ({ number }) => number === userData.number
    ).length;

    if (!isEmptyName && !isEmptyNumber) {
      toast.success(`${userData.name}, success add!`, {
        hideProgressBar: true,
        autoClose: 2000,
        theme: 'dark',
      });

      addNewContact(userData);
    }

    if (isEmptyName || isEmptyNumber) {
      toast.warn(
        `${
          (isEmptyName && userData.name) || (isEmptyNumber && userData.number)
        }, already exist in phonebook!!!`,
        {
          hideProgressBar: true,
          autoClose: 2000,
          theme: 'dark',
        }
      );
      isResetForm = false;
    }

    return isResetForm;
  };

  const onSubmit = async ({ name, number }) => {
    const parsedNumber = new AsYouType().input(`${number}`);
    const isResetForm = isEmpty({
      name,
      number: parsedNumber,
    });

    setFocus('name');

    if (isResetForm) {
      reset();
      setNumber(country);
    }
  };

  const onPhoneNumberChange = (e, onChange) => {
    const value = e.target.value;
    const parsedNumber = new AsYouType().input(`${value}`);

    setNumber(value);
    onChange(parsedNumber);
  };

  return (
    <FormControl
      as={'form'}
      onSubmit={handleSubmit(onSubmit)}
      display={'flex'}
      flexDirection="column"
    >
      <Input
        isInvalid={errors.name}
        placeholder="Full name"
        type="text"
        variant="filled"
        mb={3}
        errorBorderColor="crimson"
        disabled={!isLogin}
        {...register('name', { required: 'Required!!!' })}
      />
      <Controller
        control={control}
        name="number"
        rules={{ required: 'Required!!!' }}
        render={({ field: { name, ref, onChange } }) => {
          return (
            <SelectCountry
              setCountry={setCountry}
              inputProps={{ name, ref }}
              isError={errors.name}
            >
              <Input
                name={name}
                ref={ref}
                isInvalid={errors.name}
                pl="5em"
                mb={6}
                variant="filled"
                errorBorderColor="crimson"
                type="tel"
                value={number}
                placeholder="Phone number"
                disabled={!isLogin}
                onChange={e => onPhoneNumberChange(e, onChange)}
              />
            </SelectCountry>
          );
        }}
      />

      {/* {errors.number && <ErrorValidate>{errors.number.message}</ErrorValidate>} */}

      <Button isDisabled={!isLogin} type="submit" colorScheme="teal" mb={8}>
        Add Contact
      </Button>
    </FormControl>
  );
}

export default Form;
