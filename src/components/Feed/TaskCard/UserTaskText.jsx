import React from 'react';

export default function UserTaskText({ text, editedByAdministrator }) {
  return (
    <div>
      {text}
      {editedByAdministrator && (
      <div className="small pt-2 text-secondary">
        Edited by administrator
      </div>
      )}
    </div>
  );
}
