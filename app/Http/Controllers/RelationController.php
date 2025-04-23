<?php

namespace App\Http\Controllers;

use App\Models\Code;
use App\Models\Relation;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Pest\ArchPresets\Relaxed;

class RelationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function getUserRelations()
{
    $user = Auth::user();
    // if ($user->id !== Auth::id()) {
    //     abort(403, 'Unauthorized action.');
    // }
    // dd(Relation::where('user_id',Auth::id())->get());
   
    $relations = $user->relations()
        ->with('relatedUser:id,name,avatar') // eager load the related user
        ->get()
        ->map(function ($relation) {
            return [

                'relation_user_id' => $relation->relation_user_id,
                'relation_user_name' => $relation->relatedUser->name ?? null,
                'relationship_name' => $relation->relationship_name,
                'relationship_avatar' => $relation->relatedUser->avatar
            ];
        });

    return Inertia::render('Relation/index',['relations'=>$relations]);
}

public function showRelationData(User $user){
    // dd($user);
    
$records = $user->record()->where('visibility','public_all')->orWhere('visibility','friends')->get();
return Inertia::render('Relation/record',['records'=>$records]);
}

public function code(Request $request){
    $user = Code::where('code',$request->code)->first();
    if(!$user){
        return back()->with('message','please enter latest code');
    }
    return $user;
//     Relation::create([
// 'user_id'=>Auth::id(),
// 'relation_user_id'=>$user->id,
// 'relationship_name'=>'name'
//     ]);

}
   
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
        return Inertia::render('Relation/create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
