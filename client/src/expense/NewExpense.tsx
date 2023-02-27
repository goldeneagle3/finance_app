import React, { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';

import FormButton from '../components/button/FormButton';
import FormLayout from '../components/layouts/FormLayout';
import { IExpense } from '../features/interfaces/expense.interface';
import { createExpense, reset } from '../features/slices/expense.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';

import { number, object, SchemaOf, string } from 'yup';
import { FormProvider, SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import RHFContainer from '../components/form/RHFContainer';

const schema: SchemaOf<IExpense> = object({
  title: string().required(),
  amount: number().positive().required(),
  category: string().required(),
  notes: string(),
});

const NewExpense: FC = () => {
  const navigate = useNavigate();
  const { isLoading, isSuccess } = useAppSelector((state) => state.expense);
  const { jwt } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();

  const methods = useForm<IExpense>({
    resolver: yupResolver(schema),
    defaultValues: {
      title: '',
      amount: 0,
      category: '',
      notes: '',
    },
  });

  console.log(isSuccess);

  // useEffect(() => {
  //   if (isSuccess) {
  //     navigate('/');
  //   }
  //   return () => {
  //     dispatch(reset());
  //   };
  // }, [isSuccess, navigate, dispatch]);

  const onSubmitHandler: SubmitHandler<IExpense> = (data: IExpense) => {
    const incurred_on = new Date();
    dispatch(createExpense({ ...data, token: jwt?.auth_token, incurred_on }));
    dispatch(reset());
    navigate('/');
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: '64px' }} color="primary" />;

  return (
    <FormLayout text="Create Expense">
      <FormProvider {...methods}>
        <form onSubmit={methods.handleSubmit(onSubmitHandler)}>
          <Grid container direction="column" justifyContent="flex-start">
            <RHFContainer label="Title" name="title" />
            <RHFContainer label="Amount" name="amount" />
            <RHFContainer label="Category" name="category" />
            <RHFContainer label="Notes" name="notes" />
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

export default NewExpense;
