import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";

export default function PatientDetailPage({ params }: { params: { id: string } }) {
  // In a real app, you would fetch patient data based on the id
  const patient = {
    id: params.id,
    name: "John Doe",
    age: 45,
    gender: "Male",
    email: "john.doe@example.com",
    phone: "123-456-7890",
    avatar: "/placeholder.svg",
    medicalHistory: "Has a history of hypertension and is allergic to penicillin.",
    recentAppointments: [
      { date: "2024-07-20", reason: "Annual Check-up" },
      { date: "2024-05-10", reason: "Follow-up on hypertension" },
    ],
    notes: "Patient is responding well to current medication.",
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <Avatar className="h-24 w-24 mr-6">
          <AvatarImage src={patient.avatar} alt={patient.name} />
          <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-3xl font-bold">{patient.name}</h1>
          <p className="text-lg text-gray-500 dark:text-gray-400">Patient ID: {patient.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader><CardTitle>Personal Information</CardTitle></CardHeader>
          <CardContent>
            <p><strong>Age:</strong> {patient.age}</p>
            <p><strong>Gender:</strong> {patient.gender}</p>
            <p><strong>Email:</strong> {patient.email}</p>
            <p><strong>Phone:</strong> {patient.phone}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader><CardTitle>Medical History</CardTitle></CardHeader>
          <CardContent>
            <p>{patient.medicalHistory}</p>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Recent Appointments</CardTitle></CardHeader>
          <CardContent>
            <ul>
              {patient.recentAppointments.map((appt, index) => (
                <li key={index} className="mb-2"><strong>{appt.date}:</strong> {appt.reason}</li>
              ))}
            </ul>
          </CardContent>
        </Card>

        <Card className="md:col-span-2">
          <CardHeader><CardTitle>Doctor's Notes</CardTitle></CardHeader>
          <CardContent>
            <p>{patient.notes}</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 