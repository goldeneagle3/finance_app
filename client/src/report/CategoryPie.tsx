import React, { useEffect } from 'react';
import { Typography } from '@mui/material';
import { VictoryPie, VictoryTheme, VictoryLabel } from 'victory';

import { averageCategories, reset } from '../features/slices/expense.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';

const CategoryPie = () => {
  const { averageCategories: expenses } = useAppSelector(
    (state) => state.expense,
  );
  const dispatch = useAppDispatch();
  const date = new Date(),
    y = date.getFullYear(),
    m = date.getMonth();
  const firstDay = new Date(y, m, 1);
  const lastDay = new Date(y, m + 1, 0);

  useEffect(() => {
    dispatch(averageCategories({ firstDay, lastDay }));

    return () => {
      dispatch(reset());
    };
  }, [dispatch]);

  return (
    <div>
      <Typography align="center" variant="h5">
        Average by Categories
      </Typography>
      <div style={{ width: 550, margin: 'auto' }}>
        <svg viewBox="0 0 320 320">
          <VictoryPie
            standalone={false}
            data={expenses.monthAVG}
            innerRadius={50}
            theme={VictoryTheme.material}
            // labelRadius={({ innerRadius }) => innerRadius + innerRadius * 0.2}
            labelComponent={
              <VictoryLabel
                angle={0}
                style={[
                  {
                    fontSize: '11px',
                    fill: '#0f0f0f',
                  },
                  {
                    fontSize: '10px',
                    fill: '#013157',
                  },
                ]}
                text={({ datum }) => `${datum.x}\n $${datum.y}`}
              />
            }
          />
          <VictoryLabel
            textAnchor="middle"
            style={{ fontSize: 14, fill: '#8b8b8b' }}
            x={175}
            y={170}
            text={`Spent \nper category`}
          />
        </svg>
      </div>
    </div>
  );
};

export default CategoryPie;
