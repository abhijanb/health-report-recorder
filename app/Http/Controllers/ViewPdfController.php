<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ViewPdfController extends Controller
{
    //
    public function viewPdf($filePath)
    {

        $filePath = storage_path('app/public/' . $filePath);

       
        if (!file_exists($filePath)) {
            return response()->json(['message' => 'File not found'], 404);
        } 

      
        return response()->file($filePath, [
            'Content-Type' => 'application/pdf',
            'Content-Disposition' => 'inline; filename='.$filePath,
        ]);
        
    }
}
