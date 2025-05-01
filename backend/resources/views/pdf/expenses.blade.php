@php
    $categoryTotals = [];

    foreach ($expenses as $expense) {
        $category = $expense['category']['name'] ?? 'N/A';
        $categoryTotals[$category] = ($categoryTotals[$category] ?? 0) + $expense['amount'];
    }

    $labels = array_keys($categoryTotals);
    $data = array_values($categoryTotals);

    $chartConfig = [
        'type' => 'pie',
        'data' => [
            'labels' => $labels,
            'datasets' => [[
                'data' => $data,
                'backgroundColor' => ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF']
            ]]
        ]
    ];

    $chartUrl = "https://quickchart.io/chart?c=" . urlencode(json_encode($chartConfig));
    $base64Chart = base64_encode(file_get_contents($chartUrl));

@endphp

<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Expenses Report</title>
    <style>
        body { 
            font-family: Arial, sans-serif; 
            font-size: 14px;
            margin: 30px;
            border: 1px solid #333;
            padding: 40px;
            background: white;
        }
        .header {
            text-align: center;
            border-bottom: 2px solid #333;
            padding-bottom: 20px;
            margin-bottom: 30px;
        }
        .report-title {
            font-size: 24px;
            color: #333;
            margin-bottom: 10px;
        }
        .chart-container {
            text-align: center;
            margin: 30px 0;
        }
        .figure {
            margin: 20px 0;
        }
        .figure img {
            max-width: 400px;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        .figure-caption {
            font-style: italic;
            color: #666;
            margin-top: 10px;
        }
        table { 
            width: 100%; 
            border-collapse: collapse; 
            margin: 30px 0;
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        th, td { 
            border: 1px solid #ccc; 
            padding: 12px; 
            text-align: left; 
        }
        th { 
            background-color: #f4f4f4; 
            font-weight: bold;
        }
        tr:nth-child(even) {
            background-color: #f9f9f9;
        }
        .total-row {
            font-weight: bold;
            background-color: #f4f4f4;
        }
    </style>
</head>
<body>
    <div class="header">
        <h1 class="report-title">Expense Report</h1>
        <p>Generated on {{ \Carbon\Carbon::now()->format('d M Y') }}</p>
    </div>

    <div class="chart-container">
        <div class="figure">
            <h3>Expense Distribution by Category</h3>
            <img src="data:image/png;base64,{{ $base64Chart }}" alt="Expense Pie Chart" />
            <p class="figure-caption">Figure 1: Distribution of expenses across different categories</p>
        </div>
    </div>

    <h3>Detailed Expense Breakdown</h3>
    <table>
        <thead>
            <tr>
                <th>#</th>
                <th>Description</th>
                <th>Category</th>
                <th>Amount</th>
                <th>Date</th>
            </tr>
        </thead>
        <tbody>
            @foreach ($expenses as $index => $expense)
                <tr>
                    <td>{{ $index + 1 }}</td>
                    <td>{{ $expense['description'] }}</td>
                    <td>{{ $expense['category']['name'] ?? 'N/A' }}</td>
                    <td>Rs &nbsp;{{ $expense['amount'] }}</td>
                    <td>{{ \Carbon\Carbon::parse($expense['date'])->format('d M Y') }}</td>
                </tr>
            @endforeach
            <tr class="total-row">
                <td colspan="3">Total</td>
                <td colspan="2">Rs&nbsp;{{ array_sum(array_column($expenses, 'amount')) }}</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
