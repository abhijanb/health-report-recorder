<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    //

    public function renderSearch($data) {
    return Inertia::render('search/index', [
        'results' => $data,
    ]);
}

public function searchAll($search)
{
    $data = HealthRecord::where('name', $search)
        ->orWhere('record_type', $search)
        ->orWhere('record_details', 'like', "%{$search}%")
        ->orWhere('status', $search)
        ->orWhere('priority', $search)
        ->orWhere('visibility', $search)
        ->orWhere('source', 'like', "%{$search}%")
        ->orWhere('unit', 'like', "%{$search}%")
        ->orWhereJsonContains('tags', $search)
        ->paginate(15); // paginate instead of get()

    return $this->renderSearch($data);
}
public function searchUser($search)
{
    $data = User::where('name', 'like', "%{$search}%")
        ->orWhere('email', 'like', "%{$search}%")
        ->paginate(10);

    return $this->renderSearch($data);
}
public function searchUrgent($search)
{
    $data = HealthRecord::where('priority', 'high')
        ->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('record_details', 'like', "%{$search}%");
        })
        ->paginate(15);

        return $this->renderSearch($data);

}
public function searchPublic($search)
{
    $data = HealthRecord::where('visibility', 'public_all')
        ->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('record_details', 'like', "%{$search}%");
        })
        ->paginate(15);

        return $this->renderSearch($data);

}
public function searchTag($search)
{
    $data = HealthRecord::whereJsonContains('tags', $search)
        ->paginate(15);

        return $this->renderSearch($data);

}
public function searchDate($search)
{
    $data = HealthRecord::whereDate('date_of_record', $search)
        ->paginate(15);

        return $this->renderSearch($data);

}
public function searchField($search)
{
    $data = HealthRecord::where('record_type', $search)
        ->orWhere('file_type', 'like', "%{$search}%")
        ->paginate(15);

        return $this->renderSearch($data);

}

public function searchFuture($search)
{
    $data = HealthRecord::where('date_of_record', '>', now())
        ->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('record_details', 'like', "%{$search}%");
        })
        ->paginate(15);

       return $this->renderSearch($data);

}



public function searchDoctor($search)
{
    $data = User::where('role', 'doctor')
        ->where(function ($q) use ($search) {
            $q->where('name', 'like', "%{$search}%")
              ->orWhere('email', 'like', "%{$search}%");
        })
        ->paginate(10);

        return $this->renderSearch($data);

}

public function searchBilling($search)
{
    $data = HealthRecord::where('unit', 'like', "%{$search}%")
        ->orWhere('value', 'like', "%{$search}%")
        ->paginate(15);

        return $this->renderSearch($data);

}
}
