export interface IExpense {
  title: string;
  category: string;
  amount: number;
  notes?: string;
}

export interface IInputData extends IExpense {
  id?: string;
  _id?: string;
  incurred_on: Date;
}

export interface IExpenseByUserInput {
  firstDay: Date | number;
  lastDay: Date | number;
}

export interface IExpenseMonthly {
  month: Date | number;
}

export interface IExpenseYearly {
  year: Date | number;
}

export type IToken = string | undefined;
