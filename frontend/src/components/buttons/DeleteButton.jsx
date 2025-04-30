import React from 'react';
import { useDispatch } from 'react-redux';
import { removeExpense } from '../../features/expenseSlice';
//import axios from 'axios';
import { MdDelete } from "react-icons/md";

function DeleteButton({ id }) {
    const dispatch = useDispatch();
  
    const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this expense?')) {
      try {       
        dispatch(removeExpense(id));
      } catch (err) {
        console.error('Error deleting expense:', err);
      }
    }
    };
  
    return (
      <button
        onClick={handleDelete}
        className="px-3 py-1  text-red-800 rounded hover:text-red-600"
      >
        <MdDelete/>
      </button>
    );
  }
  

  
export default DeleteButton