<?php

namespace App\Services;

use App\DAOs\ProductDAO;
use App\DTOs\ProductDTO;
use Exception;

class ProductService
{
    /**
     * Create a new class instance.
     */
    public function __construct(protected ProductDAO $productDAO)
    {
        //
    }

    /**
     * get all products
     */
    public function getAllProducts()
    {
        return $this->productDAO->getAll();
    }

    /**
     * get product by slug
     */
    public function getProductBySlug(string $slug)
    {
        return $this->productDAO->findBySlug($slug);
    }

    /**
     * create new product
     */
    public function createProduct(ProductDTO $dto)
    {
        if (count($dto->images) > 4) {
            throw new Exception("should not be more than 4 images");
        }

        return $this->productDAO->create($dto);
    }

    /**
     * update product
     */
    public function updateProduct(int $id, ProductDTO $dto)
    {
        if (count($dto->images) > 4) {
            throw new Exception("should not be more than 4 images");
        }

        return $this->productDAO->update($id, $dto);
    }

    /**
     * delete product
     */
    public function deleteProduct(int $id): bool
    {
        return $this->productDAO->delete($id);
    }
}
