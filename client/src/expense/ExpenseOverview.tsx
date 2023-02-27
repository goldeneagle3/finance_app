import { Box, Card, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

import PageLayout from '../components/layouts/PageLayout';
import {
  currentMonthPreview,
  expenseByCategory,
  reset,
} from '../features/slices/expense.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';

const ExpenseOverview = () => {
  const {
    expenseByCategory: ByCategory,
    currentMonthPreview: ExpensePreview,
    isLoading,
    isError,
    message,
    isSuccess,
  } = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(currentMonthPreview(null));
    dispatch(expenseByCategory(null));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

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
  const indicateExpense = (values: { total: number; average: number }) => {
    let color = 'blue';
    if (values.total) {
      const diff = values.total - values.average;
      if (diff > 0) {
        color = 'red';
      }
      if (diff < 0) {
        color = 'green';
      }
    }
    return color;
  };

  return (
    <PageLayout>
      <Card sx={{ p: 2 }}>
        <Typography
          variant="h4"
          color="primary.contrastText"
          align="center"
          fontFamily="sans-serif"
          gutterBottom
        >
          Expense Overview
        </Typography>
        <motion.div
          animate={{ opacity: [0, 1], x: [-100, 0] }}
          style={{
            display: 'flex',
            justifyContent: 'space-evenly',
            alignItems: 'center',
          }}
        >
          <Typography
            component="span"
            variant="h6"
            color="green"
            fontFamily="initial"
          >
            ${ExpensePreview.month ? ExpensePreview.month.totalSpent : '0'}
            <span style={{ display: 'block', fontSize: '0.7em' }}>
              so far this month
            </span>
          </Typography>
          <div style={{ margin: '20px 20px 20px 30px' }}>
            <Typography variant="h6" color="primary.dark" fontFamily="initial">
              ${ExpensePreview.today ? ExpensePreview.today.totalSpent : '0'}
              <span>Today</span>
            </Typography>
            <Typography variant="h6" color="primary.dark" fontFamily="initial">
              $
              {ExpensePreview.yesterday
                ? ExpensePreview.yesterday.totalSpent
                : '0'}
              <span>Yesterday </span>
            </Typography>
            <Link
              to="/expenses/all"
              style={{ textDecoration: 'none', color: 'gray' }}
            >
              <Typography variant="body2">See more</Typography>
            </Link>
          </div>
        </motion.div>
        <Divider />
        <Grid
          container
          sx={{ mt: 2 }}
          component={motion.div}
          animate={{ y: [500, 0], opacity: [0, 1] }}
        >
          {ByCategory?.map((expense, index) => {
            return (
              <Grid key={index} item xs={12} md={4}>
                <div style={{ display: 'grid', justifyContent: 'center' }}>
                  <Typography variant="h6" align="center">
                    {expense._id}
                  </Typography>
                  <Divider
                    sx={{
                      backgroundColor: indicateExpense(expense.mergedValues),
                    }}
                  />
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      gap: 2,
                      m: 0.2,
                    }}
                  >
                    <Box sx={{ display: 'grid', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: 10 }}>Average</Typography>
                      <Divider />
                      <Typography
                        align="center"
                        variant="body2"
                        fontFamily="initial"
                      >
                        ${expense.mergedValues.average}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'grid', justifyContent: 'center' }}>
                      <Typography sx={{ fontSize: 10 }}>Month</Typography>
                      <Divider />
                      <Typography
                        align="center"
                        variant="body2"
                        fontFamily="initial"
                      >
                        $
                        {expense.mergedValues.total
                          ? expense.mergedValues.total
                          : 0}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'grid',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography sx={{ fontSize: 10 }}>
                        {expense.mergedValues.total &&
                        expense.mergedValues.total -
                          expense.mergedValues.average >
                          0
                          ? 'Spent extra'
                          : 'Saved'}
                      </Typography>
                      <Divider />
                      <Typography
                        variant="body2"
                        fontFamily="initial"
                        align="center"
                      >
                        $
                        {expense.mergedValues.total
                          ? Math.abs(
                              expense.mergedValues.total -
                                expense.mergedValues.average,
                            )
                          : expense.mergedValues.average}
                      </Typography>
                    </Box>
                  </Box>
                  <Divider sx={{ marginBottom: 10 }} />
                </div>
              </Grid>
            );
          })}
        </Grid>
      </Card>
    </PageLayout>
  );
};

export default ExpenseOverview;
