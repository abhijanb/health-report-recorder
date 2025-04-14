import { Head, usePage } from '@inertiajs/react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { format } from 'date-fns'
import { SharedData } from '@/types'
import { useState } from 'react'
import AppLayout from '@/layouts/app-layout'

interface History {
  id: number
  created_at: string
  updated_at: string
  record_details: string
  record_file: string
  file_url: string
  record_id: number
  record_type: string
  user_id: number
  value: string
  visibility: string
}

interface Props {
  message: string
  histories: History[]
}

interface ChartData {
  date: string
  value: number
}
const breadcrumbs: BreadcrumbItem[] = [
  {
      title: `health history`,
      href: '/history',
  },
];
const History = () => {

  const { message, histories }: Props = usePage<SharedData>().props
  const [selectedFile, setSelectedFile] = useState<string | null>(null)

  if (message) {
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
                <Head title="history" />
      <div className="flex h-[80vh] items-center justify-center">
        <p className="text-lg font-medium text-gray-600">No health record</p>
      </div>
      </AppLayout>
    )
  }

  const chartData: ChartData[] = histories.map((history) => ({
    date: format(new Date(history.created_at), 'MMM dd'),
    value: parseFloat(history.value) || 0,
  }))

  const FileModal = ({ url, onClose }: { url: string; onClose: () => void }) => (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="relative max-h-[90vh] max-w-[90vw] overflow-auto rounded-lg bg-white p-4">
        <button
          onClick={onClose}
          className="absolute right-2 top-2 rounded-full bg-gray-200 p-2 hover:bg-gray-300"
        >
          <svg
            className="h-6 w-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        {url.toLowerCase().endsWith('.pdf') ? (
          <iframe src={url} className="h-[80vh] w-[80vw]" />
        ) : (
          <img src={url} alt="Record file" className="max-h-[80vh] max-w-[80vw]" />
        )}
      </div>
    </div>
  )

  return (
<AppLayout breadcrumbs={breadcrumbs}>
<Head title="history" />
    <div className="container mx-auto px-4 py-8">
    {selectedFile && (
      <FileModal url={selectedFile} onClose={() => setSelectedFile(null)} />
    )}
  
    <div className="mb-8 rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800 dark:shadow-md">
      <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white">Value Trend</h2>
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="value"
              stroke="#2563eb"
              strokeWidth={2}
              dot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  
    <div className="space-y-4">
      {histories.map((history, index) => (
        <div
          key={index}
          className="rounded-lg bg-white p-6 shadow-lg transition-all hover:shadow-xl dark:bg-gray-800 dark:shadow-md"
        >
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Value</p>
              <p className="text-gray-900 dark:text-white">{history.value}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Type</p>
              <p className="text-gray-900 dark:text-white">{history.record_type}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Details</p>
              <p className="text-gray-900 dark:text-white">{history.record_details}</p>
            </div>
            {history.record_file && ['file', 'image'].includes(history.record_type) && (
              <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">File</p>
                <button
                  onClick={() => setSelectedFile(`/storage/health-records/${history.record_file}`)}
                  className="text-blue-600 hover:text-blue-800 hover:underline dark:text-blue-400 dark:hover:text-blue-300"
                >
                  View File
                </button>
              </div>
            )}
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Visibility</p>
              <p className="text-gray-900 dark:text-white">{history.visibility}</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-500 dark:text-gray-400">Created at</p>
              <p className="text-gray-900 dark:text-white">
                {format(new Date(history.created_at), 'PPp')}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
  </AppLayout>
  )
}

export default History