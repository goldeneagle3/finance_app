import { TValidatorFn } from '../types/length.types';

export const validateExpense = (expense: number | string): boolean => {
  if (typeof expense !== 'number') return false;
  if (expense <= 0) return false;
  return true;
};
