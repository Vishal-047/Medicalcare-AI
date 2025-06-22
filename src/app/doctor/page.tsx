import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";

export default function DoctorDashboard() {
  const doctorData = {
    patientsTreated: 125,
    rating: 4.8,
    earnings: 75000,
    patients: [
      { id: 1, name: "John Doe", lastVisit: "2024-07-20" },
      { id: 2, name: "Jane Smith", lastVisit: "2024-07-18" },
      { id: 3, name: "Sam Wilson", lastVisit: "2024-07-15" },
    ],
  };

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Card>
          <CardHeader>
            <CardTitle>Patients Treated</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{doctorData.patientsTreated}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Average Rating</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">{doctorData.rating} / 5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Earnings</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">${doctorData.earnings.toLocaleString()}</p>
          </CardContent>
        </Card>
      </div>
      
      <h2 className="text-2xl font-bold mb-4">Recent Patients</h2>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {doctorData.patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell>
                  <Link href={`/doctor/patients/${patient.id}`} className="text-blue-500 hover:underline">
                    View Details
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 