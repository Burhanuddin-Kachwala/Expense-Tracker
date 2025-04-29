import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import { getExpenses } from '../features/expenseSlice';

function Dashboard() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getExpenses());
  }, []);
  return (
    <div>Dashboard</div>
  )
}

export default Dashboard