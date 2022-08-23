import React from 'react';

export default ({text, editedByAdministrator}) => (
  <div>
    {text}
    {editedByAdministrator && (
      <div className="small pt-2 text-secondary">
        Edited by administrator
      </div>
    )}
  </div>
);
