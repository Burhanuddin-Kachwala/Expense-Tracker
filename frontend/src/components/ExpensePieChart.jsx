// src/components/ExpensePieChart.jsx
import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

function ExpensePieChart({ expenses }) {
  const categoryTotals = {};

  // Group and total expenses by category
  expenses.forEach(exp => {
    const category = exp.category.name;
    const amount = parseFloat(exp.amount); 
  
    if (!isNaN(amount)) {
      categoryTotals[category] = (categoryTotals[category] || 0) + amount;
    }
  });
  
  const COLORS = [
    '#4CAF50', '#FF6384', '#36A2EB', '#FFCE56',
    '#A569BD', '#F39C12', '#2ECC71', '#1ABC9C'
  ];
  
  const data = {
    labels: Object.keys(categoryTotals),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categoryTotals),
        backgroundColor: Object.keys(categoryTotals).map((_, index) => COLORS[index % COLORS.length]),
        borderWidth: 1
      }
    ]
  };
  
  const options = {
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          color: '#000' // black text on white background
        }
      }
    }
    
  };

  
  return (
    <div className="w-full  mx-auto p-4 bg-gray-100 rounded shadow">
    <h3 className="text-lg font-semibold mb-2 text-center">Expenses by Category</h3>
    <Pie data={data} options={options} />
    {/* <Bar data={data} /> */}
  </div>
  );
}

export default ExpensePieChart;
