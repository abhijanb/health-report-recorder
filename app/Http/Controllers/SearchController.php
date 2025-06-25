<?php

namespace App\Http\Controllers;

use App\Models\HealthRecord;
use App\Models\Medicine; // Assuming you have a Medicine model
use App\Models\MedicineReport;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SearchController extends Controller
{
    // Shared render method for inertia views
    public function renderSearch($data, $type)
    {
        return Inertia::render('search/index', [
            'results' => $data,
            'type' => $type,
        ]);
    }

    // Search health records by name, details, or other relevant fields
    public function searchHealth($search)
    {
        $data = HealthRecord::where('name', 'like', "%{$search}%")
            ->orWhere('record_details', 'like', "%{$search}%")
            ->orWhere('record_type', 'like', "%{$search}%")
            ->orWhere('status', 'like', "%{$search}%")
            ->orWhere('priority', 'like', "%{$search}%")
            ->orWhere('source', 'like', "%{$search}%")
            ->orWhere('unit', 'like', "%{$search}%")
            ->orWhereJsonContains('tags', $search)
            ->paginate(15);

        return $this->renderSearch($data, 'health');
    }

    // Search medicine by name or description (adjust fields as per your Medicine model)
    public function searchMedicine($search)
    {
        $data = MedicineReport::where('name', 'like', "%{$search}%")
            ->orWhere('description', 'like', "%{$search}%")
            ->paginate(15);

        return $this->renderSearch($data, 'medicine');
    }
}
