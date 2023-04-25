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
// api routes that need auth

Route::middleware(['auth:api'])->group(function () {


});

Route::get('home', 'HomeController@index');


/* routes for Calendar Controller  */	
	Route::get('calendar', 'CalendarController@index');
	Route::get('calendar/index', 'CalendarController@index');
	Route::get('calendar/index/{filter?}/{filtervalue?}', 'CalendarController@index');	
	Route::get('calendar/view/{rec_id}', 'CalendarController@view');	
	Route::post('calendar/add', 'CalendarController@add');	
	Route::any('calendar/edit/{rec_id}', 'CalendarController@edit');	
	Route::any('calendar/delete/{rec_id}', 'CalendarController@delete');



/* Custom endpoint routes  */	
	Route::get('calendar/events', 'calendarController@events');

/* routes for FileUpload Controller  */	
Route::post('fileuploader/upload/{fieldname}', 'FileUploaderController@upload');
Route::post('fileuploader/s3upload/{fieldname}', 'FileUploaderController@s3upload');
Route::post('fileuploader/remove_temp_file', 'FileUploaderController@remove_temp_file');