import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import { motion } from 'framer-motion';
import { useState } from 'react';
enum Visibility {
    Public = 'Public',
    Private = 'Private',
    Friends = 'Friends',
  }
type Record = {
    id: number;
    name: string;
    record_type: string;
    record_details: string;
    record_file: File | null;
    visibility: Visibility;
    value: string;
    created_at: string;
  };
  
  type Props = {
    records: Record;
  };
const index = ({ records }:Props) => {
    const [sortField, setSortField] = useState('report_date');
    const [sortDirection, setSortDirection] = useState('desc');

    const handleSort = (field) => {
        if (sortField === field) {
            setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
        } else {
            setSortField(field);
            setSortDirection('asc');
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    };
    const {auth} = usePage<SharedData>().props;
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: `${auth.user.name} Health Reports`,
            href: '/INDEX',
        },
    ];
    
    return (
        <AppLayout  breadcrumbs={breadcrumbs}>
<Head title='Display' />
<div className="dark:bg-gradient-to-br dark:from-gray-900 dark:to-gray-800">
  <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 px-4 py-12 dark:from-gray-900 dark:to-gray-800 sm:px-6 lg:px-8">
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mx-auto max-w-7xl"
    >
      <div className="overflow-hidden rounded-xl bg-white shadow-lg dark:bg-gray-900 dark:shadow-md">
        <div className="flex items-center justify-between border-b border-gray-200 px-8 py-6 dark:border-gray-700">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Health Reports</h2>
          <div className="flex gap-4">
            <button
              onClick={() => handleSort('report_date')}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Sort by Date
              {sortField === 'report_date' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
            <button
              onClick={() => handleSort('report_title')}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
            >
              Sort by Title
              {sortField === 'report_title' && (
                <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
              )}
            </button>
          </div>
        </div>

        <div className="grid gap-6 p-6 sm:grid-cols-1 lg:grid-cols-2">
          {records.map((report) => (
            <motion.div
              key={report.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="rounded-lg bg-gray-50 p-6 transition-colors duration-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
            >
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <h3 className="mb-2 text-lg font-semibold text-gray-900 dark:text-white">
                    {report.name}
                  </h3>
                  <p className="mb-2 text-gray-600 dark:text-gray-300">{report.report_content}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(report.created_at)}
                  </p>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div
                    className=" text-sm  text-black focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  >{report.visibility}</div>
                  <div className="flex gap-2">
                    <button
                      className="rounded-md bg-blue-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-blue-700"
                      onClick={() =>
                        (window.location.href = `/health-record/${report.id}/show`)
                      }
                    >
                      View Report
                    </button>
                    <button
                      className="rounded-md bg-green-600 px-4 py-2 text-sm text-white transition-colors duration-200 hover:bg-green-700"
                      onClick={() =>
                        (window.location.href = `/health-record-history/${report.id}`)
                      }
                    >
                      View History
                    </button>
                  </div>
                </div>
                </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.div>
  </div>
</div>

    </AppLayout>
    );
};

export default index;


