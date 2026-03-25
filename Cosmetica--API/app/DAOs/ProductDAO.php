<?php

namespace App\DAOs;

use App\DTOs\ProductDTO;
use App\Models\Product;
use Illuminate\Support\Facades\DB;

class ProductDAO
{
    /**
     * Create a new class instance.
     */
    public function __construct()
    {
        //
    }
    public function getAll()
    {
        return Product::with(['category', 'images'])->get();
    }

    public function create(ProductDTO $dto): Product
    {
        return DB::transaction(function () use ($dto) {
            $product = Product::create([
                'name' => $dto->name,
                'description' => $dto->description,
                'price' => $dto->price,
                'stock' => $dto->stock,
                'category_id' => $dto->category_id,
            ]);

            if (!empty($dto->images)) {
                foreach ($dto->images as $url) {
                    $product->images()->create(['url' => $url]);
                }
            }

            return $product->load('images');
        });
    }

    public function update(int $id, ProductDTO $dto): Product
    {
        return DB::transaction(function () use ($id, $dto) {
            $product = Product::findOrFail($id);

            $product->update([
                'name' => $dto->name,
                'description' => $dto->description,
                'price' => $dto->price,
                'stock' => $dto->stock,
                'category_id' => $dto->category_id,
            ]);

            if (!empty($dto->images)) {
                $product->images()->delete();
                foreach ($dto->images as $url) {
                    $product->images()->create(['url' => $url]);
                }
            }

            return $product->load('images');
        });
    }
    /**
     * Find a product by slug.
     *
     * @param string $slug
     * @return Product
     *
     */
    public function findBySlug(string $slug): Product
    {
        return Product::with(['category', 'images'])
            ->where('slug', $slug)
            ->firstOrFail();
    }

    public function delete(int $id): bool
    {
        return Product::findOrFail($id)->delete();
    }
}
