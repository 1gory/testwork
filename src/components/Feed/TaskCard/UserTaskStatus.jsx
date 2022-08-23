import React from 'react';

export default function UserTaskStatus({ isDone }) {
  return (
    <>
      {isDone && (
      <span className="badge bg-success">Done</span>
      )}
      {!isDone && (
      <span className="badge bg-primary">New</span>
      )}
    </>
  );
}
