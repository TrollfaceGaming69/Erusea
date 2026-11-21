<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('product_details', function (Blueprint $table) {
            $table->id('id_pro_detail');
            $table->unsignedBigInteger('id_product');
            $table->foreign('id_product')->references('id_product')->on('products')->onDelete('cascade');
            $table->decimal('price', 15, 2);
            $table->integer('stock')->default(0);
            $table->string('measurement_unit', 50);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('product_details');
    }
};
