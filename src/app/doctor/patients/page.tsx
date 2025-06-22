import { Card } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import Link from "next/link";

export default function PatientsPage() {
  const patients = [
    { id: 1, name: "John Doe", age: 45, gender: "Male", lastVisit: "2024-07-20" },
    { id: 2, name: "Jane Smith", age: 34, gender: "Female", lastVisit: "2024-07-18" },
    { id: 3, name: "Sam Wilson", age: 52, gender: "Male", lastVisit: "2024-07-15" },
    { id: 4, name: "Alice Johnson", age: 28, gender: "Female", lastVisit: "2024-07-12" },
    { id: 5, name: "Robert Brown", age: 61, gender: "Male", lastVisit: "2024-07-10" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Patients</h1>
      <Card>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Age</TableHead>
              <TableHead>Gender</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.id}>
                <TableCell>{patient.name}</TableCell>
                <TableCell>{patient.age}</TableCell>
                <TableCell>{patient.gender}</TableCell>
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