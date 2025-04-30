import React from 'react';
import { MdEdit } from 'react-icons/md';

function EditButton({ expense, onEdit }) {
  return (
    <button
      onClick={() => onEdit(expense)}
      className="text-blue-500 hover:text-blue-700"
      title="Edit"
    >
      <MdEdit size={20} />
    </button>
  );
}

export default EditButton;
