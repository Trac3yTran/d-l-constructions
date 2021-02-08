import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import {
  UserLabel,
  UserParagraph,
  UserInput,
  UserButton,
  UserPanel,
} from './Styled';
import { signUp } from '../../axios/authServices';
import { useGlobalState } from '../../utils/stateContext';
// import { Button, Panel } from "./Styled";

// new user registration page

export default function NewUser() {
  const initialFormState = {
    username: '',
    email: '',
    password: '',
    password_confirmation: '',
  };

  const [formState, setFormState] = useState(initialFormState);
  const { dispatch } = useGlobalState();
  const isEnabled =
    formState.username.length > 0 &&
    formState.email.length > 0 &&
    formState.password.length > 0;

  let history = useHistory();

  function handleChange(e) {
    setFormState({
      ...formState,
      [e.target.name]: e.target.value,
    });
    console.log(formState);
  }

  function handleRegister(e) {
    e.preventDefault();
    signUp(formState)
      .then((data) => {
        sessionStorage.setItem('token', data.jwt);
        sessionStorage.setItem('user', data.username);
        dispatch({ type: 'setLoggedInUser', data: data.username });
        history.push('/portal');
      })
      .catch((err) => {
        setFormState({ errorMessage: err.message });
      });
  }
  return (
    <>
      <UserPanel className='formContainer'>
        <h3>Employee Registration Form</h3>
        <UserParagraph>
          Please complete this form to create an account.
        </UserParagraph>
        <UserLabel>Username:</UserLabel>
        <UserInput
          type='text'
          name='username'
          value={formState.username}
          onChange={handleChange}
          placeholder='Create a username'
        ></UserInput>
        <br />
        <UserLabel>Email:</UserLabel>
        <UserInput
          type='email'
          name='email'
          value={formState.email}
          onChange={handleChange}
          placeholder='Enter your email'
        ></UserInput>
        <br />
        <UserLabel>Password:</UserLabel>
        <UserInput
          type='password'
          name='password'
          value={formState.password}
          onChange={handleChange}
          placeholder='Enter password'
        ></UserInput>
        <br />
        <UserLabel>Password Confirmation:</UserLabel>
        <UserInput
          type='password'
          name='password_confirmation'
          value={formState.password_confirmation}
          onChange={handleChange}
          placeholder='Confirm your password'
        ></UserInput>
        <br />
        <UserButton onClick={handleRegister}>Register</UserButton>
        <UserButton onClick={() => history.push(`/portal`)}>Back</UserButton>
      </UserPanel>
    </>
  );
}
