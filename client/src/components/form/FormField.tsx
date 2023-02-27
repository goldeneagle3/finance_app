import React from 'react';
import * as _ from 'lodash';

import { InputLabel, TextField } from '@mui/material';
import { IFormField } from '../../interfaces/formField.interface';

export default function FormField({
  fieldName,
  value,
  onChange,
  onBlur,
  error,
  helperText,
  type = 'text',
  placeholder,
  multiline,
}: IFormField) {
  return (
    <React.Fragment>
      <InputLabel
        sx={{ fontWeight: 500, marginTop: 1, color: '#000000' }}
        htmlFor={fieldName}
      >
        {_.startCase(fieldName)}
      </InputLabel>
      <TextField
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        helperText={error ? helperText : ''}
        type={type}
        name={fieldName}
        id={fieldName}
        variant="outlined"
        size="small"
        placeholder={placeholder ? placeholder : ''}
        sx={{ borderColor: 'red' }}
        multiline={multiline}
        rows={5}
      />
    </React.Fragment>
  );
}
