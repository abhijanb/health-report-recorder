import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
type Props = {
    record: {
        id: number;
        created_at: string;
        updated_at: string;
        name: string;
        record_details: string;
        record_file: string;
        visibility: string;
        value: string;
    };
};

const Show = ({ record }: Props) => {
    const { auth } = usePage<SharedData>().props;
    // only date and time so seperating into date and time
    const createdDate = new Date(record.created_at);
    const updatedDate = new Date(record.updated_at);
    const now = new Date();

    // ✅ Extract readable date & time
    const date = createdDate.toLocaleDateString(); // e.g., '4/14/2025'
    const time = createdDate.toLocaleTimeString(); // e.g., '6:15:00 AM'

    // ✅ Calculate hours since creation
    const diffMs = now.getTime() - createdDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    let diffMinutes = 0
    if (diffHours < 4) {
       diffMinutes = Math.ceil(diffMs / (1000 * 60));
    }
    // ✅ Editability logic
    const editable = updatedDate.getTime() === createdDate.getTime() && diffHours <= 4;
console.log(editable)
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `welcome ${auth.user.name}`,
            href: '/showReport',
        },
    ];
    const deleteHandle = () => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            router.delete(`/health-record/${record.id}/delete`, {
                onStart: () => {
                    console.log('Deleting record...');
                },
                onSuccess: () => {
                    console.log('Record deleted successfully!');
                },
                onError: (error) => {
                    console.log('Error deleting record:', error);
                },
            });
        }
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Display" />
            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-900">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow transition duration-200 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                    title="Shortcut: Ctrl+P (Cmd+P on Mac)"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9V2h12v7m-6 4v6m-4 0h8M4 13h16v6H4v-6z" />
                    </svg>
                    Export as PDF
                </button>

                <div className="relative w-full max-w-xl space-y-6 rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800">
                    {/* Header with Report Name and Date */}
                    <div className="flex items-start justify-between">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Report Name</h1>
                            <span className="block text-gray-600 dark:text-gray-300">{record.name}</span>
                        </div>

                        {/* Date and Time */}
                        <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Added Date</p>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{date}</span>
                        </div>
                        <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Added Time</p>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{time}</span>
                        </div>
                    </div>

                    {/* Record Details */}
                    <div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Record Details</p>
                        <span className="block text-gray-600 dark:text-gray-400">{record.record_details}</span>
                    </div>

                    {/* Record File */}
                    {record.record_file && (
                        <div>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Record File:</p>
                            <img
                                src={`/storage/${record.record_file}`}
                                alt={record.name}
                                className="mt-2 h-auto max-w-full rounded-lg border border-gray-200 dark:border-gray-700"
                            />
                        </div>
                    )}

                    {/* Visibility */}
                    <div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Record Visibility</p>
                        <span className="block text-gray-600 dark:text-gray-400">{record.visibility}</span>
                    </div>

                    {/* Value */}
                    {record.value && (
                        <div>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Value</p>
                            <span className="block text-gray-600 dark:text-gray-400">{record.value}</span>
                        </div>
                    )}

                    {/* Action buttons */}
                    <div className="flex w-full items-center justify-between gap-8 rounded-xl border bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        {/* Left block */}
                        <div className="flex flex-col">
                            <p className="mb-1 text-sm text-black dark:text-white">Cannot edit after</p>
                            <span className="text-xl leading-tight font-semibold text-red-600 dark:text-red-500">{diffMinutes}m</span>
                            {editable ? (
  <Link
    href={`/health-record/${record.id}/edit`}
    className="mt-3 rounded-lg bg-green-500 px-5 py-2 font-semibold text-white shadow transition duration-200 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
  >
    Edit
  </Link>
) : (
  <span className="mt-3 rounded-lg bg-gray-400 px-5 py-2 font-semibold text-white shadow cursor-not-allowed">
    Edit
  </span>
)}

                        </div>

                        {/* Right block */}
                        <div className="flex flex-col items-end">
                            <p className="mb-1 text-sm text-black dark:text-white">Cannot delete after</p>
                            <span className="text-xl leading-tight font-semibold text-gray-800 dark:text-gray-300">{diffMinutes}m</span>
                            <button
                            disabled={!editable}
                                onClick={deleteHandle}
                                className={`mt-3 rounded-lg ${editable ? "bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700" : "bg-gray-400 cursor-not-allowed "} px-5 py-2 font-semibold text-white shadow transition duration-200   `}
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Show;
