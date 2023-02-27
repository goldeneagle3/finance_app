import { TextField } from '@mui/material';
import React, { memo } from 'react';
import { IReactHookFormTextFieldMemoProps } from '../interfaces/hookformfield';

// eslint-disable-next-line react/display-name
const RHFTextFieldMemo = memo(
  ({ methods, label, name, type }: IReactHookFormTextFieldMemoProps) => (
    <TextField
      label={label}
      variant="outlined"
      error={!!methods.formState.errors[name]}
      helperText={methods.formState.errors[name]?.message ?? ''}
      fullWidth
      margin="dense"
      {...methods.register(name)}
      type={type}
    />
  ),
  (prevProps, nextProps) => {
    return (
      prevProps.methods.formState.isDirty ===
        nextProps.methods.formState.isDirty &&
      prevProps.methods.formState.errors !== nextProps.methods.formState.errors
    );
  },
);

export default RHFTextFieldMemo;
