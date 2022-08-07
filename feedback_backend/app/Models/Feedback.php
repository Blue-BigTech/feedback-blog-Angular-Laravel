<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class Feedback extends Eloquent
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'feedback';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'title',
        'details',
        'category',
        'comments',
        'votes',
        'user_id',
        'status',
        'notify',
        'file',
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function feedbackcomments()
    {
        return $this->hasMany(FeedbackComment::class);
    }

    public function subcomments()
    {
        return $this->hasMany(SubComment::class);
    }
}
