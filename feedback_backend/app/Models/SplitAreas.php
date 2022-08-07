<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class SplitAreas extends Eloquent
{
    use HasFactory;
    protected $fillable = [
        'status', 'tab_id', 'user_id', 'columns'
    ];
}
