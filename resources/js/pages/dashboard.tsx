import AppLayout from '@/layouts/app-layout';
import { SharedData, type BreadcrumbItem } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { format } from 'date-fns';
import { Activity, Pill, Scale } from 'lucide-react';

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
            title: `welcome ${auth.user.name}`,
            href: '/dashboard',
        },
    ];
    return (
        <div>
            <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="Health" />
                <div className="flex h-full flex-1 flex-col gap-4 rounded-xl p-4">
                    <div className="grid auto-rows-min gap-4 md:grid-cols-3">
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[400px] overflow-hidden rounded-xl border p-4">
                            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                                <Scale className="h-5 w-5" />
                                Profile Summary
                            </h2>
                            <div className="max-h-[calc(100%-3rem)] space-y-3 overflow-y-auto">
                                <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                                    <div className="grid grid-cols-2 gap-2">
                                        <div>
                                            <div className="text-sm text-neutral-600 dark:text-neutral-400">Age</div>
                                            <div className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                                                {userProfile.age || 'Not set'}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-neutral-600 dark:text-neutral-400">Gender</div>
                                            <div className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                                                {userProfile.gender || 'Not set'}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                                    <div className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">Phone Number</div>
                                    <div className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                                        {userProfile.phone_number || 'Not set'}
                                    </div>
                                </div>
                                <div className="rounded-lg bg-neutral-100 p-3 dark:bg-neutral-800">
                                    <div className="mb-1 text-sm text-neutral-600 dark:text-neutral-400">Address</div>
                                    <div className="text-base font-medium text-neutral-900 dark:text-neutral-100">
                                        {userProfile.address || 'Not set'}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[400px] overflow-hidden rounded-xl border p-4">
                            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                                <Pill className="h-5 w-5" />
                                Reminders
                            </h2>
                            <div className="max-h-[calc(100%-2rem)] space-y-2 overflow-auto">
                                {upcomingReminders?.slice(0, 3).map((reminder) => (
                                    <div key={reminder.id} className="rounded-lg bg-neutral-100 p-2 dark:bg-neutral-800">
                                        <div className="text-sm font-medium capitalize">{reminder.reminder_type}</div>
                                        <div className="text-sm text-neutral-600 dark:text-neutral-400">{reminder.reminder_message}</div>
                                        <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">{reminder.reminder_time}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[400px] rounded-xl border p-4">
                            <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                                <Activity className="h-5 w-5" />
                                Latest Added Medicine
                            </h2>
                            <div className="max-h-[calc(100%-2.75rem)] space-y-3 overflow-y-auto pr-2">
                                {recentMedicines && recentMedicines.length > 0 ? (
                                    recentMedicines.map((recentMedicine) => (
                                        <div key={recentMedicine.id} className="rounded-xl bg-neutral-100 p-4 shadow-sm dark:bg-neutral-800">
                                            <div className="text-sm font-medium capitalize">{recentMedicine.medicine_name}</div>
                                            <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">{recentMedicine.price}</div>
                                            <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                                                {format(new Date(recentMedicine.created_at), 'PPP')}
                                            </div>
                                        </div>
                                    ))
                                ) : (
                                    <div className="text-sm text-neutral-500 dark:text-neutral-400">No health records available</div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="border-sidebar-border/70 dark:border-sidebar-border relative h-[400px] rounded-xl border p-4">
                        <h2 className="mb-3 flex items-center gap-2 text-lg font-semibold">
                            <Activity className="h-5 w-5" />
                            Latest Health Record
                        </h2>

                        <div className="max-h-[calc(100%-2.75rem)] space-y-3 overflow-y-auto pr-1">
                            {latestHealthRecords && latestHealthRecords.length > 0 ? (
                                latestHealthRecords.map((latestHealthRecord) => (
                                    <div key={latestHealthRecord.id} className="rounded-lg bg-neutral-100 p-4 dark:bg-neutral-800">
                                        <div className="text-sm font-medium capitalize">{latestHealthRecord.record_type}</div>
                                        <div className="text-lg font-semibold text-neutral-900 dark:text-neutral-100">
                                            {latestHealthRecord.record_value}
                                        </div>
                                        <div className="mt-1 text-xs text-neutral-500 dark:text-neutral-500">
                                            {format(new Date(latestHealthRecord.created_at), 'PPP')}
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-neutral-500 dark:text-neutral-400">No health records available</div>
                            )}
                        </div>
                    </div>
                </div>
            </AppLayout>
        </div>
    );
}
