import React from 'react';

export default ({ isDone }) => (
  <>
    {isDone && (
      <span className="badge bg-success">Done</span>
    )}
    {!isDone && (
      <span className="badge bg-primary">New</span>
    )}
  </>
)
