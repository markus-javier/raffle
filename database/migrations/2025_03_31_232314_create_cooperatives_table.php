<?php
// database/migrations/xxxx_xx_xx_create_cooperatives_table.php
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up()
    {
        Schema::create('cooperatives', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name');
            $table->string('slug')->unique();
            $table->text('description')->nullable();
            $table->string('logo')->nullable();
            $table->string('primary_color')->default('#6366F1');
            $table->string('secondary_color')->default('#4F46E5');
            $table->timestamps();
        });
    }

    public function down()
    {
        Schema::dropIfExists('cooperatives');
    }
};
