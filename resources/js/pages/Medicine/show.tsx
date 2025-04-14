import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router } from '@inertiajs/react';
import React from 'react';

const Show = ({ medicine }) => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: `Medicine Details`,
      href: '/dashboard',
    },
  ];

  const createdTime = new Date(medicine.created_at);
  const currentTime = new Date();
  const timeDiffInMinutes = Math.floor((currentTime.getTime() - createdTime.getTime()) / 60000);

  const canEdit = timeDiffInMinutes <= 200;
  const canDelete = timeDiffInMinutes <= 1000000;

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this medicine?')) {
      router.delete(route('medicine.destroy', medicine.id));
    }
  };

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Medicine" />

      <div className="max-w-xl mx-auto bg-white shadow-md rounded-2xl p-6 space-y-4">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Medicine Details</h2>

        <div className="space-y-2 text-sm text-gray-700">
          <p><span className="font-semibold">Name:</span> {medicine.medicine_name}</p>
          <p><span className="font-semibold">Dosage:</span> {medicine.dosage}</p>
          <p><span className="font-semibold">Frequency:</span> {medicine.frequency}</p>
          <p><span className="font-semibold">Start Date:</span> {medicine.start_date}</p>
          <p><span className="font-semibold">End Date:</span> {medicine.end_date}</p>
          <p><span className="font-semibold">Price:</span> ${medicine.price}</p>
          <p><span className="font-semibold">Store Name:</span> {medicine.store_name}</p>

          <div>
            <span className="font-semibold">Prescription:</span>
            {medicine.prescription.split('.').pop() === 'pdf' ? (
              <a
                href={`/viewPdf/${medicine.prescription}`}
                rel="noopener noreferrer"
                className="text-blue-600 underline ml-2"
              >
                Download PDF
              </a>
            ) : (
              <div className="mt-2">
                <img
                  src={`/storage/${medicine.prescription}`}
                  alt="Prescription"
                  className="rounded-md shadow-sm max-w-xs"
                />
              </div>
            )}
          </div>
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          {canEdit ? (
            <Link
              href={route('medicine.edit', medicine.id)}
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
            >
              Edit
            </Link>
          ) : (
            <button
              disabled
              className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded cursor-not-allowed"
            >
              Edit (Expired)
            </button>
          )}

          {canDelete ? (
            <button
              onClick={handleDelete}
              className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
            >
              Delete
            </button>
          ) : (
            <button
              disabled
              className="px-4 py-2 text-sm font-medium text-white bg-gray-400 rounded cursor-not-allowed"
            >
              Delete (Expired)
            </button>
          )}
        </div>
      </div>
    </AppLayout>
  );
};

export default Show;
