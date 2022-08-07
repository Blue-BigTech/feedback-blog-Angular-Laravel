<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/*Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});*/

Route::group([

    'middleware' => 'api'

], function ($router) {
    Route::post('signup', 'App\Http\Controllers\AuthController@signup');
    Route::post('login', 'App\Http\Controllers\AuthController@login');
    Route::post('logout', 'App\Http\Controllers\AuthController@logout');
    Route::post('refresh', 'App\Http\Controllers\AuthController@refresh');
    Route::post('me', 'App\Http\Controllers\AuthController@me');
    Route::post('sendPasswordResetLink', 'App\Http\Controllers\emailsController@sendPasswordResetLink');
    Route::post('resetPassword', 'App\Http\Controllers\ChangePasswordController@process');
    Route::post('verifEmail', 'App\Http\Controllers\AuthController@verifEmail');

    Route::post('updatePassword', 'App\Http\Controllers\AuthController@updatePassword');
    Route::post('resendVerifEmail', 'App\Http\Controllers\emailsController@resendVerifEmail');

    Route::post('deleteAccountRequest', 'App\Http\Controllers\UserProfileController@deleteAccountRequest');
    Route::get('getDeleteAccountRequest/{id}', 'App\Http\Controllers\UserProfileController@getDeleteAccountRequest');
    Route::post('CancelDeleteAccountRequest', 'App\Http\Controllers\UserProfileController@CancelDeleteAccountRequest');

    /* User routes */

    Route::get('getCurrentUser/{token}', 'App\Http\Controllers\Select\UserSelectController@getCurrentUser');

    Route::get('getFeatures', 'App\Http\Controllers\Select\UserSelectController@getFeatures');
    Route::get('getFeaturesDetails/{id}', 'App\Http\Controllers\Select\UserSelectController@getFeaturesDetails');

    Route::get('getCompanies', 'App\Http\Controllers\Select\UserSelectController@getCompanies');
    Route::get('getCompanyDetails/{id}', 'App\Http\Controllers\Select\UserSelectController@getCompanyDetails');

    Route::post('CreateTemplateTab', 'App\Http\Controllers\templateController@CreateTemplateTab');
    Route::post('CreateActionHistory', 'App\Http\Controllers\templateController@CreateActionHistory');
    Route::post('initSplitArea', 'App\Http\Controllers\templateController@initSplitArea');
    Route::get('getUserTemplateTabs/{id}', 'App\Http\Controllers\templateController@getUserTemplateTabs');
    Route::post('deleteTemplateTab', 'App\Http\Controllers\templateController@deleteTemplateTab');
    Route::post('updateTabName', 'App\Http\Controllers\templateController@updateTabName');
    Route::post('updateTabOrder', 'App\Http\Controllers\templateController@updateTabOrder');
    Route::post('updateTabSplits', 'App\Http\Controllers\templateController@updateTabSplits');
    Route::post('setSelectedRouterLink', 'App\Http\Controllers\templateController@setSelectedRouterLink');
    Route::get('getSplitArea/{id}', 'App\Http\Controllers\templateController@getSplitArea');

    Route::get('getActionHistory/{id}', 'App\Http\Controllers\templateController@getActionHistory');

    // FeedBack Apis

    Route::get('GetAllFeedback', 'App\Http\Controllers\FeedbackController@getAllFeedback');
    Route::post('CreateFeedback', 'App\Http\Controllers\FeedbackController@createFeedback');
    Route::delete('DeleteFeedback', 'App\Http\Controllers\FeedbackController@deleteFeedback');
    Route::post('UpdateFeedback', 'App\Http\Controllers\FeedbackController@updateFeedback');
    Route::post('UpdateFeedbackVotes', 'App\Http\Controllers\FeedbackController@updateFeedbackVotes');

    // FeedBackComment Apis

    Route::post('CreateFeedbackComment', 'App\Http\Controllers\FeedbackCommentController@createFeedbackComment');
    Route::post('UpdateFeedbackComment', 'App\Http\Controllers\FeedbackCommentController@updateFeedbackComment');
    Route::delete('DeleteFeedbackComment', 'App\Http\Controllers\FeedbackCommentController@deleteFeedbackComment');

    // SubComment Apis

    Route::post('CreateSubComment', 'App\Http\Controllers\SubCommentController@createSubComment');
    Route::post('UpdateSubComment', 'App\Http\Controllers\SubCommentController@updateSubComment');
    Route::delete('DeleteSubComment', 'App\Http\Controllers\SubCommentController@deleteSubComment');

    // Notify Apis

    Route::post('GetNotify', 'App\Http\Controllers\NotifyController@getNotify');
    Route::post('CheckNotify', 'App\Http\Controllers\NotifyController@checkNotify');

    // Files Apis

    Route::get('SelectUserCompanySheets/{user_id}/{company_id}', 'App\Http\Controllers\ExcelFilesController@SelectUserCompanySheets');
    Route::post('saveInitUserSheet', 'App\Http\Controllers\ExcelFilesController@saveInitUserSheet');
    Route::post('deleteSheetVersion', 'App\Http\Controllers\ExcelFilesController@deleteSheetVersion');
    Route::post('updateFileName', 'App\Http\Controllers\ExcelFilesController@updateFileName');

    //User Profile Info Apis

    Route::post('updateProfileInfo', 'App\Http\Controllers\UserProfileController@updateProfileInfo');
    Route::post('UpdateEmail', 'App\Http\Controllers\UserProfileController@UpdateEmail');
    Route::post('requestUpdateEmail', 'App\Http\Controllers\emailsController@requestUpdateEmail');
});
