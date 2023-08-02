<?php

namespace App\Models\Log;

use App\User;
use Illuminate\Database\Eloquent\Model;

class Log extends Model{

    protected $table = 'logs';

    protected $fillable = [
        'subject','date_time', 'url', 'ip', 'agent', 'request_data', 'response_data', 'created_at', 'update_at', 'created_by',
    ];

    public static function get_all_logs($filter_array = []){

        $logs = Log::with('user');

        // subject base search
        if(isset($filter_array['subject']) && !empty($filter_array['subject'])){
            $logs = $logs->Where('logs.subject', $filter_array['subject']);
        }

        // url base search
        if(isset($filter_array['url']) && !is_null($filter_array['url'])){
            $logs = $logs->Where('logs.url', $filter_array['url']);
        }

        // date base search
        if(isset($filter_array['created_at']) && !is_null($filter_array['created_at'])){
            $logs = $logs->WhereDate('logs.created_at', $filter_array['created_at']);
        }

        // date base search
        if(isset($filter_array['created_by']) && !is_null($filter_array['created_by'])){
            $logs = $logs->Where('logs.created_by', $filter_array['created_by']);
        }

        $logs = $logs->orderBy('id', 'desc');
        $logs = $logs->paginate(50);
        return $logs;
    }

    // get role object of user
    public function user () {
        return $this->hasOne(User::class, 'id','created_by');
    }

}
