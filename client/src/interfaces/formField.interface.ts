import { ChangeEvent, FocusEventHandler } from 'react';

export interface IFormField {
  fieldName: string;
  value: string | number;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  onBlur?: FocusEventHandler<HTMLInputElement | HTMLTextAreaElement>;
  error?: boolean | undefined;
  helperText: string;
  type: string;
  placeholder?: string;
  multiline?: boolean;
}
