import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function ProfilePage() {
    const doctorProfile = {
        name: "Dr. Emily Carter",
        email: "emily.carter@medicare.com",
        phone: "987-654-3210",
        avatar: "/placeholder.svg",
        specialty: "Cardiology",
        licenseNumber: "MD123456",
    };

    return (
        <div>
            <h1 className="text-3xl font-bold mb-6">Profile</h1>
            <Card>
                <CardHeader>
                    <div className="flex items-center">
                        <Avatar className="h-24 w-24 mr-6">
                            <AvatarImage src={doctorProfile.avatar} alt={doctorProfile.name} />
                            <AvatarFallback>{doctorProfile.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold">{doctorProfile.name}</h2>
                            <p className="text-gray-500 dark:text-gray-400">{doctorProfile.specialty}</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <form>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <Label htmlFor="name">Full Name</Label>
                                <Input id="name" defaultValue={doctorProfile.name} />
                            </div>
                            <div>
                                <Label htmlFor="email">Email Address</Label>
                                <Input id="email" type="email" defaultValue={doctorProfile.email} />
                            </div>
                            <div>
                                <Label htmlFor="phone">Phone Number</Label>
                                <Input id="phone" type="tel" defaultValue={doctorProfile.phone} />
                            </div>
                            <div>
                                <Label htmlFor="specialty">Specialty</Label>
                                <Input id="specialty" defaultValue={doctorProfile.specialty} />
                            </div>
                            <div className="md:col-span-2">
                                <Label htmlFor="license">License Number</Label>
                                <Input id="license" defaultValue={doctorProfile.licenseNumber} readOnly />
                            </div>
                        </div>
                        <div className="mt-6 text-right">
                            <Button type="submit">Save Changes</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    );
} 