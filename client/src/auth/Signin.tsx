import { CircularProgress, Grid } from '@mui/material';
import React, { FormEvent, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FormButton from '../components/button/FormButton';
import FormField from '../components/form/FormField';
import FormLayout from '../components/form/FormLayout';
import { ILoginUser } from '../features/interfaces/auth.interface';
import { reset, signin } from '../features/slices/auth.slice';
import { useAppDispatch, useAppSelector } from '../hooks/redux.hook';
import useInput from '../hooks/userInput.hook';
import { validateEmail } from '../validation/methods/email.method';
import { validatePasswordLength } from '../validation/methods/length.method';

const Signin = () => {
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

  const clearForm = () => {
    emailClearHandler();
    passwordClearHandler();
  };

  const dispatch = useAppDispatch();

  const { user, isLoading, isSuccess, isAuthenticated } = useAppSelector(
    (state) => state.auth,
  );

  // const { user: forUser } = useAppSelector((state) => state.user);

  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      dispatch(reset());
      clearForm();
    }
  }, [isSuccess, dispatch]);

  useEffect(() => {
    if (user?.username || isAuthenticated) return navigate('/');
  }, [user, isAuthenticated]);

  const onSubmitHandler = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (emailHasError || passwordHasError) return false;

    if (email.length === 0 || password.length === 0) return;

    const loginUser: ILoginUser = { email, password };

    dispatch(signin(loginUser));
  };

  if (isLoading)
    return <CircularProgress sx={{ marginTop: '64px' }} color="primary" />;

  return (
    <FormLayout text="Sign In">
      <form onSubmit={onSubmitHandler}>
        <Grid container direction="column" justifyContent="flex-start">
          <FormField
            fieldName="email"
            value={email}
            onChange={emailChangeHandler}
            error={emailHasError}
            helperText="Enter your email"
            onBlur={emailBlurHandler}
            type="email"
          />
          <FormField
            fieldName="password"
            value={password}
            onChange={passwordChangeHandler}
            error={passwordHasError}
            onBlur={passwordBlurHandler}
            helperText="Minimum 6 characters required"
            type="password"
          />
          <FormButton
            text="Log In"
            color="primary.light"
            bgcolor="primary.main"
            width={200}
          />
        </Grid>
      </form>
    </FormLayout>
  );
};

export default Signin;
