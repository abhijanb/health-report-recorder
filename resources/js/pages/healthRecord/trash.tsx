import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React from 'react';

const TrashTable = ({ data,message }) => {
     const breadcrumbs: BreadcrumbItem[] = [
            {
                title: "trashed record" ,
                href: '/showReport',
            },
        ];
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="trash" />
            <div className="max-w-7xl mx-auto px-4 py-6">
  <h2 className="text-2xl font-semibold mb-4 text-gray-800 dark:text-gray-100">
    🗑️ Trashed Records
  </h2>

    {message ? <div className='text-green-500'>{message}</div> : ""}
  <div className="overflow-x-auto bg-white dark:bg-gray-800 shadow-md rounded-lg">
    <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-200">
      <thead className="bg-gray-100 dark:bg-gray-700 text-xs uppercase text-gray-600 dark:text-gray-300">
        <tr>
          <th className="px-6 py-3">ID</th>
          <th className="px-6 py-3">Name</th>
          <th className="px-6 py-3">Type</th>
          <th className="px-6 py-3">Details</th>
          <th className="px-6 py-3">Deleted At</th>
          <th className="px-6 py-3">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td
              colSpan="6"
              className="px-6 py-4 text-center text-gray-500 dark:text-gray-400"
            >
              No deleted records.
            </td>
          </tr>
        ) : (
          data.map((record) => (
            <tr
              key={record.id}
              className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700"
            >
              <td className="px-6 py-4">{record.id}</td>
              <td className="px-6 py-4">{record.name}</td>
              <td className="px-6 py-4 capitalize">{record.record_type}</td>
              <td className="px-6 py-4">{record.record_details}</td>
              <td className="px-6 py-4">
                {new Date(record.deleted_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 space-x-2">
              
                <Link className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition" href={`/health-record/${record.id}/restore`}>restore</Link>
                <Link href={`/health-record/${record.id}/permanent`}
                 
                  className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition"
                >
                  Delete Forever
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  </div>
</div>

    </AppLayout>
  );
};

// Dummy handler functions


export default TrashTable;
