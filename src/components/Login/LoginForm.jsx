import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert, Form } from 'react-bootstrap';
import Button from 'react-bootstrap/Button';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { login } from '../../redux/auth';

export default function LoginForm() {
  const [errorMessage, setErrorMessage] = useState();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [form, setForm] = useState({
    password: '',
    name: '',
  });

  const validateForm = () => {
    if (!form.password.trim().length || !form.name.trim().length) {
      setErrorMessage('All fields are required');
      return false;
    }

    return true;
  };

  const submitHandler = async (event) => {
    event.preventDefault();
    setErrorMessage(null);
    if (validateForm()) {
      const result = await dispatch(login(form));
      const response = await unwrapResult(result);
      if (response.status !== 200) {
        setErrorMessage(response.response.message);
        return;
      }

      navigate('/');
    }
  };

  const changeHandler = (event) => {
    setForm((prev) => ({
      ...prev,
      [event.target.name]: event.target.value,
    }));
  };

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" onClose={() => setErrorMessage(null)} dismissible>
          {errorMessage}
        </Alert>
      )}

      <Form onSubmit={submitHandler}>
        <Form.Group className="pt-2 pb-2">
          <Form.Control name="name" type="text" placeholder="name" onChange={changeHandler} />
        </Form.Group>

        <Form.Group className="pt-2 pb-2">
          <Form.Control name="password" type="password" placeholder="Password" onChange={changeHandler} />
        </Form.Group>

        <Button variant="primary" type="submit" className="mt-2">
          Submit
        </Button>
      </Form>
    </>
  );
}
