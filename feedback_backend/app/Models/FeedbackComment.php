<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class FeedbackComment extends Eloquent
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'feedback_comments';

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'comment',
        'user_id',
        'feedback_id',
        'notify',
        'file',
        'created_at',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }

    public function subcomments()
    {
        return $this->hasMany(SubComment::class, 'comment_id');
    }
}
