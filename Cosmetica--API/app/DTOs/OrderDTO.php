<?php

namespace App\DTOs;

class OrderDTO
{
    /**
     * Create a new class instance.
     */
    public function __construct(
        public readonly int $user_id,
        public readonly array $items
    ) {
        //
    }




    /**
     * Create a new class instance from a request.
     *
     * @param \Illuminate\Http\Request $request
     * @return self
     */
    public static function fromRequest($request): self
    {
        return new self(
            user_id: auth()->user()->id,
            items: $request->validated('items')
        );
    }

    /**
     * Returns an array representation of the order.
     *
     * @return array
     */
    public function toArray(): array
    {
        return [
            'user_id' => $this->user_id,
            'items' => $this->items,
        ];
    }
}
