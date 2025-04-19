<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use App\Models\RecordHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;


class HealthReportController extends Controller
{
    //
    public function index(){
        $records = HealthRecord::where('user_id',Auth::id())->get();
        return Inertia::render('healthRecord/index',['records'=>$records]);
    }

    public function create(){
        return Inertia::render('healthRecord/create');
    }

    public function store(Request $request){
        $request->validate([
            'name'=>'required|string|max:255',
            'record_type'=>'required|string|in:file,text,image',
            'record_details'=>'required|string|max:2000',
            'record_file'=>($request->hasFile('record_file')?"file|mimes:jpeg,png,jpg,pdf|max:2048" : ""),
            'visibility'=>'required|in:public_all,friends,private,',   
            'value'=>'numeric'
        ]);
      
        $data = [
            'user_id' => Auth::id(),
            'name'=>$request->name,
            'record_type'=>$request->record_type,
            'record_details'=>$request->record_details,
            'visibility'=>$request->visibility,
            'value'=>$request->value
        ];
        if($request->record_file == null){
            $data['record_file'] = null;
        HealthRecord::create($data);
        return to_route('health-record.index');
        }
        $filepath = $request->file('record_file')->store('health-records','private');
        $data['record_file'] = $filepath;

        HealthRecord::create($data);
        return to_route('health-record.index');
    }

    public function show($id){
        $record = HealthRecord::where('user_id',Auth::id())->find($id);
        $path = storage_path('app/private' . $record->record_file);
        $record["record_file"] = $path;
        return Inertia::render('healthRecord/show',['record'=>$record]);
    }

    public function edit($id){
        $record = HealthRecord::where('user_id',Auth::id())->find($id);
        // dd($record);
        return Inertia::render('healthRecord/edit',['record'=>$record]);
    }
    public function update(Request $request,$id){
        dd($request->all());
        $request->validate([
            'name'=>'required|string|max:255',
           'record_type'=>'required|string|in:file,text,image',
           'record_details'=>'required|string|max:2000',
          'record_file'=>($request->hasFile('record_file')?"file|mimes:jpeg,png,jpg|max:2048" : ""),
           'visibility'=>'required|in:public_all,friends,private,',
           'value'=>'numeric'

        ]);
        $record = HealthRecord::where('user_id',Auth::id())->find($id);
        $data = [
            'user_id' => Auth::id(),
            'name'=>$request->name,
           'record_type'=>$request->record_type,
           'record_details'=>$request->record_details,
            'visibility'=>$request->visibility,
            'value'=>$request->value,
        ];
        if($request->file('record_file') == null){
            $data['record_file'] = $record->record_file;
        }else{
            
            $filepath = $request->file('record_file')->store('health-records','private');
            $data['record_file'] = $filepath;
        }
        $record->update($data);
        return to_route('health-record.index');
    }
    public function destroy($id){

        $record = HealthRecord::where('user_id',Auth::id())->find($id);
        if(  Carbon::now()->diffInHours($record->created_at) < 4 ){

            $record->delete();
            return to_route('health-record.index');
        }
        return back()->with(["message" => "cannot delete after 4 hours"]);
    }

   public function history(HealthRecord $healthRecord)
   {
    $histories = HealthRecord::find($healthRecord->id)->histories;
    if($histories->isEmpty()){
        return Inertia::render("healthRecord/history")->with(["message"=>"No history found"]);
    }
    
    return Inertia::render("healthRecord/history",["histories" => $histories]);
   }

   public function trashAll(){
    $user = Auth::id();
    $records = HealthRecord::onlyTrashed()->where("user_id",$user)->get();
    
    return Inertia::render("healthRecord/trash",["data"=>$records]);
   }

   public function restore( $healthRecord){
    $record =  HealthRecord::onlyTrashed()->where("user_id",Auth::id())->find($healthRecord);
    if(!$record){
        return back()->with(["message"=>"no record found"]);
        
    }
    $record->restore();
    return back()->with(["message"=>"record restored"]);
   }

   public function permanent( $healthRecord){
    $record =  HealthRecord::onlyTrashed()->where("user_id",Auth::id())->find($healthRecord);
    if(!$record){
        return back()->with(["message"=>"nor found record "]);

    }
$record->forceDelete();
return back()->with(["message"=>"record deleted permanently"]);
   }
}
