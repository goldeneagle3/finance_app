import React, { useEffect, useState } from 'react';
import { Button, Typography } from '@mui/material';
import {
  VictoryTheme,
  VictoryScatter,
  VictoryChart,
  VictoryTooltip,
  VictoryLabel,
} from 'victory';
import DatePicker from 'react-datepicker';

import { plotExpenses, reset } from '../features/slices/expense.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import PageLayout from '../components/layouts/PageLayout';

const MonthlyScatter = () => {
  const { plotExpenses: Monthly } = useAppSelector((state) => state.expense);
  const dispatch = useAppDispatch();
  const [month, setMonth] = useState(new Date());

  useEffect(() => {
    dispatch(plotExpenses(month));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  console.log(Monthly);
  console.log(month);
  const onSubmit = () => {
    dispatch(plotExpenses(month));
  };

  return (
    <div>
      <Typography variant="h6" align="center">
        Expenses scattered over
      </Typography>
      <DatePicker
        selected={month}
        onChange={(date: Date) => setMonth(date)}
        dateFormat="MM/yyyy"
        showMonthYearPicker
      />
      <Button onClick={onSubmit}>Submit</Button>

      <VictoryChart
        theme={VictoryTheme.material}
        height={400}
        width={550}
        domainPadding={40}
      >
        <VictoryScatter
          style={{
            data: { fill: '#01579b', stroke: '#69f0ae', strokeWidth: 2 },
            labels: { fill: '#01579b', fontSize: 10, padding: 8 },
          }}
          bubbleProperty="y"
          maxBubbleSize={15}
          minBubbleSize={5}
          labels={({ datum }) => `$${datum.y} on ${datum.x}th`}
          labelComponent={<VictoryTooltip />}
          data={Monthly}
          domain={{ x: [0, 31] }}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: '#8b8b8b' }}
          x={270}
          y={390}
          text={`day of month`}
        />
        <VictoryLabel
          textAnchor="middle"
          style={{ fontSize: 14, fill: '#8b8b8b' }}
          x={6}
          y={190}
          angle={270}
          text={`Amount ($)`}
        />
      </VictoryChart>
    </div>
  );
};

export default MonthlyScatter;
