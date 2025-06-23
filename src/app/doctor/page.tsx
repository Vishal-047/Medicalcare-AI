"use client";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useEffect, useState } from "react";

// Mocked doctor data with Indian names
const MOCK_DOCTORS = [
  { id: 1, name: "Dr. Arjun Sharma", speciality: "Cardiology", location: { city: "Delhi", lat: 28.6139, lng: 77.2090 }, avatar: "/placeholder.svg" },
  { id: 2, name: "Dr. Priya Patel", speciality: "Dermatology", location: { city: "Mumbai", lat: 19.0760, lng: 72.8777 }, avatar: "/placeholder.svg" },
  { id: 3, name: "Dr. Rohan Das", speciality: "Pediatrics", location: { city: "Kolkata", lat: 22.5726, lng: 88.3639 }, avatar: "/placeholder.svg" },
  { id: 4, name: "Dr. Ananya Reddy", speciality: "Orthopedics", location: { city: "Hyderabad", lat: 17.3850, lng: 78.4867 }, avatar: "/placeholder.svg" },
  { id: 5, name: "Dr. Vikram Singh", speciality: "Neurology", location: { city: "Chennai", lat: 13.0827, lng: 80.2707 }, avatar: "/placeholder.svg" },
  { id: 6, name: "Dr. Aisha Khan", speciality: "Cardiology", location: { city: "Bangalore", lat: 12.9716, lng: 77.5946 }, avatar: "/placeholder.svg" },
];

// Helper to calculate distance between two lat/lng points (Haversine formula)
function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
  const toRad = (v: number) => (v * Math.PI) / 180;
  const R = 6371; // km
  const dLat = toRad(lat2 - lat1);
  const dLng = toRad(lng2 - lng1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export default function DoctorDirectory() {
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [locationError, setLocationError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpeciality, setSelectedSpeciality] = useState("All");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        },
        () => {
          // Fallback: New York
          setUserLocation({ lat: 40.7128, lng: -74.006 });
          setLocationError("Location access denied. Showing doctors near New York.");
        }
      );
    } else {
      setUserLocation({ lat: 40.7128, lng: -74.006 });
      setLocationError("Geolocation not supported. Showing doctors near New York.");
    }
  }, []);

  const specialities = ["All", ...Array.from(new Set(MOCK_DOCTORS.map(doc => doc.speciality)))];

  const filteredDoctors = MOCK_DOCTORS.filter(doc => {
    const nameMatch = doc.name.toLowerCase().includes(searchTerm.toLowerCase());
    const specialityMatch = selectedSpeciality === "All" || doc.speciality === selectedSpeciality;
    return nameMatch && specialityMatch;
  });

  // Nearby doctors: within 50km
  const nearbyDoctors = userLocation
    ? filteredDoctors.filter((doc) => getDistance(userLocation.lat, userLocation.lng, doc.location.lat, doc.location.lng) < 50)
    : [];

  // Group by speciality
  const groupedNearby = nearbyDoctors.reduce((acc: Record<string, typeof MOCK_DOCTORS>, doc) => {
    acc[doc.speciality] = acc[doc.speciality] || [];
    acc[doc.speciality].push(doc);
    return acc;
  }, {});

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-50">Doctor Directory</h1>
        <p className="text-slate-500 dark:text-slate-400">Browse all doctors registered on Medicare-AI and find nearby specialists.</p>
      </div>

      <div className="flex space-x-4">
        <Input 
          placeholder="Search by doctor name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-xs"
        />
        <Select value={selectedSpeciality} onValueChange={setSelectedSpeciality}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select Speciality" />
          </SelectTrigger>
          <SelectContent>
            {specialities.map(speciality => (
              <SelectItem key={speciality} value={speciality}>{speciality}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* All Doctors Section */}
      <Card className="bg-white dark:bg-slate-900 mt-8">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-50">All Doctors on Medicare-AI</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Doctor</TableHead>
                <TableHead>Speciality</TableHead>
                <TableHead>City</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredDoctors.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar>
                        <AvatarImage src={doc.avatar} />
                        <AvatarFallback>{doc.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <span className="font-medium text-slate-900 dark:text-slate-50">{doc.name}</span>
                    </div>
                  </TableCell>
                  <TableCell>{doc.speciality}</TableCell>
                  <TableCell>{doc.location.city}</TableCell>
                  <TableCell>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button variant="outline">Book Appointment</Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto">
                        <div className="flex flex-col space-y-2">
                          <Button variant="ghost">Book on Call</Button>
                          <Button variant="ghost">Book Physical Meetup</Button>
                        </div>
                      </PopoverContent>
                    </Popover>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Nearby Doctors Section */}
      <Card className="bg-white dark:bg-slate-900 mt-8">
        <CardHeader>
          <CardTitle className="text-slate-900 dark:text-slate-50">Nearby Doctors by Speciality</CardTitle>
        </CardHeader>
        <CardContent>
          {locationError && (
            <div className="mb-4 text-sm text-yellow-600 dark:text-yellow-400">{locationError}</div>
          )}
          {Object.keys(groupedNearby).length === 0 ? (
            <div className="text-slate-600 dark:text-slate-300">No nearby doctors found.</div>
          ) : (
            Object.entries(groupedNearby).map(([speciality, docs]) => (
              <div key={speciality} className="mb-6">
                <h3 className="font-semibold text-lg text-indigo-700 dark:text-indigo-300 mb-2">{speciality}</h3>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Doctor</TableHead>
                      <TableHead>City</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {docs.map((doc) => (
                      <TableRow key={doc.id}>
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <Avatar>
                              <AvatarImage src={doc.avatar} />
                              <AvatarFallback>{doc.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium text-slate-900 dark:text-slate-50">{doc.name}</span>
                          </div>
                        </TableCell>
                        <TableCell>{doc.location.city}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
