<?php

namespace App\DAOs;

use App\DTOs\CategoryDTO;
use App\Models\Category;

class CategoryDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }

    /*
     * @return Collection
     * 
     */

    public function getAll()
    {
        return Category::all();
    }

    public function create(CategoryDTO $dto): Category
    {
        return Category::create($dto->toArray());
    }

    public function update(int $id, CategoryDTO $dto): bool
    {
        $category = Category::findOrFail($id);
        return $category->update($dto->toArray());
    }
    public function delete(int $id): bool
    {
        $category = Category::findOrFail($id);
        return $category->delete();
    }
    public function findById(int $id): Category
    {
        return Category::with('products')->findOrFail($id);
    }
}
