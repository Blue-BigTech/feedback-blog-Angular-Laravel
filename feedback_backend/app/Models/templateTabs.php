<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class templateTabs extends Eloquent
{
    use HasFactory;

    protected $fillable = [
        'status', 'user_id', 'name', 'order'
    ];
}
