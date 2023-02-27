export type TValidatorFn = (text: string, options?: object) => boolean;

export interface ILengthOptions {
  min?: number;
  max?: number;
}
