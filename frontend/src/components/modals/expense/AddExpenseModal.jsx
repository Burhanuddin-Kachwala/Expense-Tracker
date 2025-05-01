// AddExpenseModal.jsx
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addExpense } from '../../../features/expenseSlice';

export default function AddExpenseModal({ isOpen, onClose }) {
  const dispatch = useDispatch();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('');
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      id: Date.now(),
      description,
      amount: parseFloat(amount),
      category_id: parseInt(category),
      date,
    };
    dispatch(addExpense(newExpense));
    onClose(); // close modal after adding
    setDescription('');
    setAmount('');
    setCategory('');
    setDate('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Expense Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <input
            type="text"
            placeholder="Category (e.g., Food)"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border border-gray-300 rounded p-2"
            required
          />
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 px-4 py-2 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
