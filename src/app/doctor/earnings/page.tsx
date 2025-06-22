import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { BarChart } from "lucide-react";

// This is a placeholder for a chart component.
// In a real app, you would use a library like Recharts or Chart.js.
const PlaceholderChart = () => (
    <div className="w-full h-64 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded">
        <BarChart className="w-12 h-12 text-gray-500" />
        <p className="ml-2 text-gray-500">Earnings Chart Placeholder</p>
    </div>
);

export default function EarningsPage() {
    const earningsData = {
        totalEarnings: 75000,
        transactions: [
            { id: 1, date: "2024-07-20", description: "Consultation - John Doe", amount: 150 },
            { id: 2, date: "2024-07-18", description: "Follow-up - Jane Smith", amount: 75 },
            { id: 3, date: "2024-07-15", description: "Procedure - Sam Wilson", amount: 500 },
            { id: 4, date: "2024-07-12", description: "Consultation - Alice Johnson", amount: 150 },
        ],
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Earnings</h1>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card className="md:col-span-1">
                    <CardHeader>
                        <CardTitle>Total Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <p className="text-4xl font-bold">${earningsData.totalEarnings.toLocaleString()}</p>
                    </CardContent>
                </Card>
                <Card className="md:col-span-2">
                    <CardHeader>
                        <CardTitle>Earnings Over Time</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <PlaceholderChart />
                    </CardContent>
                </Card>
            </div>
            
            <h2 className="text-2xl font-bold mb-4">Recent Transactions</h2>
            <Card>
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>Date</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead className="text-right">Amount</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {earningsData.transactions.map((transaction) => (
                            <TableRow key={transaction.id}>
                                <TableCell>{transaction.date}</TableCell>
                                <TableCell>{transaction.description}</TableCell>
                                <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </Card>
        </div>
    );
} 