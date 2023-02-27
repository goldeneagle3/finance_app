import React, { FC } from 'react';
import { useFormContext } from 'react-hook-form';
import { ReactHookFormTextFieldContainerProps } from '../interfaces/hookformfield';
// import RHFTextField from './RHFTextField';
import RHFTextFieldMemo from './RHFTextFieldMemo';

const RHFContainer: FC<ReactHookFormTextFieldContainerProps> = ({
  name,
  label,
  type,
}: ReactHookFormTextFieldContainerProps) => {
  const methods = useFormContext();
  return (
    <RHFTextFieldMemo methods={methods} type={type} label={label} name={name} />
  );
};

export default RHFContainer;
