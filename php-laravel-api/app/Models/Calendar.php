<?php 
namespace App\Models;
use Illuminate\Database\Eloquent\Model;
class Calendar extends Model 
{
	

	/**
     * The table associated with the model.
     *
     * @var string
     */
	protected $table = 'calendar';
	

	/**
     * The table primary key field
     *
     * @var string
     */
	protected $primaryKey = 'id';
	

	/**
     * Table fillable fields
     *
     * @var array
     */
	protected $fillable = ["day_type","str_staff_nbr","date","starttime","endtime","txt_day_description"];
	

	/**
     * Set search query for the model
	 * @param \Illuminate\Database\Eloquent\Builder $query
	 * @param string $text
     */
	public static function search($query, $text){
		//search table record 
		$search_condition = '(
				DAY_TYPE LIKE ?  OR 
				STR_STAFF_NBR LIKE ?  OR 
				TXT_DAY_DESCRIPTION LIKE ? 
		)';
		$search_params = [
			"%$text%","%$text%","%$text%"
		];
		//setting search conditions
		$query->whereRaw($search_condition, $search_params);
	}
	

	/**
     * return list page fields of the model.
     * 
     * @return array
     */
	public static function listFields(){
		return [ 
			"id", 
			"DAY_TYPE AS day_type", 
			"STR_STAFF_NBR AS str_staff_nbr", 
			"DATE AS date", 
			"STARTTIME AS starttime", 
			"ENDTIME AS endtime", 
			"TXT_DAY_DESCRIPTION AS txt_day_description" 
		];
	}
	

	/**
     * return exportList page fields of the model.
     * 
     * @return array
     */
	public static function exportListFields(){
		return [ 
			"id", 
			"DAY_TYPE AS day_type", 
			"STR_STAFF_NBR AS str_staff_nbr", 
			"DATE AS date", 
			"STARTTIME AS starttime", 
			"ENDTIME AS endtime", 
			"TXT_DAY_DESCRIPTION AS txt_day_description" 
		];
	}
	

	/**
     * return view page fields of the model.
     * 
     * @return array
     */
	public static function viewFields(){
		return [ 
			"id", 
			"DAY_TYPE AS day_type", 
			"STR_STAFF_NBR AS str_staff_nbr", 
			"DATE AS date", 
			"STARTTIME AS starttime", 
			"ENDTIME AS endtime", 
			"TXT_DAY_DESCRIPTION AS txt_day_description" 
		];
	}
	

	/**
     * return exportView page fields of the model.
     * 
     * @return array
     */
	public static function exportViewFields(){
		return [ 
			"id", 
			"DAY_TYPE AS day_type", 
			"STR_STAFF_NBR AS str_staff_nbr", 
			"DATE AS date", 
			"STARTTIME AS starttime", 
			"ENDTIME AS endtime", 
			"TXT_DAY_DESCRIPTION AS txt_day_description" 
		];
	}
	

	/**
     * return edit page fields of the model.
     * 
     * @return array
     */
	public static function editFields(){
		return [ 
			"DAY_TYPE AS day_type", 
			"STR_STAFF_NBR AS str_staff_nbr", 
			"DATE AS date", 
			"STARTTIME AS starttime", 
			"ENDTIME AS endtime", 
			"TXT_DAY_DESCRIPTION AS txt_day_description", 
			"id" 
		];
	}
	

	/**
     * Indicates if the model should be timestamped.
     *
     * @var bool
     */
	public $timestamps = false;
}
