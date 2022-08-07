<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use App\Models\Feedback;
use App\Models\FeedbackComment;
use App\Models\User;
use DB;

class NotifyController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function getNotify(Request $request){
        $user_id = $request->user_id;
        $arrNotifyList = new \stdClass();
        $arrNotifyList->feedbacks = array();
        $arrNotifyList->feedbackcomments = array();

        $feedbacks = Feedback::where('user_id', '=', $user_id)->where('notify', '=', 0)->where('status', '!=', 1)->get();

        $arrFeedbackIds = array();
        foreach ($feedbacks as $feedback) {
            array_push($arrFeedbackIds, $feedback->_id);
        }

        if(count($arrFeedbackIds) != 0){
            $feedbackcomments = FeedbackComment::whereIn('feedback_id', $arrFeedbackIds)->where('notify', '=', 0)->get();
        } else {
            $feedbackcomments = FeedbackComment::where('user_id', $user_id)->where('notify', '=', 0)->get();
        }

        if(count($feedbackcomments) > 0){
            foreach ($feedbackcomments as $key => $feedbackComment) {
                $user = $feedbackComment->user()->first();
                $feedbackComment->user_name = $user->fname . ' ' . $user->lname;
                $feedbackComment->user_role = $user->role;
                $feedbackComment->user_avatar = $user->avatar;
            }
        }

        $arrNotifyList->feedbacks = $feedbacks;
        $arrNotifyList->feedbackcomments = $feedbackcomments;

        return response()->json(['result' => true, 'data' => $arrNotifyList]);
    }

    public function checkNotify(Request $request){
        $user_id = auth()->user()->_id;
        $feedback_ids = $request->feedback_ids;
        $feedbackcomment_ids = $request->feedbackcomment_ids;

        if($feedback_ids != null){
            if(count($feedback_ids) != 0){
                foreach ($feedback_ids as $feedback_id) {
                    $feedback = Feedback::where('_id', '=', $feedback_id)->update(['notify' => 1]);
                    if($feedback == 0){
                        return response()->json(['result' => false]);
                    }
                }
            }
        }

        if($feedbackcomment_ids != null){
            if(count($feedbackcomment_ids) != 0){
                foreach ($feedbackcomment_ids as $feedbackcomment_id) {
                    $feedbackcomment = FeedbackComment::where('_id', '=', $feedbackcomment_id)->update(['notify' => 1]);
                    if($feedbackcomment == 0){
                        return response()->json(['result' => false]);
                    }
                }
            }
        }
        
        return response()->json(['result' => true]);
    }

}
