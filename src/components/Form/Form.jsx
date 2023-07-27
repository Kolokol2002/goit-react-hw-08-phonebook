// import {
//   FormPhone,
//   ButtonPhone,
//   NameInput,
//   ErrorValidate,
// } from './Form.styled';
import 'yup-phone-lite';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Controller, useForm } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import { useState } from 'react';
import { useAddNewContactMutation } from 'redux/contactsSlice';
import { Button, FormControl, Input } from '@chakra-ui/react';

function Form({ contacts }) {
  const [dialCode, setDialCode] = useState('');
  const [numberValue, setNumberValue] = useState('');

  const [addNewContact] = useAddNewContactMutation();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    setFocus,
    formState: { errors },
  } = useForm({
    defaultValues: {
      number: dialCode,
    },
  });

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
    const isResetForm = isEmpty({
      name,
      number,
    });

    setFocus('name');

    if (isResetForm) {
      reset();
      setNumberValue(dialCode);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <FormControl display={'flex'} flexDirection="column">
        <Input
          isInvalid={errors.name}
          placeholder="Name"
          type="text"
          variant="filled"
          mb={3}
          errorBorderColor="crimson"
          {...register('name', { required: 'Required!!!' })}
        />
        {/* {errors.name && <ErrorValidate>{errors.name.message}</ErrorValidate>} */}

        <Controller
          control={control}
          name="number"
          rules={{ required: 'Required!!!' }}
          render={({ field: { name, ref } }) => {
            return (
              <PhoneInput
                inputProps={{ name, ref }}
                onChange={(value, country) => {
                  setNumberValue(value);
                  setValue('number', value);
                  setDialCode(country.dialCode);

                  if (country.dialCode !== dialCode) {
                    setNumberValue(country.dialCode);
                    setFocus('number');
                    return;
                  }
                }}
                value={numberValue}
                country={'ua'}
                prefix={'+'}
                placeholder={''}
                searchPlaceholder={'Search'}
                enableSearch={true}
                disableSearchIcon={true}
              />
            );
          }}
        />

        {/* {errors.number && <ErrorValidate>{errors.number.message}</ErrorValidate>} */}

        <Button type="submit" colorScheme="teal" mb={8}>
          Add Contact
        </Button>
      </FormControl>
    </form>
  );
}

export default Form;
