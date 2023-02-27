import { Grid } from '@mui/material';
import React from 'react';
import CategoryPie from './CategoryPie';
import MonthlyScatter from './MonthlyScatter';
import YearlyBar from './YearlyBar';

const Reports = () => {
  return (
    <Grid container>
      <Grid lg={4} md={6} xs={12}>
        <CategoryPie />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <MonthlyScatter />
      </Grid>
      <Grid lg={4} md={6} xs={12}>
        <YearlyBar />
      </Grid>
    </Grid>
  );
};

export default Reports;
