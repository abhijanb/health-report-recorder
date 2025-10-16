<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreHealthRecordRequest;
use App\Http\Requests\UpdateHealthRecordRequest;
use App\Models\HealthRecord;
use App\Models\RecordHistory;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Carbon\Carbon;
use Illuminate\Support\Facades\Response;
use Illuminate\Support\Facades\Storage;

/**
 * @OA\Info(
 *     version="1.0.0",
 *     title="Health Report API",
 *     description="API for managing health reports"
 * )
 */
class HealthReportController extends Controller
{
    /**
     * Create a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('can:viewAny,' . HealthRecord::class)->only('index');
        $this->middleware('can:view,' . HealthRecord::class)->only('show');
        $this->middleware('can:create,' . HealthRecord::class)->only('create', 'store');
        $this->middleware('can:update,' . HealthRecord::class)->only('edit', 'update');
        $this->middleware('can:delete,' . HealthRecord::class)->only('destroy');
        $this->middleware('can:restore,' . HealthRecord::class)->only('restore');
        $this->middleware('can:forceDelete,' . HealthRecord::class)->only('permanent');
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Inertia\Response
     *
     * @OA\Get(
     *     path="/health-record",
     *     summary="Get a list of health records",
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
    public function index()
    {
        $records = HealthRecord::with('histories')->where('user_id', Auth::id())->get();

        return Inertia::render('healthRecord/index', ['records' => $records]);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Inertia\Response
     */
    public function create()
    {
        return Inertia::render('healthRecord/create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \App\Http\Requests\StoreHealthRecordRequest  $request
     * @return \Illuminate\Http\RedirectResponse
     *
     * @OA\Post(
     *     path="/health-record",
     *     summary="Create a new health record",
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/StoreHealthRecordRequest")
     *     ),
     *     @OA\Response(
     *         response=302,
     *         description="Redirect to the index page"
     *     )
     * )
     */
    public function store(StoreHealthRecordRequest $request)
    {
        $filepath = uploadFile($request->file('record_file'), 'health-records', 'private', 'private', Auth::user()->name);
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
            'value' => $existing->value,
            'date_of_record' => $existing->created_at,
            'unit' => $existing->unit,
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
            'value' => $request->value,
            'unit' => $request->unit,
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
    /**
     * Display the specified resource.
     *
     * @param  \App\Models\HealthRecord  $healthRecord
     * @return \Inertia\Response
     *
     * @OA\Get(
     *     path="/health-record/{healthRecord}",
     *     summary="Get a specific health record",
     *     @OA\Parameter(
     *         name="healthRecord",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=200,
     *         description="Successful operation"
     *     )
     * )
     */
    public function show(HealthRecord $healthRecord)
    {
        return Inertia::render('healthRecord/show', ['record' => $healthRecord]);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\HealthRecord  $healthRecord
     * @return \Inertia\Response
     */
    public function edit(HealthRecord $healthRecord)
    {
        return Inertia::render('healthRecord/edit', ['record' => $healthRecord]);
    }
    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateHealthRecordRequest  $request
     * @param  \App\Models\HealthRecord  $healthRecord
     * @return \Illuminate\Http\RedirectResponse
     *
     * @OA\Put(
     *     path="/health-record/{healthRecord}",
     *     summary="Update a specific health record",
     *     @OA\Parameter(
     *         name="healthRecord",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\RequestBody(
     *         required=true,
     *         @OA\JsonContent(ref="#/components/schemas/UpdateHealthRecordRequest")
     *     ),
     *     @OA\Response(
     *         response=302,
     *         description="Redirect to the index page"
     *     )
     * )
     */
    public function update(UpdateHealthRecordRequest $request, HealthRecord $healthRecord)
    {
        // Check if updated_at is older than 6 hours
        if ($healthRecord->updated_at->diffInHours(now()) > 6) {
            return back()->withErrors(['error' => 'This record cannot be updated because it is older than 6 hours.']);
        }

    // ✅ Build update data
    $data = [
        'user_id'        => Auth::id(),
        'name'           => $request->name,
        'record_type'    => $request->record_type,
        'record_details' => $request->record_details,
        'visibility'     => $request->visibility,
        'value'          => $request->value,
    ];

    // ✅ Handle file update
    if ($request->hasFile('record_file')) {
        $data['record_file'] = uploadFile($request->file('record_file'), 'health-records', 'private', 'private', Auth::user()->name);
    } else {
        $data['record_file'] = $healthRecord->record_file;
    }

    // ✅ Update the record
    $record->update($data);

    return to_route('health-record.index')->with('success', 'Record updated successfully.');
}

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\HealthRecord  $healthRecord
     * @return \Illuminate\Http\RedirectResponse
     *
     * @OA\Delete(
     *     path="/health-record/{healthRecord}",
     *     summary="Delete a specific health record",
     *     @OA\Parameter(
     *         name="healthRecord",
     *         in="path",
     *         required=true,
     *         @OA\Schema(type="integer")
     *     ),
     *     @OA\Response(
     *         response=302,
     *         description="Redirect to the index page"
     *     )
     * )
     */
    public function destroy(HealthRecord $healthRecord)
    {
        if (Carbon::now()->diffInHours($healthRecord->created_at) < 4) {
            $healthRecord->delete();

            return to_route('health-record.index');
        }

        return back()->with(['message' => 'Cannot delete after 4 hours']);
    }

    /**
     * Display the history of the specified resource.
     *
     * @param  \App\Models\HealthRecord  $healthRecord
     * @return \Inertia\Response
     */
    public function history(HealthRecord $healthRecord)
    {
        $histories = $healthRecord->histories;
        if ($histories->isEmpty()) {
            return Inertia::render('healthRecord/history')->with(['message' => 'No history found']);
        }

        return Inertia::render('healthRecord/history', ['histories' => $histories]);
    }

    /**
     * Display a listing of the trashed resources.
     *
     * @return \Inertia\Response
     */
    public function trashAll()
    {
        $user = Auth::id();
        $records = HealthRecord::onlyTrashed()->where('user_id', $user)->get();

        return Inertia::render('healthRecord/trash', ['data' => $records]);
    }

    /**
     * Restore the specified resource from storage.
     *
     * @param  int  $healthRecord
     * @return \Illuminate\Http\RedirectResponse
     */
    public function restore($healthRecord)
    {
        $record = HealthRecord::onlyTrashed()->where('user_id', Auth::id())->find($healthRecord);
        if (!$record) {
            return back()->with(['message' => 'No record found']);
        }
        $record->restore();

        return back()->with(['message' => 'Record restored']);
    }

    /**
     * Permanently delete the specified resource from storage.
     *
     * @param  int  $healthRecord
     * @return \Illuminate\Http\RedirectResponse
     */
    public function permanent($healthRecord)
    {
        $record = HealthRecord::onlyTrashed()->where('user_id', Auth::id())->find($healthRecord);
        if (!$record) {
            return back()->with(['message' => 'No record found']);
        }
        $record->forceDelete();

        return back()->with(['message' => 'Record deleted permanently']);
    }


//    $img = "private/health-records/s4xx4Alb2Mqi1uPcpVOsx3Rw5Zdm89usQhecU2zv.png"; 


    /**
     * Display the specified image.
     *
     * @param  \App\Models\HealthRecord  $healthRecord
     * @return \Symfony\Component\HttpFoundation\StreamedResponse
     */
    public function showImage(HealthRecord $healthRecord)
    {
        $this->authorize('view', $healthRecord);

        $url = Storage::disk('private')->temporaryUrl(
            $healthRecord->record_file,
            now()->addMinutes(5)
        );

        return redirect($url);
    }

// public function test() {
//     $relativePath = 'health-records/s4xx4Alb2Mqi1uPcpVOsx3Rw5Zdm89usQhecU2zv.png';
//     return Storage::disk('private')->download($relativePath);
// }


}
