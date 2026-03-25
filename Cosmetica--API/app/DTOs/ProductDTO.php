<?php

namespace App\DTOs;

class ProductDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly string $name,
        public readonly ?string $description,
        public readonly float $price,
        public readonly int $stock,
        public readonly int $category_id,
        public readonly array $images
    ) {
        //
    }

    public static function fromRequest($request): self
    {
        return new self(
            name: $request->validated('name'),
            description: $request->validated('description'),
            price: (float) $request->validated('price'),
            stock: (int) $request->validated('stock'),
            category_id: (int) $request->validated('category_id'),
            images: $request->validated('images', [])
        );
    }

    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
            'price' => $this->price,
            'stock' => $this->stock,
            'category_id' => $this->category_id,
            'images' => $this->images,
        ];
    }
}
