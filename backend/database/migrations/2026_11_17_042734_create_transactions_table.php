<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('transactions', function (Blueprint $table) {
            $table->id('id_transaction');
            $table->unsignedBigInteger('id_store');
            $table->foreign('id_store')->references('id_store')->on('stores')->onDelete('cascade');
            $table->unsignedBigInteger('id_employee')->nullable();
            $table->foreign('id_employee')->references('id_employee')->on('employees')->onDelete('set null');
            $table->dateTime('transaction_date');
            $table->decimal('total_price', 15, 2);
            $table->string('payment_method');
            $table->string('status')->default('Complete');
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
