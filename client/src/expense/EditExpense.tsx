import React from 'react';
import { Grid } from '@mui/material';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import DatePicker from 'react-datepicker';

import FormButton from '../components/button/FormButton';
import RHFContainer from '../components/form/RHFContainer';
import FormLayout from '../components/layouts/FormLayout';
import { useAppDispatch } from '../hooks/redux.hook';
import { IInputData } from '../features/interfaces/expense.interface';
import { updateExpense } from '../features/slices/expense.slice';

const EditExpense = ({ expense }: { expense: IInputData }) => {
  const dispatch = useAppDispatch();
  const methods = useForm();

  const submitHandler: SubmitHandler<IInputData> = (data: IInputData) => {
    dispatch(updateExpense({ ...data, id: expense._id }));
  };
  return (
    <div>
      <FormLayout text="Update Expense">
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(submitHandler)}>
            <Grid container direction="column" justifyContent="flex-start">
              <RHFContainer name="title" label="Title" defVal={expense.title} />
              <RHFContainer
                label="Amount"
                name="amount"
                type="number"
                defVal={expense.amount}
              />
              <RHFContainer
                label="Category"
                name="category"
                defVal={expense.category}
              />
              <RHFContainer label="Notes" name="notes" defVal={expense.notes} />
              <Controller
                name="incurred_on"
                control={methods.control}
                defaultValue={new Date()}
                render={({ field }) => (
                  <DatePicker
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                    placeholderText="Enter the Date"
                    className="date__picker"
                  />
                )}
              />
              <FormButton
                text="Update Expense"
                color="primary.dark"
                bgcolor="primary.contrastText"
                width={150}
              />
            </Grid>
          </form>
        </FormProvider>
      </FormLayout>
    </div>
  );
};

export default EditExpense;
