import React from 'react';
import styled from 'styled-components';
import { useSelector } from 'react-redux';
import AdminTaskText from './AdminTaskText';
import UserTaskText from './UserTaskText';
import UserTaskStatus from './UserTaskStatus';
import AdminTaskStatus from './AdminTaskStatus';

const Wrapper = styled.div`
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #d2d2d2;
`;

const Field = styled.div`
  width: 150px;
`;

export default function TaskCard({
  id, email, text, name, isDone, editedByAdministrator,
}) {
  const { isAuth } = useSelector((state) => state.auth);
  const TaskText = isAuth ? AdminTaskText : UserTaskText;
  const TaskStatus = isAuth ? AdminTaskStatus : UserTaskStatus;
  return (
    <Wrapper
      className="mt-1 rounded"
    >
      <div className="d-flex justify-content-between">
        <TaskText text={text} editedByAdministrator={editedByAdministrator} id={id} />
        <div className="d-inline-flex">
          <Field>
            {name}
          </Field>
          <Field>
            {email}
          </Field>
          <Field>
            <TaskStatus isDone={isDone} id={id} />
          </Field>
        </div>
      </div>
    </Wrapper>
  );
}
