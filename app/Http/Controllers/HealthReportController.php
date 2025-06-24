<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use App\Models\RecordHistory;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;
use Illuminate\Validation\ValidationException;

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

public function store(Request $request)
{
    $request->validate([
        'name' => 'required|string|max:255',
        'record_type' => 'required|in:file,text,image,json',
        'record_details' => 'nullable|string',
        'record_file' => 'nullable|file',
        'priority' => 'required|in:low,normal,high',
        'status' => 'required|in:active,archived,pending',
        'visibility' => 'required|in:public_all,friends,private',
        'value' => 'nullable|numeric',
        'unit' => 'nullable|string',
        'date_of_record' => 'nullable|date',
        'tags' => 'nullable|array',
        'tags.*' => 'string',
        'source' => 'nullable|string',
    ]);
    if (in_array($request->record_type, ['file', 'image'])) {
        if (!$request->hasFile('record_file')) {
            throw ValidationException::withMessages([
                'record_file' => 'Record file is required when record type is file or image.'
            ]);
        }
        if (empty($request->record_details)) {
            throw ValidationException::withMessages([
                'record_details' => 'Record details are required when record type is file or image.'
            ]);
        }
    }
    $file = $request->file('record_file');
    $filepath = $file ? $file->store('health-records', 'private') : null;
    $tags = $request->tags ? json_encode($request->tags) : null;
    $existing = HealthRecord::where('user_id', Auth::id())
        ->where('name', $request->name)
        ->first();
    if ($existing) {
        RecordHistory::create([
            'user_id' => $existing->user_id,
            'record_id' => $existing->id,
            'name' => $existing->name,
            'record_type' => $existing->record_type,
            'record_details' => $existing->record_details,
            'record_file' => $existing->record_file,
            'priority' => $existing->priority,
            'status' => $existing->status,
            'visibility' => $existing->visibility,
            'value' => $existing->value,
            'unit' => $existing->unit,
            'date_of_record' => $existing->created_at,
            'tags' => $existing->tags,
            'source' => $existing->source,
        ]);

        // Now update existing record with new values
        $existing->update([
            'record_type' => $request->record_type,
            'record_details' => $request->record_details,
            'record_file' => $filepath,
            'priority' => $request->priority,
            'status' => $request->status,
            'visibility' => $request->visibility,
            'value' => $request->value,
            'unit' => $request->unit,
            'date_of_record' => $request->date_of_record,
            'tags' => $tags,
            'source' => $request->source,
        ]);

    } else {
        HealthRecord::create([
            'user_id' => Auth::id(),
            'name' => $request->name,
            'record_type' => $request->record_type,
            'record_details' => $request->record_details,
            'record_file' => $filepath,
            'priority' => $request->priority,
            'status' => $request->status,
            'visibility' => $request->visibility,
            'value' => $request->value,
            'unit' => $request->unit,
            'tags' => $tags,
            'source' => $request->source,
        ]);
    }

    return to_route('health-record.index')->with('success', 'Health record saved successfully.');
}
    public function show($id)
    {
        $record = HealthRecord::where('user_id',Auth::id())->find($id);
        return Inertia::render('healthRecord/show',['record'=>$record]);
    }

    public function edit($id)
    {
        $record = HealthRecord::where('user_id',Auth::id())->find($id);
        // dd($record);
        return Inertia::render('healthRecord/edit',['record'=>$record]);
    }
    public function update(Request $request,$id)
    {
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


//    $img = "private/health-records/s4xx4Alb2Mqi1uPcpVOsx3Rw5Zdm89usQhecU2zv.png"; 


public function showImage($filename)
{
    $path = 'health-records/' . $filename;

    if (!Storage::disk('private')->exists($path)) {
        abort(404, 'File not found.');
    }

    $file = Storage::disk('private')->get($path);
    $type = Storage::disk('private')->mimeType($path);
return Storage::disk('private')->download('health-records/s4xx4Alb2Mqi1uPcpVOsx3Rw5Zdm89usQhecU2zv.png');
    // return Response::make($file, 200)->header("Content-Type", $type);
}

// public function test() {
//     $relativePath = 'health-records/s4xx4Alb2Mqi1uPcpVOsx3Rw5Zdm89usQhecU2zv.png';
//     return Storage::disk('private')->download($relativePath);
// }


}
