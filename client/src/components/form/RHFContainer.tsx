import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { ReactHookFormTextFieldContainerProps } from '../../interfaces/hookformfield';
import RHFMemoField from './RHFMemoField';

const RHFContainer: FC<ReactHookFormTextFieldContainerProps> = ({
  name,
  label,
  type = 'text',
  defVal = '',
}: ReactHookFormTextFieldContainerProps) => {
  const methods = useFormContext();
  return (
    <RHFMemoField
      methods={methods}
      type={type}
      label={label}
      name={name}
      defVal={defVal}
    />
  );
};

export default RHFContainer;
