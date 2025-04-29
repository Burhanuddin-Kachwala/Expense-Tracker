<?php
namespace App\Http\Controllers\API;
use App\Http\Controllers\Controller;
use App\Models\Expense;
use App\Helpers\ApiResponse;
use App\Http\Resources\ExpenseResource;
use App\Http\Requests\StoreExpenseRequest;
use App\Http\Requests\UpdateExpenseRequest;
use Exception;

class ExpenseController extends Controller
{
    public function index()
    {
        try {
            $expenses = Expense::with('category')->get();
            return ApiResponse::success(ExpenseResource::collection($expenses), "Expense list fetched successfully.");
        } catch (Exception $e) {
            return ApiResponse::error("Failed to fetch expenses: " . $e->getMessage());
        }
    }

    public function store(StoreExpenseRequest $request)
    {
        try {
            $expense = Expense::create($request->validated());
            return ApiResponse::success(new ExpenseResource($expense->load('category')), "Expense added successfully.");
        } catch (Exception $e) {
            return ApiResponse::error("Failed to create expense: " . $e->getMessage());
        }
    }

    public function show(Expense $expense)
    {
        try {
            return ApiResponse::success(new ExpenseResource($expense->load('category')), "Expense details fetched.");
        } catch (Exception $e) {
            return ApiResponse::error("Failed to fetch expense details: " . $e->getMessage());
        }
    }

    public function update(UpdateExpenseRequest $request, Expense $expense)
    {
        try {
            $expense->update($request->validated());
            return ApiResponse::success(new ExpenseResource($expense->load('category')), "Expense updated successfully.");
        } catch (Exception $e) {
            return ApiResponse::error("Failed to update expense: " . $e->getMessage());
        }
    }

    public function destroy(Expense $expense)
    {
        try {
            $expense->delete();
            return ApiResponse::success([], "Expense deleted successfully.");
        } catch (Exception $e) {
            return ApiResponse::error("Failed to delete expense: " . $e->getMessage());
        }
    }
}
