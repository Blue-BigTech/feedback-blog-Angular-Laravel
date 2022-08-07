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

class SubCommentController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    public function createSubComment(Request $request) {
        $user_id = auth()->user()->_id;
        $user_role = auth()->user()->role;

        $startDay = Carbon::now()->startOfDay();
        $endDay   = $startDay->copy()->endOfDay();
        $subComment = SubComment::where('user_id', '=', $user_id)->where('comment_id', '=', $request->comment_id)->whereBetween(
             'created_at', array($startDay, $endDay)
         )->get();
        if(count($subComment) >= 3){
            return response()->json(['result' => false, 'message' => "You can't post more than 3 items."]);
        }

        $filename = '';
        $data = array();

        $feedback = Feedback::find($request->feedback_id);
        if($feedback == null){
            return response()->json(['result' => false, 'message' => "The post don't exist."]);
        }
        $feedbackComment = FeedbackComment::find($request->comment_id);
        if($feedbackComment == null){
            return response()->json(['result' => false, 'message' => "The post don't exist."]);
        }

        $subComment = new SubComment();
        $subComment->user_id = $user_id;
        $subComment->feedback_id = $request->get('feedback_id');
        $subComment->comment_id = $request->get('comment_id');
        $subComment->content = $request->get('content');
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
        $subComment->file = $data;
        $subComment->save();
        $subComment->user_name = auth()->user()->fname . ' ' . auth()->user()->lname;
        $subComment->user_role = auth()->user()->role;
        $subComment->user_avatar = auth()->user()->avatar;
        
        return response()->json(['result' => true, 'data' => $subComment]);
    }

    public function deleteSubComment(Request $request) {
        $user_id = auth()->user()->_id;
        $user_role = auth()->user()->role;
        $subcomment_id = $request->subcomment_id;
        $subComment = SubComment::find($subcomment_id);
        if($subComment == null){
            return response()->json(['result' => false, 'message' => "The post don't exist."]);
        }
        if($subComment->user_id != $user_id && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "You don't have permission."]);
        }

        $lastDate = $subComment->created_at->toDateTimeString();
        $currentDate = Carbon::now()->toDateTimeString();
        $datetime1 = \Carbon\Carbon::parse($currentDate);
        $datetime2 = \Carbon\Carbon::parse($lastDate);
        $interval = $datetime1->diffInMinutes($datetime2);

        if($interval > 15 && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "It's been 15 minutes since you posted."]);
        }

        $subComment->delete();

        return response()->json(['result' => true, 'message' => 'The post has been deleted.']);
    }

    public function updateSubComment(Request $request) {
        $user_id = auth()->user()->_id;
        $user_role = auth()->user()->role;

        $data = array();
        $id = $request->id;
        $subComment = SubComment::find($id);
        if($subComment == null){
            return response()->json(['result' => false, 'message' => "The post don't exist."]);
        }
        if($subComment->user_id != $user_id && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "You don't have permission."]);
        }

        $lastDate = $subComment->created_at->toDateTimeString();
        $currentDate = Carbon::now()->toDateTimeString();
        $datetime1 = \Carbon\Carbon::parse($currentDate);
        $datetime2 = \Carbon\Carbon::parse($lastDate);
        $interval = $datetime1->diffInMinutes($datetime2);

        if($interval > 15 && (int)$user_role == 0){
            return response()->json(['result' => false, 'message' => "It's been 15 minutes since you posted."]);
        }

        if($request->content != null){
            $subComment->content = $request->content;
        } 
        if($request->file != null){
            $index = 0;
            foreach($request->file as $file)
            {
                if($file->getSize() > 1000000)
                    return response()->json(['result' => false, 'data' => 'The size is greater than 1MB.']);
                $filename = "image_sub_" . time().'_'.$index++.'.'.$file->extension();
                $file->move(public_path('uploads/files/'), $filename);
                array_push($data, $filename);
            }
            $subComment->file = $data;
        }
        $subComment->save();
        $subComment->user_name = auth()->user()->fname . ' ' . auth()->user()->lname;
        $subComment->user_role = $user_role;
        $subComment->user_avatar = auth()->user()->avatar;

        return response()->json(['result' => true, 'message' => 'The post has been updated.', 'data' =>$subComment]);
    }
}
