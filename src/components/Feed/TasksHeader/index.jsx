import React from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import { changeSorting, fetchTasks } from '../../../redux/todo';
import SortingIcon from './SortingIcon';

const Wrapper = styled.div`
  padding: 10px;
`;

const Field = styled.div`
  width: 150px;
  cursor: pointer;
`;

export default function TasksHeader() {
  const { sorting } = useSelector((state) => state.todo);
  const { name: nameSorting, email: emailSorting, isDone: statusSorting } = sorting;
  const dispatch = useDispatch();
  const handleClick = (sortingName) => () => {
    dispatch(changeSorting(sortingName));
    dispatch(fetchTasks());
  };
  return (
    <Wrapper
      className="mt-1 rounded"
    >
      <div className="d-flex justify-content-end">
        <div className="d-inline-flex">
          <Field onClick={handleClick('name')}>
            <SortingIcon sorting={nameSorting} />
            Name
          </Field>

          <Field onClick={handleClick('email')}>
            <SortingIcon sorting={emailSorting} />
            Email
          </Field>

          <Field onClick={handleClick('isDone')}>
            <SortingIcon sorting={statusSorting} />
            Status
          </Field>
        </div>
      </div>
    </Wrapper>
  );
}
