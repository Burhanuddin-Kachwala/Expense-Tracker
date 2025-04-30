import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { editExpense } from '../../../features/expenseSlice';

function EditExpenseModal({ isOpen, onClose, expense }) {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({    
    amount: '',
    description: '',
    date: '',
    category_id: '',
  });

  useEffect(() => {
    if (expense) {
      setFormData({        
        amount: expense.amount,
        description: expense.description,
        date: expense.date,
        category_id: expense.category_id || (expense.category?.id ?? ''),
      });
    }
  }, [expense]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(editExpense({ id: expense.id, ...formData }));
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-10 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Edit Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">        
          <input
            type="number"
            name="amount"
            placeholder="Amount"
            value={formData.amount}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="text"
            name="description"
            placeholder="Description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <input
            type="number"
            name="category_id"
            placeholder="Category ID"
            value={formData.category_id}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
          <div className="flex justify-end space-x-2">
            <button type="button" onClick={onClose} className="px-4 py-2 bg-gray-400 text-white rounded">
              Cancel
            </button>
            <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditExpenseModal;
