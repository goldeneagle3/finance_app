import React, { FC, FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CircularProgress, Grid } from '@mui/material';

import { INewUser } from '../features/interfaces/user.interface';
import { register, reset } from '../features/slices/user.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import useInput from '../hooks/userInput.hook';
import { validateEmail } from '../validation/methods/email.method';
import {
  validateNameLength,
  validatePasswordLength,
} from '../validation/methods/length.method';
import FormField from '../components/form/FormField';
import FormButton from '../components/button/FormButton';
import FormLayout from '../components/form/FormLayout';

const NewUser: FC = () => {
  const {
    text: username,
    shouldDisplayError: nameHasError,
    textChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    clearHandler: nameClearHandler,
  } = useInput(validateNameLength);

  const {
    text: email,
    shouldDisplayError: emailHasError,
    textChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    clearHandler: emailClearHandler,
  } = useInput(validateEmail);

  const {
    text: password,
    shouldDisplayError: passwordHasError,
    textChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    clearHandler: passwordClearHandler,
  } = useInput(validatePasswordLength);

  const {
    text: confirmPassword,
    shouldDisplayError: confirmPasswordHasError,
    textChangeHandler: confirmPasswordChangeHandler,
    inputBlurHandler: confirmPasswordBlurHandler,
    clearHandler: confirmPasswordClearHandler,
  } = useInput(validatePasswordLength);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const clearForm = () => {
    nameClearHandler();
    emailClearHandler();
    passwordClearHandler();
    confirmPasswordClearHandler();
  };

  const dispatch = useAppDispatch();

  const { isLoading, isSuccess } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
      navigate('/signin');
    }
  }, [clearForm, dispatch, isSuccess, navigate]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (password !== confirmPassword) return;

    if (
      nameHasError ||
      emailHasError ||
      passwordHasError ||
      confirmPasswordHasError
    )
      return;

    if (
      username.length === 0 ||
      email.length === 0 ||
      password.length === 0 ||
      confirmPassword.length === 0
    )
      return;

    const newUser: INewUser = {
      username,
      email,
      password,
    };

    dispatch(register(newUser));
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: '64px' }} color="primary" />;

  return (
    <FormLayout text="Create User">
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="column" justifyContent="flex-start">
          <FormField
            fieldName="username"
            value={username}
            onChange={nameChangeHandler}
            onBlur={nameBlurHandler}
            error={nameHasError}
            helperText="Enter your username"
            type="text"
          />
          <FormField
            fieldName="email"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
            error={emailHasError}
            helperText="Enter your email"
            type="email"
          />
          <FormField
            fieldName="password"
            value={password}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
            error={passwordHasError}
            helperText="Enter your password"
            type="password"
            placeholder="Minimum 6 characters required"
          />
          <FormField
            fieldName="confirmPassword"
            value={confirmPassword}
            onChange={confirmPasswordChangeHandler}
            onBlur={confirmPasswordBlurHandler}
            error={confirmPassword.length > 0 && password !== confirmPassword}
            helperText={
              password !== confirmPassword ? 'Passwords must match' : ''
            }
            type="password"
          />

          <FormButton
            text="Register"
            color="primary.light"
            bgcolor="primary.main"
            width={200}
          />
        </Grid>
      </form>
    </FormLayout>
  );
};

export default NewUser;
