import React, { useState } from "react";
import DeleteButton from "./buttons/DeleteButton";
import EditButton from "./buttons/EditButton";
import EditExpenseModal from "./modals/expense/EditExpenseModal";

function ExpensesCard({ expenses }) {
  const [editingExpense, setEditingExpense] = useState(null);
  return (
    <div>
      {expenses.length === 0 ? (
        <p className="text-gray-600 text-center py-4">No expenses found.</p>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {expenses.map((expense) => (
            <div
              key={expense.id}
              className="bg-gray-50 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex justify-between items-center">
                <p className="text-lg font-semibold text-gray-800">
                  {expense.description}
                </p>
                <div>
                <DeleteButton id={expense.id} />
                <EditButton expense={expense} onEdit={setEditingExpense} />
                </div>
                
              </div>

              <p className="text-sm text-gray-600">
                Category: {expense.category.name}
              </p>
              <p className="text-sm text-gray-600">Date: {expense.date}</p>
              <p className="text-xl font-bold text-green-600 mt-2">
                ₹{expense.amount}
              </p>
            </div>
          ))}
          <EditExpenseModal
            isOpen={!!editingExpense}
            onClose={() => setEditingExpense(null)}
            expense={editingExpense}
          />
        </div>
      )}
    </div>
  );
}

export default ExpensesCard;
