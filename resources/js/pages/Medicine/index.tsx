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
    <div>
        <h1>Medicine List</h1>
        {/* table */}
        <table className="table-auto w-full">
            <thead>
                <tr>
                    <th className="px-4 py-2">Medicine Name</th>
                    <th className="px-4 py-2">Dosage</th>
                    <th className="px-4 py-2">Frequency</th>
                    <th className="px-4 py-2">Start Date</th>
                    <th className="px-4 py-2">End Date</th>
                    <th className="px-4 py-2">Price</th>
                    <th className="px-4 py-2">Store Name</th>
                    <th className="px-4 py-2">View</th>
                    
                </tr>
            </thead>
            <tbody>
  {medicines.map((medicine: Medicine) => (
    <tr key={medicine.id} className="border-b hover:bg-gray-800 transition">
      <td className="px-6 py-4">{medicine.medicine_name}</td>
      <td className="px-6 py-4">{medicine.dosage}</td>
      <td className="px-6 py-4">{medicine.frequency}</td>
      <td className="px-6 py-4">{medicine.start_date}</td>
      <td className="px-6 py-4">{medicine.end_date}</td>
      <td className="px-6 py-4">₹{medicine.price}</td>
      <td className="px-6 py-4">{medicine.store_name}</td>

      {/* View */}
      <td className="px-6 py-4 text-center">
        <div className="flex flex-col items-center space-y-1">
          <p className="text-[10px] text-gray-500">2 mins ago</p>
          <Link href={`/medicine/${medicine.id}/show`} className="text-blue-600 hover:underline">View</Link>
        </div>
      </td>

      

     
    </tr>
  ))}
</tbody>

        </table>

    </div>
    </AppLayout>
  )
}

export default index