<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id('id_product');
            $table->unsignedBigInteger('id_store');
            $table->foreign('id_store')->references('id_store')->on('stores')->onDelete('cascade');
            $table->unsignedBigInteger('id_cat');
            $table->foreign('id_cat')->references('id_cat')->on('categories')->onDelete('cascade');
            $table->string('product_name');
            $table->text('desc')->nullable();
            $table->string('img_url')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
