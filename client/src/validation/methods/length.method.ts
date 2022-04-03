import { ILengthOptions, TValidatorFn } from '../types/length.types';

const _validateLength: TValidatorFn = (
  text: string,
  options?: ILengthOptions,
): boolean => {
  if (typeof text !== 'string') return false;
  const textLength = text.trim().length;

  if (options?.min && textLength < options.min) return false;
  if (options?.max && textLength > options.max) return false;

  return true;
};

export const validateNameLength: TValidatorFn = (
  text: string,
): boolean => {
  if (typeof text !== 'string') return false;

  return _validateLength(text, { min: 3 });
};

export const validatePasswordLength: TValidatorFn = (
  text: string,
): boolean => {
  if (typeof text !== 'string') return false;

  return _validateLength(text, { min: 6, max: 20 });
};
