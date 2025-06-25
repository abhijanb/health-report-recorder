import React from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';

type HealthRecord = {
  id: number;
  name: string;
  record_type: string;
  record_details: string;
  record_file?: string;
  priority: string;
  status: string;
  value?: string | null;
  unit?: string;
  source?: string;
  tags?: string;
  created_at: string;
  updated_at: string;
};

type MedicineReport = {
  id: number;
  medicine_name: string;
  dosage?: string | null;
  frequency: 'once' | 'twice' | 'thrice' | 'daily';
  start_date?: string | null;
  end_date?: string | null;
  price?: number | null;
  store_name: string;
  prescription?: string | null;
  created_at: string;
  updated_at: string;
};

type Props = {
  results: {
    data: (HealthRecord | MedicineReport)[];
    current_page: number;
    last_page: number;
    first_page_url: string;
    last_page_url: string;
    next_page_url: string | null;
    prev_page_url: string | null;
    total: number;
    per_page: number;
  };
  type: 'health-record' | 'medicine'; // To distinguish data type
};

const Index = ({ results, type }: Props) => {
  return (
    <AppLayout>
      <div className="max-w-4xl mx-auto p-6">
        <h1 className="text-2xl font-semibold mb-4">
          {type === 'medicine' ? 'Medicine Reports' : 'Health Records'} Search Results
        </h1>

        {results.data.length === 0 ? (
          <p>No records found.</p>
        ) : (
          <>
            <ul className="space-y-4">
              {results.data.map((item) =>
                type === 'medicine' ? (
                  <li key={(item as MedicineReport).id}>
                    <Link
                      href={`/medicine/${(item as MedicineReport).id}/show`}
                      className="block border rounded p-4 shadow-sm hover:bg-gray-100 transition"
                    >
                      <h2 className="text-lg font-bold">{(item as MedicineReport).medicine_name}</h2>
                      {(item as MedicineReport).dosage && (
                        <p>Dosage: {(item as MedicineReport).dosage}</p>
                      )}
                      <p>Frequency: {(item as MedicineReport).frequency}</p>
                      {(item as MedicineReport).start_date && (
                        <p>
                          Start Date:{' '}
                          {new Date((item as MedicineReport).start_date!).toLocaleDateString()}
                        </p>
                      )}
                      {(item as MedicineReport).end_date && (
                        <p>
                          End Date:{' '}
                          {new Date((item as MedicineReport).end_date!).toLocaleDateString()}
                        </p>
                      )}
                      {(item as MedicineReport).price !== undefined && (
                        <p>Price: ${(item as MedicineReport).price!.toFixed(2)}</p>
                      )}
                      <p>Store: {(item as MedicineReport).store_name}</p>
                      {(item as MedicineReport).prescription && (
                        <p>Prescription: {(item as MedicineReport).prescription}</p>
                      )}
                      <p>
                        Created At: {new Date((item as MedicineReport).created_at).toLocaleString()}
                      </p>
                    </Link>
                  </li>
                ) : (
                  <li key={(item as HealthRecord).id}>
                    <Link
                      href={`/health-record/${(item as HealthRecord).id}/show`}
                      className="block border rounded p-4 shadow-sm hover:bg-gray-100 transition"
                    >
                      <h2 className="text-lg font-bold">{(item as HealthRecord).name}</h2>
                      <p>Type: {(item as HealthRecord).record_type}</p>
                      <p>Details: {(item as HealthRecord).record_details}</p>
                      {(item as HealthRecord).value && (
                        <p>
                          Value: {(item as HealthRecord).value} {(item as HealthRecord).unit}
                        </p>
                      )}
                      <p>Priority: {(item as HealthRecord).priority}</p>
                      <p>Status: {(item as HealthRecord).status}</p>
                      <p>Source: {(item as HealthRecord).source}</p>
                      <p>
                        Created At:{' '}
                        {new Date((item as HealthRecord).created_at).toLocaleString()}
                      </p>
                      {(item as HealthRecord).record_file && (
                        <img
                          src={`/health-record/file/${(item as HealthRecord).record_file}`}
                          alt={(item as HealthRecord).name}
                          className="mt-2 max-w-xs rounded border"
                        />
                      )}
                    </Link>
                  </li>
                )
              )}
            </ul>

            <nav className="mt-6 flex justify-center space-x-4">
              {results.prev_page_url && (
                <Link
                  href={results.prev_page_url}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Previous
                </Link>
              )}

              <span className="px-4 py-2 bg-gray-100 rounded">
                Page {results.current_page} of {results.last_page}
              </span>

              {results.next_page_url && (
                <Link
                  href={results.next_page_url}
                  className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
                >
                  Next
                </Link>
              )}
            </nav>
          </>
        )}
      </div>
    </AppLayout>
  );
};

export default Index;
