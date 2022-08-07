<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use DB;
use App\Models\AccountToDelete;

class UserProfileController extends Controller
{
    public function updateProfileInfo(Request $request) {
        $id = $request->input('id');
        $first_name = $request->input('first_name');
        $last_name = $request->input('last_name');
        $workType = $request->input('workType');

        DB::table('users')->where('_id', $id)->update(['fname' => $first_name, 'lname' => $last_name, 'workType' => $workType]);

        return response()->json(['message' => 'User Profile Info Updated successfully'], 200);
    }

    public function UpdateEmail(Request $request) {
        $email = $request->email;
        $code = $request->input('code');
        $user_id = $request->input('user_id');

        //return response()->json($code);

        //return response()->json([$email, $code]);

        $exist = DB::table('update_emails')->where('code', '=', (int)$code)->first();

        //return response()->json($exist['code']);

        if($exist['code'] == $code) {
            DB::table('users')->where('_id', '=', $user_id)->update(['email' => $email]);

            DB::table('update_emails')->where('code', '=', (int)$code)->delete();

            return response()->json(['message' => 'Email updated successfully!'], 200);
        } else {
            return response()->json([
                'error' => 'Code incorrect.'
            ], 500);
        }
    }

    public function deleteAccountRequest(Request  $request) {
        $user_id = $request->input('user_id');

        $req = AccountToDelete::where('user_id', $user_id)->first();
        if($req || $user_id === null) {
            return response()->json(['error' => 'Account deletion already on!']);
        }
        $acc = AccountToDelete::create($request->all());
        return response()->json(['message' => 'Account will be deleted after 7 days from now']);
    }

    public function getDeleteAccountRequest($id) {
        $acc = AccountToDelete::where('user_id', $id)->get();

        return response()->json($acc);
    }

    public function CancelDeleteAccountRequest(Request $request) {
        //return $request->all();

        $acc = AccountToDelete::where('user_id', $request->id)->delete();

        return response()->json(['message' => 'delete account request canceled']);
    }
}
