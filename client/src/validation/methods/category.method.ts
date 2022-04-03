import { TValidatorFn } from '../types/length.types';

export const validateCategory: TValidatorFn = (category): boolean => {
  if (typeof category !== 'string') return false;
  if (category.length <= 0) return false;
  return true;
};
