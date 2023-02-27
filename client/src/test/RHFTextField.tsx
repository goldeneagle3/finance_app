import { TextField } from '@mui/material';
import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { IReactHookFormTextFieldProps } from '../interfaces/hookformfield';

const RHFTextField: FC<IReactHookFormTextFieldProps> = ({
  name,
  label,
}: IReactHookFormTextFieldProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <TextField
      label={label}
      variant="outlined"
      error={!!errors[name]}
      helperText={errors[name]?.message ?? ''}
      fullWidth
      margin="dense"
      {...register(name)}
    />
  );
};

export default RHFTextField;
