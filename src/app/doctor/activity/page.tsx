import { Card, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import Link from "next/link";

export default function ActivityPage() {
  const collaborators = [
    { id: "doc1", name: "Dr. Sarah Johnson", specialty: "Pediatrics", email: "sarah.j@medicare.com", avatar: "/placeholder.svg" },
    { id: "doc2", name: "Dr. Michael Chen", specialty: "Neurology", email: "michael.c@medicare.com", avatar: "/placeholder.svg" },
    { id: "doc3", name: "Dr. Lisa Rodriguez", specialty: "Oncology", email: "lisa.r@medicare.com", avatar: "/placeholder.svg" },
  ];

  const operations = [
    { id: "op1", patientName: "John Doe", patientId: "1", operation: "Appendectomy", date: "2024-07-15", collaborators: ["Dr. Sarah Johnson"] },
    { id: "op2", patientName: "Robert Brown", patientId: "5", operation: "Coronary Artery Bypass", date: "2024-06-28", collaborators: ["Dr. Michael Chen", "Dr. Lisa Rodriguez"] },
    { id: "op3", patientName: "Jane Smith", patientId: "2", operation: "Knee Replacement", date: "2024-06-10", collaborators: [] },
  ];

  const consultations = [
    { id: "con1", patientName: "Alice Johnson", patientId: "4", reason: "Annual Check-up", date: "2024-07-12" },
    { id: "con2", patientName: "Sam Wilson", patientId: "3", reason: "Follow-up on blood pressure", date: "2024-07-08" },
    { id: "con3", patientName: "John Doe", patientId: "1", reason: "Pre-operative assessment", date: "2024-07-05" },
  ];

  const allPatients = [
    { id: 1, name: "John Doe", lastVisit: "2024-07-20", avatar: "/placeholder.svg" },
    { id: 2, name: "Jane Smith", lastVisit: "2024-07-18", avatar: "/placeholder.svg" },
    { id: 3, name: "Sam Wilson", lastVisit: "2024-07-15", avatar: "/placeholder.svg" },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold mb-6" id="collaborators">Collaborating Doctors</h1>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Doctor</TableHead>
                  <TableHead>Specialty</TableHead>
                  <TableHead>Contact</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {collaborators.map((doctor) => (
                  <TableRow key={doctor.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-4"><AvatarImage src={doctor.avatar} /><AvatarFallback>{doctor.name.charAt(0)}</AvatarFallback></Avatar>
                        <span>{doctor.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{doctor.specialty}</TableCell>
                    <TableCell>{doctor.email}</TableCell>
                    <TableCell><Link href={`/doctor/collaborators/${doctor.id}`} className="text-blue-500 hover:underline">View Profile</Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6" id="operations">Operations Performed</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Operation</TableHead><TableHead>Patient</TableHead><TableHead>Collaborators</TableHead></TableRow></TableHeader>
              <TableBody>
                {operations.map((op) => (
                  <TableRow key={op.id}>
                    <TableCell>{op.date}</TableCell>
                    <TableCell className="font-medium">{op.operation}</TableCell>
                    <TableCell><Link href={`/doctor/patients/${op.patientId}`} className="text-blue-500 hover:underline">{op.patientName}</Link></TableCell>
                    <TableCell>{op.collaborators.join(", ") || "None"}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6" id="consultations">Medical Consultations</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Date</TableHead><TableHead>Patient</TableHead><TableHead>Reason for Visit</TableHead></TableRow></TableHeader>
              <TableBody>
                {consultations.map((con) => (
                  <TableRow key={con.id}>
                    <TableCell>{con.date}</TableCell>
                    <TableCell><Link href={`/doctor/patients/${con.patientId}`} className="text-blue-500 hover:underline">{con.patientName}</Link></TableCell>
                    <TableCell>{con.reason}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>

      <div>
        <h2 className="text-3xl font-bold mb-6" id="attended-patients">All Attended Patients</h2>
        <Card>
          <CardContent className="p-0">
            <Table>
              <TableHeader><TableRow><TableHead>Patient</TableHead><TableHead>Last Visit Date</TableHead><TableHead>Actions</TableHead></TableRow></TableHeader>
              <TableBody>
                {allPatients.map((patient) => (
                  <TableRow key={patient.id}>
                    <TableCell>
                      <div className="flex items-center">
                        <Avatar className="h-10 w-10 mr-4"><AvatarImage src={patient.avatar} /><AvatarFallback>{patient.name.charAt(0)}</AvatarFallback></Avatar>
                        <span>{patient.name}</span>
                      </div>
                    </TableCell>
                    <TableCell>{patient.lastVisit}</TableCell>
                    <TableCell><Link href={`/doctor/patients/${patient.id}`} className="text-blue-500 hover:underline">View Medical Record</Link></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 