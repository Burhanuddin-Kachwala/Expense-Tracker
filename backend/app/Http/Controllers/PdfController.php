<?php

namespace App\Http\Controllers;

use App\Helpers\ApiResponse;
use Barryvdh\DomPDF\Facade\Pdf;
use Illuminate\Http\Request;


class PdfController extends Controller
{
    public function downloadExpenses(Request $request)
    {
        $expenses = $request->input('expenses', []);

        if (empty($expenses)) {
            return ApiResponse::error("No Expense provided");
        }

        $pdf = Pdf::loadView('pdf.expenses', ['expenses' => $expenses]);
        return $pdf->download('expenses_report.pdf');
    }
}
