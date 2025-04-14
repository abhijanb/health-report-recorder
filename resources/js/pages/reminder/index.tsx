import AppLayout from '@/layouts/app-layout'
import { BreadcrumbItem, SharedData } from '@/types'
import { Head, Link, usePage } from '@inertiajs/react'
import { Sidebar } from 'lucide-react'
import React from 'react'

const index = ({reminders}) => {
  const { auth, message } = usePage<SharedData>().props;
  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `welcome ${auth.user.name}`,
        href: '/',
    },
];
  return (<>
    <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health" />
    <div className="p-6">
      <h1 className="text-3xl font-semibold mb-4">Reminders</h1>
      {/* Table */}
      <table className="table-auto w-full border-collapse shadow-lg rounded-lg">
        <thead>
          <tr className="bg-gray-100 text-left">
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Reminder Type</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Reminder Message</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Reminder Time</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">Is Active</th>
            <th className="px-6 py-3 text-sm font-medium text-gray-700">View</th>
          </tr>
        </thead>
        <tbody>
          {reminders.map((reminder) => (
            <tr key={reminder.id} className="border-b hover:bg-gray-50">
              <td className="border px-6 py-4 text-sm text-gray-800">{reminder.reminder_type}</td>
              <td className="border px-6 py-4 text-sm text-gray-800">{reminder.reminder_message}</td>
              <td className="border px-6 py-4 text-sm text-gray-800">{reminder.reminder_time}</td>
              <td className="border px-6 py-4 text-sm text-gray-800">{reminder.is_active ? 'Yes' : 'No'}</td>
            <td className="border px-6 py-4 text-sm text-gray-800"><Link href={`/reminder/${reminder.id}`}> View</Link></td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
      </AppLayout>
    
  </>
  )
}

export default index
