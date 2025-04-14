import Heading from '@/components/heading';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, router, usePage } from '@inertiajs/react';
type Props = {
record: {
    id: number;
  
  created_at: string;
  name: string;
  record_details: string;
  record_file: string;
  visibility: string;
  value: string;
}    
}


const Show = ({ record }: Props) => {
const { auth } = usePage<SharedData>().props;
   // only date and time so seperating into date and time
   const DateAndTime = record.created_at.split('.')[0].split('T');
   const Date = DateAndTime[0];
   const Time = DateAndTime[1];
   const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `welcome ${auth.user.name}`,
        href: '/showReport',
    },
];
const deleteHandle = () => {
    if (window.confirm('Are you sure you want to delete this record?')) {
      router.delete(`/health-record/${record.id}/delete`,{
        onStart:()=>{
          console.log('Deleting record...');
        },
        onSuccess:()=>{
          console.log('Record deleted successfully!');
        },
        onError:(error)=>{
          console.log('Error deleting record:', error);
        },
      }) ;
    }
  };
  return (
    <AppLayout  breadcrumbs={breadcrumbs}>
<Head title='Display' />
<div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center items-center py-10 px-4">
  <button
    onClick={() => window.print()}
    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 py-2 rounded-lg shadow transition duration-200 dark:bg-blue-500 dark:hover:bg-blue-600"
    title="Shortcut: Ctrl+P (Cmd+P on Mac)"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M6 9V2h12v7m-6 4v6m-4 0h8M4 13h16v6H4v-6z"
      />
    </svg>
    Export as PDF
  </button>

  <div className="bg-white dark:bg-gray-800 shadow-md rounded-2xl p-8 max-w-xl w-full space-y-6 relative">
    {/* Header with Report Name and Date */}
    <div className="flex justify-between items-start">
      <div>
        <h1 className="text-xl font-semibold text-gray-800 dark:text-white">Report Name</h1>
        <span className="text-gray-600 dark:text-gray-300 block">{record.name}</span>
      </div>

      {/* Date and Time */}
      <div className="text-right">
        <p className="text-sm text-gray-500 dark:text-gray-400">Added Date</p>
        <span className="text-sm text-gray-600 dark:text-gray-300">{Date}</span>
      </div>
      <div className="text-right">
        <p className="text-sm text-gray-500 dark:text-gray-400">Added Time</p>
        <span className="text-sm text-gray-600 dark:text-gray-300">{Time}</span>
      </div>
    </div>

    {/* Record Details */}
    <div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Record Details</p>
      <span className="text-gray-600 dark:text-gray-400 block">{record.record_details}</span>
    </div>

    {/* Record File */}
    {record.record_file && (
      <div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Record File:</p>
        <img
          src={`/storage/${record.record_file}`}
          alt={record.name}
          className="mt-2 rounded-lg border border-gray-200 dark:border-gray-700 max-w-full h-auto"
        />
      </div>
    )}

    {/* Visibility */}
    <div>
      <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Record Visibility</p>
      <span className="text-gray-600 dark:text-gray-400 block">{record.visibility}</span>
    </div>

    {/* Value */}
    {record.value && (
      <div>
        <p className="text-lg font-medium text-gray-700 dark:text-gray-200">Value</p>
        <span className="text-gray-600 dark:text-gray-400 block">{record.value}</span>
      </div>
    )}

    {/* Action buttons */}
    <div className="w-full flex justify-between items-center gap-8 py-4 px-6 border rounded-xl shadow-sm bg-white dark:bg-gray-800 dark:border-gray-700">
      {/* Left block */}
      <div className="flex flex-col">
        <p className="text-black dark:text-white text-sm mb-1">Cannot edit after</p>
        <span className="text-red-600 dark:text-red-500 text-xl font-semibold leading-tight">1m</span>
        <Link href={`/health-record/${record.id}/edit`} className="mt-3 bg-green-500 hover:bg-green-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200 dark:bg-green-600 dark:hover:bg-green-700">
          Edit
        </Link>
      </div>

      {/* Right block */}
      <div className="flex flex-col items-end">
        <p className="text-black dark:text-white text-sm mb-1">Cannot delete after</p>
        <span className="text-gray-800 dark:text-gray-300 text-xl font-semibold leading-tight">1m</span>
        <button onClick={deleteHandle} className="mt-3 bg-red-500 hover:bg-red-600 text-white font-semibold px-5 py-2 rounded-lg shadow transition duration-200 dark:bg-red-600 dark:hover:bg-red-700">
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
