import React from 'react';

const RecordCard = ({ record }) => {
  const formattedDate = new Date(record.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="bg-white dark:bg-gray-800 shadow-md hover:shadow-lg transition-shadow duration-300 rounded-xl overflow-hidden w-full max-w-md mx-auto my-6">
      <img
        src={record.record_file}
        alt={record.name}
        className="w-full h-52 object-cover"
      />
      <div className="p-5">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2">
          {record.name}
        </h2>

        <div className="mb-2 text-sm text-gray-500 dark:text-gray-400">
          {record.record_type.toUpperCase()}
        </div>

        <p className="text-gray-700 dark:text-gray-300 mb-3 line-clamp-2">
          {record.record_details.replace(/-/g, ' ')}
        </p>

        <div className="flex items-center justify-between mb-3">
          <span className="inline-block bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200 text-sm font-semibold px-3 py-1 rounded-full">
            Value: {record.value}
          </span>
          <span className="text-xs text-gray-400 dark:text-gray-500">{formattedDate}</span>
        </div>

        {/* View History Button with Laravel Link */}
        <a
          href={`/health-record-history/${record.id}`}
          className="mt-2 inline-block w-full text-center bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-400 transition"
        >
          View History
        </a>
      </div>
    </div>
  );
};

const RecordList = ({ records }) => {
  return (
    <div className="p-6 bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center">
      <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-8">Records</h1>
      {records.map((record) => (
        <RecordCard key={record.id} record={record} />
      ))}
    </div>
  );
};

export default RecordList;
