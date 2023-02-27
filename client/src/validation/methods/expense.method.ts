export const validateAmount = (expense: number): boolean => {
  if (Number(expense) <= 0) return false;
  return true;
};
