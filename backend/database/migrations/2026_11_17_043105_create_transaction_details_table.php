<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transaction_details', function (Blueprint $table) {
            $table->id('id_trans_detail');
            $table->unsignedBigInteger('id_transaction');
            $table->foreign('id_transaction')->references('id_transaction')->on('transactions')->onDelete('cascade');
            $table->unsignedBigInteger('id_pro_detail');
            $table->foreign('id_pro_detail')->references('id_pro_detail')->on('product_details')->onDelete('cascade');
            $table->integer('amount');
            $table->decimal('unit_price', 15, 2);
            $table->decimal('subtotal', 15, 2);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transaction_details');
    }
};
