<?php

namespace Tests\Unit;

use App\Models\Category;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use PHPUnit\Framework\TestCase;

class ProductSlugTest extends TestCase
{
    use RefreshDatabase;
    /**
     * A basic unit test example.
     */



    /** @test */
    public function it_generates_a_slug_automatically_and_can_be_retrieved_by_it()
    {
        $category = Category::factory()->create();

        $product = Product::create([
            'name' => 'Huile d\'Argan Bio',
            'description' => 'Description test',
            'price' => 150.00,
            'stock' => 10,
            'category_id' => $category->id,
        ]);
    }
}
