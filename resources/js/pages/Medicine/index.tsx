import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react'
type Medicine = {
  id: number;
  medicine_name: string;
  dosage: string;
  frequency: string;
  start_date: string;
  end_date: string;
  price: number;
  store_name: string;
  prescription: File | null;

}
const index = ({medicines}) => {
  const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `Medicine Details`,
        href: '/dashboard',
    },
];
  return (
    <AppLayout breadcrumbs={breadcrumbs} >
    <Head title="Medicine" />
    <div className="p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-md">
  <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-4">Medicine List</h1>

  <div className="overflow-x-auto">
    <table className="min-w-full text-sm text-left text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase text-xs font-semibold">
        <tr>
          <th className="px-6 py-3">Medicine Name</th>
          <th className="px-6 py-3">Dosage</th>
          <th className="px-6 py-3">Frequency</th>
          <th className="px-6 py-3">Start Date</th>
          <th className="px-6 py-3">End Date</th>
          <th className="px-6 py-3">Price</th>
          <th className="px-6 py-3">Store Name</th>
          <th className="px-6 py-3 text-center">View</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
        {medicines.map((medicine: Medicine) => (
          <tr key={medicine.id} className="hover:bg-gray-50 dark:hover:bg-gray-800 transition">
            <td className="px-6 py-4 whitespace-nowrap">{medicine.medicine_name}</td>
            <td className="px-6 py-4 whitespace-nowrap">{medicine.dosage}</td>
            <td className="px-6 py-4 whitespace-nowrap">{medicine.frequency}</td>
            <td className="px-6 py-4 whitespace-nowrap">{medicine.start_date}</td>
            <td className="px-6 py-4 whitespace-nowrap">{medicine.end_date}</td>
            <td className="px-6 py-4 whitespace-nowrap">₹{medicine.price}</td>
            <td className="px-6 py-4 whitespace-nowrap">{medicine.store_name}</td>
            <td className="px-6 py-4 text-center">
              <div className="flex flex-col items-center gap-1">
                <span className="text-[10px] text-gray-500 dark:text-gray-400">2 mins ago</span>
                <Link
                  href={`/medicine/${medicine.id}/show`}
                  className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
                >
                  View
                </Link>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>

    </AppLayout>
  )
}

export default index