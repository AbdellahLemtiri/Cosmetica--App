<?php

namespace App\Http\Controllers;

use App\DTOs\CategoryDTO;
use App\Http\Requests\StoreCategoryRequest;
use App\Http\Requests\UpdateCategoryRequest;
use App\Services\CategoryService;
use Exception;

class CategoryController extends Controller
{
    public function __construct(
        protected CategoryService $categoryService
    ) {
        // 
    }
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $categories = $this->categoryService->listAllCategories();
        return response()->json($categories);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreCategoryRequest $request)
    {
        $dto = CategoryDTO::fromRequest($request);
        $category = $this->categoryService->storeCategory($dto);

        return response()->json([
            'message' => 'Category created successfully',
            'data' => $category
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(int $id)
    {
        $category = $this->categoryService->getCategoryDetails($id);
        return response()->json($category);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateCategoryRequest $request, int $id)
    {
        $dto = CategoryDTO::fromRequest($request);
        $this->categoryService->updateCategory($id, $dto);

        return response()->json([
            'message' => 'Category updated successfully'
        ]);
    }
    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        try {
            $this->categoryService->deleteCategory($id);
            return response()->json(['message' => 'Category deleted successfully']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 400);
        }
    }
}
