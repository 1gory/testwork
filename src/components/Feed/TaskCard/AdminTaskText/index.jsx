import saveIcon from './save-icon.svg';
import { Form } from 'react-bootstrap';
import React, { useState } from 'react';
import styled from 'styled-components';
import { updateTaskText } from '../../../../redux/todo'
import { useDispatch } from 'react-redux';
import { unwrapResult } from '@reduxjs/toolkit';
import { logout } from '../../../../redux/auth';
import { useNavigate } from 'react-router-dom';

const Wrapper = styled.div`
  width: 100%;
  margin-right: 25px;
`;

const Icon = styled.img`
  width: 15px;
  margin-right: 8px;
  margin-bottom: 3px;
  cursor: pointer;
`;

export default ({ text, id }) => {
  const [editedText, setEditedText] = useState(text);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleChangeText = (event) => {
    setEditedText(event.target.value);
  }

  const handleClick = (id) => async () => {
    const result = await dispatch(updateTaskText({ id, text: editedText}))
    if (await unwrapResult(result) !== 200) {
      dispatch(logout());
      navigate('/login');
    }
  }

  return (
    <Wrapper className="d-flex justify-content-between">
      <Icon title="Save text" src={saveIcon} onClick={handleClick(id)}/>
      <Form.Control className="w-100" as="textarea" value={editedText} onChange={handleChangeText} />
    </Wrapper>
  );
};
