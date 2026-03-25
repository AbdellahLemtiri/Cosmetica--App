<?php

namespace App\Http\Controllers;

use App\Models\Image;
use App\Http\Requests\StoreImageRequest;
use App\Http\Requests\UpdateImageRequest;
use App\Models\Product;

class ImageController extends Controller
{

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreImageRequest $request)
    {
        $data = $request->validated();
        if (Product::findOrFail($data['product_id'])->images()->count() + count($data['images']) > 4) {
            return response()->json(['message' => 'You can upload a maximum of 4 images per product.'], 422);
        }
        if ($request->hasFile('images')) {
            foreach ($request->file('images') as $imageFile) {
                $path = $imageFile->store('products', 'public');

                Image::create([
                    'url' => $path,
                    'product_id' => $data['product_id'],
                ]);
            }
        }

        return response()->json(['message' => 'Images uploaded .'], 201);
    }


    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateImageRequest $request, Image $image)
    {
        $data = $request->validated();
        $path = $data['image']->store('products', 'public');
        $image->update(['url' => $path]);
        return response()->json($image, 200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Image $image)
    {
        $image->delete();
        return response()->json(null, 204);
    }
}
