<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use App\Models\Feedback;
use App\Models\FeedbackComment;
use App\Models\SubComment;
use App\Models\User;
use DateTime;
use DB;

class FeedbackController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => 'getAllFeedback']);
    }

    public function getAllFeedback(Request $request) {
        $category = (int)$request->category;
        $feedbacks = Feedback::where('category', '=', $category)->get();

        if(count($feedbacks) > 0){
            foreach ($feedbacks as $key => $feedback) {
                $user = $feedback->user()->first();
                $feedback->user_name = $user->fname . ' ' . $user->lname;
                $feedback->user_role = $user->role;
                $feedback->user_avatar = $user->avatar;
                $feedback->feedback_comments = $feedback->feedbackcomments()->get();
                $feedbackComments = $feedback->feedback_comments;
                if(count($feedbackComments) > 0){
                    foreach ($feedbackComments as $key => $feedbackComment) {
                        $user = $feedbackComment->user()->first();
                        $feedbackComment->user_name = $user->fname . ' ' . $user->lname;
                        $feedbackComment->user_role = $user->role;
                        $feedbackComment->user_avatar = $user->avatar;
                        $feedbackComment->sub_comments = $feedbackComment->subcomments()->get();
                        $subComments = $feedbackComment->sub_comments;
                        if(count($subComments) > 0){
                            foreach ($subComments as $key => $subComment) {
                                $user = $subComment->user()->first();
                                $subComment->user_name = $user->fname . ' ' . $user->lname;
                                $subComment->user_role = $user->role;
                                $subComment->user_avatar = $user->avatar;
                            }
                        }
                    }
                }
            }
        }
        
        return response()->json(['result' => true, 'data' => $feedbacks]);
    }

    public function createFeedback(Request $request) {
        $startDay = Carbon::now()->startOfDay();
        $endDay   = $startDay->copy()->endOfDay();
        $feedback = Feedback::where('user_id', '=', auth()->user()->_id)->whereBetween(
             'created_at', array($startDay, $endDay)
         )->get();
        if(count($feedback) >= 3){
            return response()->json(['result' => false, 'message' => "You can't post more than 3 items."]);
        }
        $feedback = new Feedback();
        $filename = '';
        $data = array();

        $feedback->title = $request->get('title');
        $feedback->details = $request->get('details');
        $feedback->category = (int)$request->get('category');
        $feedback->comments = array();
        $feedback->votes = array();
        $feedback->user_id = auth()->user()->_id;
        $feedback->status = 1;
        if($request->file != null)
        {
            $index = 0;
            foreach($request->file as $file)
            {
                if($file->getSize() > 1000000)
                    return response()->json(['result' => false, 'message' => 'The size is greater than 1MB.']);
                $filename = "image_feedback_" . time().'_'.$index++.'.'.$file->extension();
                $file->move(public_path('uploads/files/'), $filename);
                array_push($data, $filename);
            }
        }
        $feedback->notify = 0;
        $feedback->file = $data;
        $feedback->save();
        $feedback->user_name = auth()->user()->fname . ' ' . auth()->user()->lname;
        $feedback->user_role = auth()->user()->role;
        $feedback->user_avatar = auth()->user()->avatar;
        $feedback->feedback_comments = array();
        return response()->json(['result' => true, 'data' => $feedback]);
    }

    public function deleteFeedback(Request $request) {
        $user_id = auth()->user()->_id;
        $user_role = auth()->user()->role;
        $feedback = Feedback::find($request->feedback_id);
        if($feedback == null){
            return response()->json(['result' => false, 'message' => "It isn't right post."]);
        }

        if($feedback->user_id != $user_id && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "You don't have permission."]);
        }

        $lastDate = $feedback->created_at->toDateTimeString();
        $currentDate = Carbon::now()->toDateTimeString();
        $datetime1 = \Carbon\Carbon::parse($currentDate);
        $datetime2 = \Carbon\Carbon::parse($lastDate);
        $interval = $datetime1->diffInMinutes($datetime2);

        if($interval > 15 && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "It's been 15 minutes since you posted."]);
        }

        $feedbackCommentIds = $feedback->comments;
        if(count($feedbackCommentIds) != 0){
            foreach($feedbackCommentIds as $feedbackCommentId){
                $feedbackComment = FeedbackComment::find($feedbackCommentId);
                $feedbackComment->delete();
            }
        }
        

        $subComments = SubComment::where('feedback_id', '=', $request->feedback_id)->get();
        if(count($subComments) != 0){
            foreach ($subComments as $subComment) {
                $sub_Comment = SubComment::find($subComment->_id);
                $sub_Comment->delete();
            }
        }

        $feedback->delete();
        return response()->json(['result' => true, 'message' => 'The post has been deleted.']);
    }

    public function updateFeedback(Request $request) {
        $user_id = auth()->user()->_id;
        $user_role = auth()->user()->role;

        $data = array();
        $id = $request->id;
        $feedback = Feedback::find($id);
        if($feedback == null){
            return response()->json(['result' => false, 'message' => "It isn't right post."]);
        }
        if($feedback->user_id != $user_id && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "You don't have permission."]);
        }

        $lastDate = $feedback->created_at->toDateTimeString();
        $currentDate = Carbon::now()->toDateTimeString();
        $datetime1 = \Carbon\Carbon::parse($currentDate);
        $datetime2 = \Carbon\Carbon::parse($lastDate);
        $interval = $datetime1->diffInMinutes($datetime2);

        if($interval > 15 && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "It's been 15 minutes since you posted."]);
        }

        if($request->title != null){
            $feedback->title = $request->title;
        } 
        if($request->details != null){
            $feedback->details = $request->details;
        } 
        if($request->category != null){
            $feedback->category = (int)$request->category;
        } 
        if($request->status != null){
            if((int)$user_role == 0){
                return response()->json(['result' => false, 'message' => "You are not admin."]);
            } else {
                $feedback->status = (int)$request->status;
                $feedback->notify = 0;
            }
        }
        if($request->file != null){
            $index = 0;
            foreach($request->file as $file)
            {
                if($file->getSize() > 1000000)
                    return response()->json(['result' => false, 'data' => 'The size is greater than 1MB.']);
                $filename = "image_feedback_" . time().'_'.$index++.'.'.$file->extension();
                $file->move(public_path('uploads/files/'), $filename);
                array_push($data, $filename);
            }
            $feedback->file = $data;
        }
        $feedback->save();
        $feedback->user_name = auth()->user()->fname . ' ' . auth()->user()->lname;
        $feedback->user_role = auth()->user()->role;
        $feedback->user_avatar = auth()->user()->avatar;

        return response()->json(['result' => true, 'message' => 'The post has been updated.', 'data' =>$feedback]);
    }

    public function updateFeedbackVotes(Request $request) {
        $user_id = auth()->user()->_id;

        $feedback_id = $request->feedback_id;
        $feedback = Feedback::find($feedback_id);
        if($feedback == null){
            return response()->json(['result' => false, 'message' => "It isn't right post."]);
        }
        if($feedback->user_id == $user_id){
            return response()->json(['result' => false, 'message' => 'This is the feedback you posted.']);
        }

        $arrayVotes = $feedback->votes;
        foreach ($arrayVotes as $vote) {
            if($vote == $user_id){
                return response()->json(['result' => false, 'message' => 'You have already voted it.']);
            }
        }
        array_push($arrayVotes, $user_id);

        $feedback = Feedback::where('_id', '=', $feedback_id)->update(['votes' => $arrayVotes]);
        return response()->json(['result' => true, 'message' => 'The vote is increased.']);
    }
}
