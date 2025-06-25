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
        record_type: string;
        visibility: string;
        value?: string | null;
    };
};

const Show = ({ record }: Props) => {
    const { auth, message } = usePage<SharedData>().props;

    const createdDate = new Date(record.created_at);
    const updatedDate = new Date(record.updated_at);
    const now = new Date();

    const date = createdDate.toLocaleDateString();
    const time = createdDate.toLocaleTimeString();

    const diffMs = now.getTime() - updatedDate.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);
    const editable = diffHours <= 6;

    const diffMinutes = editable ? Math.max(0, 6 * 60 - Math.floor(diffMs / (1000 * 60))) : 0;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `Welcome ${auth.user.name}`,
            href: '/showReport',
        },
    ];

    const deleteHandle = () => {
        if (window.confirm('Are you sure you want to delete this record?')) {
            router.delete(`/health-record/${record.id}/delete`, {
                onStart: () => console.log('Deleting record...'),
                onSuccess: () => console.log('Record deleted successfully!'),
                onError: (error) => console.log('Error deleting record:', error),
            });
        }
    };

    const fileUrl = `/health-record/file/${record.record_file}`;
    const isPdf = record.record_file?.toLowerCase().endsWith('.pdf');
    const isImage = record.record_file?.toLowerCase().endsWith('.png') || record.record_file?.toLowerCase().endsWith('.jpg') || record.record_file?.toLowerCase().endsWith('.jpeg');

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Display" />
            {message && <div className="bg-red-500 p-2 mb-4 text-white">{message}</div>}

            <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4 py-10 dark:bg-gray-900">
                <button
                    onClick={() => window.print()}
                    className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 font-medium text-white shadow hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 9V2h12v7m-6 4v6m-4 0h8M4 13h16v6H4v-6z" />
                    </svg>
                    Export as PDF
                </button>

                <div className="relative w-full max-w-xl space-y-6 rounded-2xl bg-white p-8 shadow-md dark:bg-gray-800">
                    <div className="flex items-start justify-between gap-4">
                        <div>
                            <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Report Name</h1>
                            <span className="block text-gray-600 dark:text-gray-300">{record.name}</span>
                        </div>

                        <div className="text-right">
                            <p className="text-sm text-gray-500 dark:text-gray-400">Added Date</p>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{date}</span>
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Added Time</p>
                            <span className="text-sm text-gray-600 dark:text-gray-300">{time}</span>
                        </div>
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Record Details</p>
                        <p className="text-gray-600 dark:text-gray-400 whitespace-pre-line">{record.record_details}</p>
                    </div>

                    {record.record_file && (
                        <div>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Record File</p>
                            {isImage ? (
                                <img
                                    src={fileUrl}
                                    alt={record.name}
                                    className="mt-2 h-auto max-w-full rounded-lg border border-gray-200 dark:border-gray-700"
                                />
                            ) : isPdf ? (
                                <object
                                    data={fileUrl}
                                    type="application/pdf"
                                    width="100%"
                                    height="600px"
                                    className="border border-gray-200 dark:border-gray-700 rounded-lg"
                                >
                                    <p className="text-center text-gray-600 dark:text-gray-400">
                                        PDF preview not supported by your browser.
                                    </p>
                                </object>
                            ) : (
                                <p className="text-gray-600 dark:text-gray-400">Preview not available for this file type.</p>
                            )}
                        </div>
                    )}

                    <div>
                        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Visibility</p>
                        <span className="block text-gray-600 dark:text-gray-400">{record.visibility}</span>
                    </div>

                    {record.value && (
                        <div>
                            <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Value</p>
                            <span className="block text-gray-600 dark:text-gray-400">{record.value}</span>
                        </div>
                    )}

                    <div className="flex w-full items-center justify-between gap-8 rounded-xl border bg-white px-6 py-4 shadow-sm dark:border-gray-700 dark:bg-gray-800">
                        <div className="flex flex-col">
                            <p className="mb-1 text-sm text-black dark:text-white">Can edit for</p>
                            <span className="text-xl font-semibold text-red-600 dark:text-red-500">
                                {Math.floor(diffMinutes / 60)}h {diffMinutes % 60}m
                            </span>

                            {editable ? (
                                <Link
                                    href={`/health-record/${record.id}/edit`}
                                    className="mt-3 rounded-lg bg-green-500 px-5 py-2 font-semibold text-white shadow hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
                                >
                                    Edit
                                </Link>
                            ) : (
                                <span className="mt-3 rounded-lg bg-gray-400 px-5 py-2 font-semibold text-white shadow cursor-not-allowed">
                                    Edit
                                </span>
                            )}
                        </div>

                        <div className="flex flex-col items-end">
                            <p className="mb-1 text-sm text-black dark:text-white">Can delete for</p>
                            <span className="text-xl font-semibold text-gray-800 dark:text-gray-300">
                                {Math.floor(diffMinutes / 60)}h {diffMinutes % 60}m
                            </span>

                            <button
                                disabled={!editable}
                                onClick={deleteHandle}
                                className={`mt-3 rounded-lg px-5 py-2 font-semibold text-white shadow transition duration-200 ${
                                    editable
                                        ? 'bg-red-500 dark:bg-red-600 hover:bg-red-600 dark:hover:bg-red-700'
                                        : 'bg-gray-400 cursor-not-allowed'
                                }`}
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
