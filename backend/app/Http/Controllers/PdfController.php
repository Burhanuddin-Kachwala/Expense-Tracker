<?php

namespace App\Http\Controllers;

use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;


class PdfController extends Controller
{
 
    
    public function downloadExpenses(Request $request)
    {
        $expenses = $request->input('expenses', []);
    
        if (empty($expenses)) {
            return response()->json(['error' => 'No expenses provided'], 400);
        }
    
        $pdf = Pdf::loadView('pdf.expenses', ['expenses' => $expenses]);
        return $pdf->download('expenses_report.pdf');
    }
    
}
