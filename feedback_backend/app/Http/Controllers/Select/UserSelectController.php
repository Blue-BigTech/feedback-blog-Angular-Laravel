<?php

namespace App\Http\Controllers\Select;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Components;
use DB;
use Illuminate\Support\Facades\Auth;

class UserSelectController extends Controller
{

    protected function getCurrentUser($token)
    {
        $user = auth()->user();
        return response()->json($user);
        /*return response()->json([
            'user' => auth()->user()
        ]);*/
    }

    /*public function getCurrentUser() {
        $user = auth('api')->user();
        if($user) {
            return response()->json(['success' => true, 'user' => $user]);
        } else {
            return response()->json(['success' => false, 'user' => $user]);
        }
    }*/

    public function getFeatures() {
        $components = DB::table('features')->get();
        return response()->json($components);
    }

    public function getFeaturesDetails($id) {
        $components = DB::table('feature_details')->where('feature_id', '=', $id)->get();
        return response()->json($components);
    }

    public function getCompanies() {
        $companies = DB::table('companies')->get();
        return response()->json($companies);
    }

    public function getCompanyDetails($id) {
        $company = DB::table('companies')->where('_id', '=', $id)->get();
        return response()->json($company);
    }
}
