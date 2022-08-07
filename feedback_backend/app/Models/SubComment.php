<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;

use Jenssegers\Mongodb\Eloquent\Model as Eloquent;

class SubComment extends Eloquent
{
    use HasFactory;

    protected $connection = 'mongodb';
    protected $collection = 'sub_comments';

    protected $fillable = [
        'user_id',
        'feedback_id',
        'comment_id',
        'content',
        'file'
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function feedback()
    {
        return $this->belongsTo(Feedback::class);
    }

    public function feedbackcomment()
    {
        return $this->belongsTo(FeedbackComment::class);
    }
}
