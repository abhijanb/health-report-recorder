<?php

namespace App\Http\Controllers;

use App\Models\MedicineReport;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class MedicineController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $medicines = MedicineReport::where('user_id',Auth::id())->get();
        return Inertia::render('Medicine/index',['medicines'=>$medicines]);

    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Medicine/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $request->validate([
            'medicine_name' => 'required|string',
           'dosage' => 'required|string',
           'frequency' =>'required|string|in:once,twice,thrice,daily',
           'start_date' =>'required|date',
           'end_date' =>'required|after:start_date',
           'price'=>'required|numeric',
           'store_name'=>'required|string',
           'prescription'=>'nullable|file|mimes:pdf,png,jpg,jpeg',
        ]);
        $fileName = "";
        if($request->hasFile('prescription')){
            
            $file = $request->file('prescription');
            $mimes = $file->getMimeType();
            if($mimes == 'application/pdf'){
                $fileName = $file->store('prescriptionPDF','public');
            }
            else if($mimes == 'image/png' || $mimes == 'image/jpg' || $mimes == 'image/jpeg'){
                $fileName = $file->store('prescription','public');
            }
        }
        
        MedicineReport::create([
            'user_id'=>Auth::id(),
            'medicine_name'=>$request->medicine_name,
            'dosage'=>$request->dosage,
            'frequency'=>$request->frequency,
            'start_date'=>$request->start_date,
            'end_date'=>$request->end_date,
            'price'=>$request->price,
            'store_name'=>$request->store_name,
            'prescription'=>$fileName,
        ]);
        
        return back()->with('message','Medicine added successfully');
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
        $medicine = MedicineReport::where('user_id',Auth::id())->find($id);
        if(!$medicine){
            return back()->with('message','Medicine not found');
        }
        return Inertia::render('Medicine/show',['medicine'=>$medicine]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
        $data = MedicineReport::where('user_id',Auth::id())->find($id);
        if(!$data){
            return back()->with('message','Medicine not found');
        }
        return Inertia::render('Medicine/edit',['medicine'=>$data]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
        $oldMedicine = MedicineReport::where('user_id',Auth::id())->find($id);
        if($oldMedicine->created_at === $oldMedicine->updated_at && $oldMedicine->created_at->diffInHours(Carbon::now())<=2){
            $request->validate([
                'medicine_name' =>'required|string',
                'dosage' =>'required|string',
                'frequency' =>'required|string|in:once,twice,thrice,daily',
                'start_date' =>'required|date',
                'end_date' =>'required|after:start_date',
                'price'=>'required|numeric',
                'store_name'=>'required|string',
                'prescription'=>'nullable|file|mimes:pdf,png,jpg,jpeg',
            ]);
            $medicine = MedicineReport::where('user_id',Auth::id())->find($id);
            if(!$medicine){
            return back()->with('message','Medicine not found');
        }
        $fileName = $medicine->prescription;
        if($request->hasFile('prescription')){
            
            $file = $request->file('prescription');
            $mimes = $file->getMimeType();
            if($mimes == 'application/pdf'){
                $fileName = $file->store('prescriptionPDF','public');
            }
            else if($mimes == 'image/png' || $mimes == 'image/jpg' || $mimes == 'image/jpeg'){
                $fileName = $file->store('prescription','public');
                
            }
        }
        
        $data = [
            'medicine_name'=>$request->medicine_name,
            'dosage'=>$request->dosage,
            'frequency'=>$request->frequency,
            'start_date'=>$request->start_date,
            'end_date'=>$request->end_date,
            'price'=>$request->price,
        ];
        if($fileName){
            $data['prescription'] = $fileName;
        }
        
        $medicine->update($data);
        return back()->with('message','Medicine updated successfully');
    }
    else{
        return back()->with('message','You can not edit this medicine');
    }
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy( $id)
    {
        //
        $medicine = MedicineReport::where('user_id',Auth::id())->find($id);
        if(!$medicine){
            return back()->with('message','Medicine not found');
        }
        // remove file from storage
        if($medicine->prescription){
            $path = storage_path('app/public/'.$medicine->prescription);
            if(file_exists($path)){
                unlink($path);
            }
        }
        $medicine->delete();
        return to_route('medicine.index');
    }
}
