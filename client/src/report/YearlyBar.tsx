import { Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { VictoryTheme, VictoryAxis, VictoryBar, VictoryChart } from 'victory';

import { reset, yearlyExpenses } from '../features/slices/expense.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';

const YearlyBar = () => {
  const { yearlyExpenses: expenses } = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();
  const year = new Date();
  const monthStrings = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  useEffect(() => {
    dispatch(yearlyExpenses({ year: year.getFullYear() }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div>
      <Typography>Your monthly expenditures in</Typography>
      <VictoryChart
        theme={VictoryTheme.material}
        domainPadding={10}
        height={400}
        width={550}
      >
        <VictoryAxis />
        <VictoryBar
          categories={{
            x: monthStrings,
          }}
          style={{
            data: { fill: '#69f0ae', width: 20 },
            labels: { fill: '#01579b' },
          }}
          data={expenses.monthTot}
          x={monthStrings['x']}
          domain={{ x: [0, 13] }}
          labels={({ datum }) => `$${datum.y}`}
        />
      </VictoryChart>
    </div>
  );
};

export default YearlyBar;
