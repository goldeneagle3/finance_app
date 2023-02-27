import { UseFormReturn } from 'react-hook-form';

export interface ReactHookFormTextFieldContainerProps {
  name: string;
  label: string;
  type?: string;
  defVal?: string | number;
}

export interface IReactHookFormTextFieldProps {
  name: string;
  label: string;
}

export interface IReactHookFormTextFieldMemoProps {
  methods: UseFormReturn;
  label: string;
  name: string;
  type: string;
  defVal?: string | number;
}
