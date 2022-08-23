import React, { useState } from 'react';
import { Form } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { changeTaskStatus } from '../../../redux/todo';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../../redux/auth';

export default ({ isDone, id }) => {
  const [checked, setChecked] = useState(isDone );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = async (event) => {
    setChecked(event.target.checked);
    const isDone = event.target.checked;
    const result = await dispatch(changeTaskStatus({ id, isDone }));
    if (await unwrapResult(result) !== 200) {
      dispatch(logout());
      navigate('/login');
    }
  };

  return (
    <Form.Check type="checkbox" checked={checked} onChange={handleChange}/>
  );
}
