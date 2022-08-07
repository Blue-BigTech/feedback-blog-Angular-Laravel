<?php

/*
namespace App\Http\Controllers;

use Illuminate\Http\Request;

class AuthController extends Controller
{
    //
}*/


namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use App\Http\Requests\SignUpRequest;
use App\Models\User;
use DB;
use App\Mail\VerifyMail;
use Illuminate\Support\Carbon;
use Illuminate\Support\Str;
use Symfony\Component\HttpFoundation\Response;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['login', 'signup', 'verifEmail', 'updatePassword']]);
    }

    /**
     * Get a JWT via given credentials.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function login()
    {
        $credentials = request(['email', 'password']);

        if (!$token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Email or password doesn\'t exist!'], 401);
        }

        return $this->respondWithToken($token);
    }

    public function updatePassword(Request $request) {
        $credentials = request(['email', 'password']);

        if(! $token = auth()->attempt($credentials)) {
            return response()->json(['error' => 'Your current password incorrect!'], 401);
        } else {
            $email = $request->email;
            $password = Hash::make($request->newPassword);
            DB::table('users')->where('email', $email)->update(['password' => $password]);
            return response()->json(['message' => 'Your password updated successfully!'], 200);
        }
    }

    public function signup(SignUpRequest $request) {
        User::create($request->all());
        //return $this->login($request);
        $email = $request->input('email');

        // $this->sendEmail($email);

        return $this->login($request);
        // return response()->json(['message' => 'Successfully created user!'], Response::HTTP_CREATED);
    }

    public function sendEmail($email) {
        $token = $this->createToken($email);
        Mail::to($email)->send(new VerifyMail($token));
    }
    public function createToken($email) {
        $oldToken = DB::table('verif_emails')->where('email', $email)->first();
        if ($oldToken) {
            //return $oldToken;
            DB::table('verif_emails')->where('email', $email)->delete();
        }

        $token = Str::random(60);
        $this->saveToken($token, $email);
        return $token;
    }
    public function saveToken($token, $email) {
        DB::table('verif_emails')->insert([
            'email' => $email,
            'token' => $token,
            'created_at' => Carbon::now()
        ]);
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();

        return response()->json(['message' => 'Successfully logged out']);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    /**
     * Get the token array structure.
     *
     * @param  string $token
     *
     * @return \Illuminate\Http\JsonResponse
     */
    protected function respondWithToken($token)
    {
        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'expires_in' => auth()->factory()->getTTL() * 2000,
            'user' => auth()->user(),
            'userFname' => auth()->user()->fname,
        ]);
    }



    //Verif Email Status
    public function verifEmail(Request $request) {
        $user = DB::table('verif_emails')
        ->where('token','=', $request->resetToken)
        ->first();

        $email = $user['email'];

        $user = User::whereEmail($email)->first();
    	$user->update(['email_verif_status'=>true]);

        return response()->json(['message' => 'Email Verified Successfully'], 200);
    }
}
