<?php

namespace App\DTOs;

class CategoryDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly string $name,
        public readonly ?string $description
    ) {
        //
    }

    /**
     * Undocumented function
     *
     * @param [type] $request
     * @return self
     */
    public static function fromRequest($request): self
    {
        return new self(
            name: $request->validated('name'),
            description: $request->validated('description')
        );
    }

    /**
     * Undocumented function
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'name' => $this->name,
            'description' => $this->description,
        ];
    }
}
