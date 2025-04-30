import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getExpenses } from '../features/expenseSlice';
import ExpensePieChart from './ExpensePieChart';
import ExpensesCard from './ExpensesCard';
import AddExpenseModal from './modals/expense/AddExpenseModal';

function Dashboard() {
  const dispatch = useDispatch();
  const { expenses, isloading, error } = useSelector((state) => state.expense);
  const [showModal, setShowModal] = useState(false);
  useEffect(() => {
    dispatch(getExpenses());
  }, [dispatch]);

  if (isloading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-3 p-3 max-w-auto mx-auto bg-white rounded-lg shadow-lg">
     
        <h2 className="text-2xl font-bold text-gray-800">Dashboard</h2>
       
      
      <div className="flex gap-4">
        <div className="w-1/3 p-2">
          <ExpensePieChart expenses={expenses} />
        </div>

        {/* Right side - Expenses (2/3 width) */}
        <div className="w-2/3">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold">Expenses</h3>
            <button 
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-colors" 
            onClick={() => setShowModal(true)}       
            >
               Add Expense
            </button>
            <AddExpenseModal isOpen={showModal} onClose={() => setShowModal(false)} />
          </div>
          <ExpensesCard expenses={expenses}/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
