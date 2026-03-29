import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Activity, Pill, Scale } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface UserProfile {
    name: string;
    email: string;
    date_of_birth: string;
    age: number | null;
    gender: string;
    phone_number: string;
    address: string;
    avatar: string;
}

interface Reminder {
    id: number;
    reminder_type: string;
    reminder_message: string;
    reminder_time: string;
    is_active: boolean;
}

interface HealthRecord {
    id: number;
    record_type: string;
    record_value: string;
    created_at: string;
}

interface MedicineReport {
    id: number;
    medicine_name: string;
    dosage: string;
    schedule: string;
    next_dose: string;
    price: string;
    created_at: string;
}

export default function Dashboard() {
    const { auth, upcomingReminders, latestHealthRecords, recentMedicines, userProfile } = usePage<
        SharedData & {
            upcomingReminders: Reminder[];
            latestHealthRecords: HealthRecord;
            recentMedicines: MedicineReport;
            userProfile: UserProfile;
        }
    >().props;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Welcome ${auth.user.name}`,
            href: '/dashboard',
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health" />
            <div className="flex h-full flex-1 flex-col gap-6 p-4 md:p-6">
                <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Profile Summary */}
                    <Card className="h-[400px] overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Scale className="h-5 w-5" />
                                Profile Summary
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 overflow-y-auto">
                            <div className="grid grid-cols-2 gap-2 rounded-lg bg-muted p-3">
                                <div>
                                    <div className="text-sm text-muted-foreground">Age</div>
                                    <div className="text-base font-medium">
                                        {userProfile.age || 'Not set'}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm text-muted-foreground">Gender</div>
                                    <div className="text-base font-medium">
                                        {userProfile.gender || 'Not set'}
                                    </div>
                                </div>
                            </div>
                            {/* More profile fields can be added here with similar style */}
                        </CardContent>
                    </Card>

                    {/* Latest Added Medicine */}
                    <Card className="h-[400px] overflow-hidden">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Pill className="h-5 w-5" />
                                Latest Added Medicine
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 overflow-y-auto">
                            {recentMedicines && recentMedicines.length > 0 ? (
                                recentMedicines.map((medicine) => (
                                    <div
                                        key={medicine.id}
                                        className="rounded-lg bg-muted p-3 transition-colors hover:bg-muted/80"
                                    >
                                        <div className="font-medium capitalize">
                                            {medicine.medicine_name}
                                        </div>
                                        <div className="text-lg font-semibold">
                                            {medicine.price}
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {format(new Date(medicine.created_at), 'PPP')}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-muted-foreground">
                                    No health records available
                                </div>
                            )}
                        </CardContent>
                    </Card>

                    {/* Health Records */}
                    <Card className="h-[400px] overflow-hidden md:col-span-2 lg:col-span-1">
                        <CardHeader className="pb-2">
                            <CardTitle className="flex items-center gap-2 text-lg">
                                <Activity className="h-5 w-5" />
                                Latest Health Record
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3 overflow-y-auto">
                            {latestHealthRecords && latestHealthRecords.length > 0 ? (
                                latestHealthRecords.map((record) => (
                                    <div
                                        key={record.id}
                                        className="rounded-lg bg-muted p-3 transition-colors hover:bg-muted/80"
                                    >
                                        <div className="text-sm font-medium capitalize">
                                            {record.record_type}
                                        </div>
                                        <div className="text-lg font-semibold">
                                            {record.record_value}
                                        </div>
                                        <div className="mt-1 text-xs text-muted-foreground">
                                            {format(new Date(record.created_at), 'PPP')}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-muted-foreground">
                                    No health records available
                                </div>
                            )}
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}