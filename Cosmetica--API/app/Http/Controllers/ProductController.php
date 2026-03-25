<?php

namespace App\Http\Controllers;

use App\DTOs\ProductDTO;
use App\Models\Product;
use App\Http\Requests\ProductRequest;

use App\Services\ProductService;
use Exception;

class ProductController extends Controller
{
    public function __construct(
        protected ProductService $productService
    ) {}
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->productService->getAllProducts();
        return response()->json($products);
    }
    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {

        try {
            $dto = ProductDTO::fromRequest($request);
            $product = $this->productService->createProduct($dto);

            return response()->json([
                'message' => 'Product created successfully',
                'data' => $product
            ], 201);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(string $slug)
    {
        try {
            $product = $this->productService->getProductBySlug($slug);
            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json(['error' => 'this product does not exist'], 404);
        }
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $slug)
    {

        try {
            $dto = ProductDTO::fromRequest($request);
            $product = $this->productService->updateProduct($this->productService->getProductBySlug($slug)->id, $dto);

            return response()->json([
                'message' => 'Product updated successfully',
                'data' => $product
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => $e->getMessage()], 422);
        }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $slug)
    {
        $this->productService->deleteProduct($this->productService->getProductBySlug($slug)->id);
        return response()->json(['message' => 'Product deleted successfully']);
    }
}
