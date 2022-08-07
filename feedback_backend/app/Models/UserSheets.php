<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class UserSheets extends Eloquent
{
    use HasFactory;
    protected $fillable = [
        'tab_id', 'user_id', 'company_id', 'file_name'
    ];
}
