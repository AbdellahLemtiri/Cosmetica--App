<?php

namespace App\Services;

use App\DAOs\CategoryDAO;
use App\DTOs\CategoryDTO;
use Exception;

class CategoryService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected CategoryDAO $categoryDAO)
    {
        // 
    }

    public function listAllCategories()
    {
        return $this->categoryDAO->getAll();
    }

    public function storeCategory(CategoryDTO $dto)
    {
        return $this->categoryDAO->create($dto);
    }

    public function getCategoryDetails(int $id)
    {
        return $this->categoryDAO->findById($id);
    }

    public function updateCategory(int $id, CategoryDTO $dto): bool
    {
        return $this->categoryDAO->update($id, $dto);
    }

    public function deleteCategory(int $id): bool
    {
        $category = $this->categoryDAO->findById($id);

        if ($category->products()->count() > 0) {
            throw new Exception('Category has associated products');
        }

        return $this->categoryDAO->delete($id);
    }
}
