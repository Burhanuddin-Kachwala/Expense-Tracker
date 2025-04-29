<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Laravel\Sanctum\HasApiTokens;

class Expense extends Model
{
	
    protected $fillable = ['amount', 'category_id', 'description', 'date'];

    public function category()
    {
        return $this->belongsTo(Category::class);
    }
}
