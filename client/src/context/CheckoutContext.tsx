import React from 'react';
import { IExpense } from '../features/interfaces/expense.interface';

type State = {
  expense: IExpense;
};
type Action =
  | { type: 'create'; payload: IExpense }
  | { type: 'update'; payload: IExpense };
type Dispatch = (action: Action) => void;
type CheckoutProviderProps = { children: React.ReactNode };

const initialState: State = {
  expense: {
    title: '',
    amount: 0,
    category: '',
    notes: '',
  },
};

const CheckoutContext = React.createContext<
  { state: State; dispatch: Dispatch } | undefined
>(undefined);

const checkoutReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'create': {
      return {
        ...state,
        expense: action.payload,
      };
    }
    case 'update': {
      return {
        ...state,
        expense: action.payload,
      };
    }
    default: {
      throw new Error(`Unhandled action type`);
    }
  }
};

const CheckoutProvider = ({ children }: CheckoutProviderProps) => {
  const [state, dispatch] = React.useReducer(checkoutReducer, initialState);
  const value = { state, dispatch };
  return (
    <CheckoutContext.Provider value={value}>
      {children}
    </CheckoutContext.Provider>
  );
};

const useCheckout = () => {
  const context = React.useContext(CheckoutContext);
  if (context) {
    return context;
  }
  throw new Error('useCheckout must be used within a CheckoutProvider');
};

export { CheckoutProvider, useCheckout };
