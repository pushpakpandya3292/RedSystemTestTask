<?php 
namespace App\Http\Controllers;
use App\Http\Controllers\Controller;
use App\Http\Requests\CalendarAddRequest;
use App\Http\Requests\CalendarEditRequest;
use App\Models\Calendar;
use Illuminate\Http\Request;
use Exception;
class CalendarController extends Controller
{
	

	/**
     * List table records
	 * @param  \Illuminate\Http\Request
     * @param string $fieldname //filter records by a table field
     * @param string $fieldvalue //filter value
     * @return \Illuminate\View\View
     */
	function index(Request $request, $fieldname = null , $fieldvalue = null){
		$query = Calendar::query();
		if($request->search){
			$search = trim($request->search);
			Calendar::search($query, $search);
		}
		$orderby = $request->orderby ?? "calendar.id";
		$ordertype = $request->ordertype ?? "desc";
		$query->orderBy($orderby, $ordertype);
		if($fieldname){
			$query->where($fieldname , $fieldvalue); //filter by a single field name
		}
		$records = $this->paginate($query, Calendar::listFields());
		return $this->respond($records);
	}
	

	/**
     * Select table record by ID
	 * @param string $rec_id
     * @return \Illuminate\View\View
     */
	function view($rec_id = null){
		$query = Calendar::query();
		$record = $query->findOrFail($rec_id, Calendar::viewFields());
		return $this->respond($record);
	}
	

	/**
     * Save form record to the table
     * @return \Illuminate\Http\Response
     */
	function add(CalendarAddRequest $request){
		$modeldata = $request->validated();
		
		//save Calendar record
		$record = Calendar::create($modeldata);
		$rec_id = $record->id;
		return $this->respond($record);
	}
	

	/**
     * Update table record with form data
	 * @param string $rec_id //select record by table primary key
     * @return \Illuminate\View\View;
     */
	function edit(CalendarEditRequest $request, $rec_id = null){
		$query = Calendar::query();
		$record = $query->findOrFail($rec_id, Calendar::editFields());
		if ($request->isMethod('post')) {
			$modeldata = $request->validated();
			$record->update($modeldata);
		}
		return $this->respond($record);
	}
	

	/**
     * Delete record from the database
	 * Support multi delete by separating record id by comma.
	 * @param  \Illuminate\Http\Request
	 * @param string $rec_id //can be separated by comma 
     * @return \Illuminate\Http\Response
     */
	function delete(Request $request, $rec_id = null){
		$arr_id = explode(",", $rec_id);
		$query = Calendar::query();
		$query->whereIn("id", $arr_id);
		$query->delete();
		return $this->respond($arr_id);
	}
    /**
     * Endpoint action
     * @return \Illuminate\Http\Response
     */
    public function events(){
        $query   = Calendar::query();
        $records = $query->get(['id', 'str_staff_nbr as title', 'starttime as start', 'endtime as end']);
        return $this->respond($records);
    }
}
