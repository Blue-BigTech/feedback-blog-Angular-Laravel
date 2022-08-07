<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Carbon;
use App\Models\Feedback;
use App\Models\FeedbackComment;
use App\Models\SubComment;
use App\Models\User;
use DB;

class FeedbackCommentController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => 'getSelectedFeedbackCommnet']);
    }

    public function getSelectedFeedbackCommnet(Request $request) {
        $feedback_id = $request->feedback_id;

        $feedback = Feedback::find($feedback_id);
        if($feedback == null){
            return response()->json(['result' => false, 'message' => "The post don't exist."]);
        }

        $feedbackcomments = FeedbackComment::where('feedback_id', '=', $feedback_id)->get();

        if(count($feedbackcomments) > 0){
            foreach ($feedbackcomments as $key => $feedbackComment) {
                $user = $feedbackComment->user()->first();
                $feedbackComment->user_name = $user->fname . ' ' . $user->lname;
            }
        }

        return response()->json(['result' => true, 'data' => $feedbackcomments]);
    }

    public function createFeedbackComment(Request $request) {
        $user_id = auth()->user()->_id;
        $user_role = auth()->user()->role;
        $feedback_id = $request->get('feedback_id');

        $startDay = Carbon::now()->startOfDay();
        $endDay   = $startDay->copy()->endOfDay();
        $feedbackComment = FeedbackComment::where('user_id', '=', $user_id)->where('feedback_id', '=', $feedback_id)->whereBetween(
             'created_at', array($startDay, $endDay)
         )->get();
        if(count($feedbackComment) >= 3){
            return response()->json(['result' => false, 'message' => "You can't post more than 3 items."]);
        }

        $filename = '';
        $data = array();

        $feedback = Feedback::find($feedback_id);
        if($feedback == null){
            return response()->json(['result' => false, 'message' => "The post don't exist."]);
        }

        $feedbackComment = new FeedbackComment();
        $feedbackComment->comment = $request->get('comment');
        $feedbackComment->user_id = $user_id;
        $feedbackComment->feedback_id = $feedback_id;
        $feedbackComment->notify = 0;
        if($request->file != null)
        {
            $index = 0;
            foreach($request->file as $file)
            {
                if($file->getSize() > 1000000)
                    return response()->json(['result' => false, 'data' => 'The size is greater than 1MB.']);
                $filename = "image_comment_" . time().'_'.$index++.'.'.$file->extension();
                $file->move(public_path('uploads/files/'), $filename);
                array_push($data, $filename);
            }
        }
        $feedbackComment->file = $data;
        $feedbackComment->save();
        $feedbackComment->sub_comments = array();
        $feedbackComment->user_name = auth()->user()->fname . ' ' . auth()->user()->lname;
        $feedbackComment->user_role = auth()->user()->role;
        $feedbackComment->user_avatar = auth()->user()->avatar;
        
        $arryComments = $feedback->comments;
        array_push($arryComments, $feedbackComment->_id);
        $feedback = Feedback::where('_id', '=', $feedbackComment->feedback_id)->update(['comments' => $arryComments]);

        return response()->json(['result' => true, 'data' => $feedbackComment]);
    }

    public function deleteFeedbackComment(Request $request) {
        $user_id = auth()->user()->_id;
        $user_role = auth()->user()->role;
        $comment_id = $request->comment_id;
        $feedbackComment = FeedbackComment::find($comment_id);
        if($feedbackComment == null){
            return response()->json(['result' => false, 'message' => "The post don't exist."]);
        }
        if($feedbackComment->user_id != $user_id && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "You don't have permission."]);
        }

        $lastDate = $feedbackComment->created_at->toDateTimeString();
        $currentDate = Carbon::now()->toDateTimeString();
        $datetime1 = \Carbon\Carbon::parse($currentDate);
        $datetime2 = \Carbon\Carbon::parse($lastDate);
        $interval = $datetime1->diffInMinutes($datetime2);

        if($interval > 15 && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "It's been 15 minutes since you posted."]);
        }

        $feedback = Feedback::where('_id', '=', $feedbackComment->feedback_id)->get()->first();

        $arrayComments = array();
        foreach ($feedback->comments as $comment) {
            if($comment == $comment_id) continue;
            array_push($arrayComments, $comment);
        }

        $subComments = SubComment::where('comment_id', '=', $comment_id)->get();
        if(count($subComments) != 0){
            foreach ($subComments as $subComment) {
                $sub_Comment = SubComment::find($subComment->_id);
                $sub_Comment->delete();
            }
        }

        $feedbackComment->delete();
        $feedback = Feedback::where('_id', '=', $feedbackComment->feedback_id)->update(['comments' => $arrayComments]);

        return response()->json(['result' => true, 'message' => 'The post has been deleted.']);
    }

    public function updateFeedbackComment(Request $request) {
        $user_id = auth()->user()->_id;
        $user_role = auth()->user()->role;

        $data = array();
        $id = $request->id;
        $feedbackComment = FeedbackComment::find($id);
        if($feedbackComment == null){
            return response()->json(['result' => false, 'message' => "The post don't exist."]);
        }
        if($feedbackComment->user_id != $user_id && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "You don't have permission."]);
        }

        $lastDate = $feedbackComment->created_at->toDateTimeString();
        $currentDate = Carbon::now()->toDateTimeString();
        $datetime1 = \Carbon\Carbon::parse($currentDate);
        $datetime2 = \Carbon\Carbon::parse($lastDate);
        $interval = $datetime1->diffInMinutes($datetime2);

        if($interval > 15 && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "It's been 15 minutes since you posted."]);
        }

        if($request->comment != null){
            $feedbackComment->comment = $request->comment;
        } 
        if($request->file != null){
            $index = 0;
            foreach($request->file as $file)
            {
                if($file->getSize() > 1000000)
                    return response()->json(['result' => false, 'data' => 'The size is greater than 1MB.']);
                $filename = "image_feedbackcomment_" . time().'_'.$index++.'.'.$file->extension();
                $file->move(public_path('uploads/files/'), $filename);
                array_push($data, $filename);
            }
            $feedbackComment->file = $data;
        }
        $feedbackComment->save();
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
        $feedbackComment->user_name = auth()->user()->fname . ' ' . auth()->user()->lname;
        $feedbackComment->user_role = $user_role;
        $feedbackComment->user_avatar = auth()->user()->avatar;

        return response()->json(['result' => true, 'message' => 'The post has been updated.', 'data' =>$feedbackComment]);
    }
}
