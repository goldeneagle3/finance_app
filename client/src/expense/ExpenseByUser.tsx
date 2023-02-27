import React, { FC, useEffect, useState } from 'react';
import {
  Controller,
  FormProvider,
  SubmitHandler,
  useForm,
} from 'react-hook-form';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import DatePicker from 'react-datepicker';
import { Box, Divider, Grid } from '@mui/material';
import { MdEdit } from 'react-icons/md';

import 'react-datepicker/dist/react-datepicker.css';
import './expense.sass';

import { listExpenses, reset } from '../features/slices/expense.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import {
  IExpenseByUserInput,
  IInputData,
} from '../features/interfaces/expense.interface';
import FormButton from '../components/button/FormButton';
import PageLayout from '../components/layouts/PageLayout';
import EditExpense from './EditExpense';
import DeleteExpense from './DeleteExpense';

const ExpenseByUser: FC = () => {
  const { expenses, isError, message, isLoading } = useAppSelector(
    (state) => state.expense,
  );
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const [firstDay, setFirstDay] = useState(new Date(y, m, 1));
  const [lastDay, setLastDay] = useState(new Date(y, m + 1, 0));
  const [expArr, setexpArr] = useState<IInputData[] | null>(null);
  const dispatch = useAppDispatch();
  const datas = expArr ? expArr : expenses;

  useEffect(() => {
    dispatch(listExpenses({ firstDay, lastDay }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  const methods = useForm();

  const submitHndler: SubmitHandler<IExpenseByUserInput> = ({
    firstDay,
    lastDay,
  }: IExpenseByUserInput) => {
    dispatch(listExpenses({ firstDay, lastDay }));
  };

  const deleteExp = (expense: IInputData) => {
    const arr = [...expenses];
    // eslint-disable-next-line prefer-const
    let index = arr.indexOf(expense);
    if (index !== -1) {
      arr.splice(index, 1);
      setexpArr(arr);
    }
  };

  if (isLoading) {
    console.log('loading');
  }
  const errMsg = isError ? message : '';

  if (errMsg) {
    return (
      <div>
        <Typography>{errMsg}</Typography>
      </div>
    );
  }

  return (
    <PageLayout>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit(submitHndler)}
          style={{ textAlign: 'center' }}
        >
          <Grid
            container
            columnGap={4}
            sx={{ display: 'flex', justifyContent: 'center' }}
          >
            <Grid>
              <Controller
                name="firstDay"
                control={methods.control}
                defaultValue={firstDay}
                render={({ field }) => (
                  <DatePicker
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                    placeholderText="Enter the First Day"
                    className="date__picker"
                  />
                )}
              />
            </Grid>
            <Grid>
              <Controller
                name="lastDay"
                control={methods.control}
                defaultValue={lastDay}
                render={({ field }) => (
                  <DatePicker
                    onChange={(e) => field.onChange(e)}
                    selected={field.value}
                    placeholderText="Enter the Last Day"
                    className="date__picker"
                  />
                )}
              />
            </Grid>
          </Grid>
          <FormButton
            text="Show Expenses"
            color="primary.main"
            bgcolor="primary.light"
            width={150}
          />
        </form>
      </FormProvider>
      <Box sx={{ mt: 5 }}>
        {datas?.map((expense, index) => (
          <span key={index}>
            <Accordion sx={{ m: 0.5 }}>
              <AccordionSummary
                expandIcon={<MdEdit />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}
                >
                  <Box sx={{ textAlign: 'center', mr: 5 }}>
                    <Typography>${expense.amount}</Typography>
                    <Divider style={{ marginTop: 4, marginBottom: 4 }} />
                    <Typography
                      variant="body2"
                      sx={{ color: 'red', fontSize: 11 }}
                    >
                      Category : {expense.category}
                    </Typography>
                  </Box>

                  <Typography variant="body2" component="p">
                    {new Date(expense.incurred_on).toLocaleDateString()}
                  </Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                <Grid container>
                  <Grid item md={4}>
                    <Box sx={{ textAlign: 'center', mt: 2 }}>
                      <Typography>{expense.title}</Typography>
                      <Typography
                        paragraph
                        variant="body2"
                        sx={{ color: 'gray' }}
                      >
                        {expense.notes}
                      </Typography>
                    </Box>
                  </Grid>
                  <Grid md={8} item>
                    <EditExpense expense={expense} />
                    <DeleteExpense expense={expense} onRmv={deleteExp} />
                  </Grid>
                </Grid>
              </AccordionDetails>
            </Accordion>
          </span>
        ))}
      </Box>
    </PageLayout>
  );
};

export default ExpenseByUser;
