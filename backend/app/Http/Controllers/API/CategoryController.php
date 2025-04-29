<?php
namespace App\Http\Controllers\API;
use App\Models\Category;
use App\Helpers\ApiResponse;
use App\Http\Controllers\Controller;
use App\Http\Resources\CategoryResource;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use Exception;

class CategoryController extends Controller
{
    public function index()
    {
        try {
            $categories = Category::all();
            return ApiResponse::success(
                CategoryResource::collection($categories), 
                "Category list fetched successfully."
            );
        } catch (Exception $e) {
            return ApiResponse::error(
                "Failed to fetch categories.",
                $e->getMessage()
            );
        }
    }

    public function store(StoreCategoryRequest $request)
    {
        try {
            $category = Category::create($request->validated());
            return ApiResponse::success(
                new CategoryResource($category), 
                "Category created successfully."
            );
        } catch (Exception $e) {
            return ApiResponse::error(
                "Failed to create category.",
                $e->getMessage()
            );
        }
    }

    public function show(Category $category)
    {
        try {
            return ApiResponse::success(
                new CategoryResource($category), 
                "Category details fetched."
            );
        } catch (Exception $e) {
            return ApiResponse::error(
                "Failed to fetch category details.",
                $e->getMessage()
            );
        }
    }

    public function update(UpdateCategoryRequest $request, Category $category)
    {
        try {
            $category->update($request->validated());
            return ApiResponse::success(
                new CategoryResource($category), 
                "Category updated successfully."
            );
        } catch (Exception $e) {
            return ApiResponse::error(
                "Failed to update category.",
                $e->getMessage()
            );
        }
    }

    public function destroy(Category $category)
    {
        try {
            $category->delete();
            return ApiResponse::success(
                [], "Category deleted successfully."
            );
        } catch (Exception $e) {
            return ApiResponse::error(
                "Failed to delete category.",
                $e->getMessage()
            );
        }
    }
}
