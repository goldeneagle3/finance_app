import React, { FC } from 'react';
import { TextField } from '@mui/material';
import * as _ from 'lodash';
import { Controller, useFormContext } from 'react-hook-form';

const FieldCpOne: FC = () => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <>
      <Controller
        name="title"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Title"
            variant="outlined"
            error={!!errors.title}
            helperText={errors.title ? _.startCase(errors.title.message) : ''}
          />
        )}
      />
      <br />
      <br />
      <Controller
        name="amount"
        control={control}
        defaultValue={0}
        render={({ field }) => (
          <TextField
            {...field}
            label="Amount"
            variant="outlined"
            error={!!errors.amount}
            helperText={errors.amount ? _.startCase(errors.amount.message) : ''}
          />
        )}
      />
      <br />
      <br />
      <Controller
        name="category"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Category"
            variant="outlined"
            error={!!errors.category}
            helperText={
              errors.category ? _.startCase(errors.category.message) : ''
            }
          />
        )}
      />
      <br />
      <br />
      <Controller
        name="notes"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Notes"
            placeholder="..."
            variant="outlined"
            error={!!errors.notes}
            helperText={errors.notes ? _.startCase(errors.notes.message) : ''}
          />
        )}
      />
      <br />
      <br />
    </>
  );
};

export default FieldCpOne;
