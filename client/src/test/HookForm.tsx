import React, { FC } from 'react';
import { useForm, SubmitHandler, FormProvider } from 'react-hook-form';
import { SchemaOf, object, string, number } from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { IExpense } from '../features/interfaces/expense.interface';
// import FieldCpOne from './FieldCpOne';
import RHFContainer from './RHFContainer';
import FormLayout from '../components/layouts/FormLayout';
import FormButton from '../components/button/FormButton';
import { Grid } from '@mui/material';
import { useCheckout } from '../context/CheckoutContext';

const schema: SchemaOf<IExpense> = object({
  title: string().required(),
  amount: number().positive().required(),
  category: string().required(),
  notes: string(),
});

const HookForm: FC = () => {
  const checkoutContext = useCheckout();

  const methods = useForm<IExpense>({
    resolver: yupResolver(schema),
    defaultValues: checkoutContext.state.expense,
  });

  const onSubmit: SubmitHandler<IExpense> = (data: IExpense) => {
    console.log(data);
    checkoutContext.dispatch({ type: 'update', payload: data });
  };

  return (
    <FormLayout text="Create Expense">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmit)}>
          <Grid container direction="column" justifyContent="flex-start">
            <RHFContainer label="Title" name="title" type="text" />
            <RHFContainer label="Amount" name="amount" type="number" />
            <RHFContainer label="Category" name="category" type="text" />
            <RHFContainer label="Notes" name="notes" type="text" />
            <FormButton
              text="Add Expense"
              color="primary.dark"
              bgcolor="primary.contrastText"
              width={150}
            />
          </Grid>
        </form>
      </FormProvider>
    </FormLayout>
  );
};

export default HookForm;
