<?php

namespace App\Http\Controllers;
use Illuminate\Http\Request;
use App\Models\User;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Mail;
use App\Mail\ResetPasswordMail;
use DB;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use App\Mail\VerifyMail;
use App\Mail\UpdateEmail;

class emailsController extends Controller
{
    public function sendPasswordResetLink(Request $request) {
        if(!$this->validateEmail($request->email)) {
            return $this->emailNotExist();
        }

        $this->sendEmail($request->email);
        return $this->successResponse();
    }



    public function requestUpdateEmail(Request $request) {
        $email = response()->json($request->email);
        $code = $this->createUpdateEmailToken($request->email);
        Mail::to($request->email)->send(new UpdateEmail($code));

        return response()->json(['message' => 'success'], 200);
    }
    public function createUpdateEmailToken($email) {
         DB::table('update_emails')->where('email', $email)->delete();
        /*if ($oldToken) {
            return $oldToken;
        }*/

        $token = Str::random(60);
        $randomNumber = random_int(100000, 999999);
        $this->saveUpdateEmailToken($token, $email, $randomNumber);
        return $randomNumber;
    }
    public function saveUpdateEmailToken($token, $email, $randomNumber) {
        DB::table('update_emails')->insert([
            'email' => $email,
            'token' => $token,
            'code' => $randomNumber,
            'created_at' => Carbon::now()
        ]);
    }



    public function resendVerifEmail(Request $request) {
        $email = $request->email;
        //return response()->json($email);
        $token = $this->createVerifToken($email);
        Mail::to($request->email)->send(new VerifyMail($token));

        return response()->json(['message' => 'success'], 200);
        //return $request->all();
        //$this->sendVerifEmail($request->email);
    }
    /*public function sendVerifEmail($email) {
        $token = $this->createVerifToken($email);
        Mail::to($email)->send(new VerifyMail($token));
        return response()->json(['message' => 'email sent successfully!'], 200);
    }*/
    public function createVerifToken($email) {
        $oldToken = DB::table('verif_emails')->where('email', $email)->first();
        if ($oldToken) {
            //return $oldToken;
            DB::table('verif_emails')->where('email', $email)->delete();
        }

        $token = Str::random(60);
        $this->saveVerifToken($token, $email);
        return $token;
    }
    public function saveVerifToken($token, $email) {
        DB::table('verif_emails')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }







    public function sendEmail($email) {
        $token = $this->createToken($email);
        Mail::to($email)->send(new ResetPasswordMail($token));
    }

    public function createToken($email) {
        $oldToken = DB::table('password_resets')->where('email', $email)->first();
        if ($oldToken) {
            return $oldToken;
        }

        $token = Str::random(60);
        $this->saveToken($token, $email);
        return $token;
    }

    public function saveToken($token, $email) {
        DB::table('password_resets')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    public function validateEmail($email) {
        return !!User::where('email', $email)->first();//  !!  used to make the result as boolean to return just true or false ;)
    }

    public function emailNotExist() {
        return response()->json([
            'error' => 'Email does not exist on our database.'
        ], Response::HTTP_NOT_FOUND);
    }

    public function successResponse() {
        return response()->json([
            'data' => 'Reset Email sent successfully, please check your inbox.'
        ], Response::HTTP_OK);
    }
}
