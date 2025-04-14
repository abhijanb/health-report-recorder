import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { ChangeEvent } from 'react';

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
  record: Record;
};

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: `Edit report`,
    href: '/edit',
  },
];

const Edit = ({ record }: Props) => {
  const { data, setData, processing, errors, post } = useForm<Record>({
    ...record,
  });



  const fileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
        if (file) {
            setData('record_file', file);
        }
  };
const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route("health-record.update",record.id)
    // ,{
    //   forceFormData: true,
    //   method: 'put',
    // }
  );
  };
  console.log("rerendered");
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Display" />
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 dark:bg-gray-900 px-4 py-10">
  <form onSubmit={submit} className='text-black dark:text-white'>
    <div className="relative w-full max-w-xl space-y-6 rounded-2xl bg-white dark:bg-gray-800 p-8 shadow-md">
      {/* Heading */}
      <h1 className="text-2xl font-semibold text-gray-800 dark:text-white mb-6">Update Health Record</h1>

      <div className="flex items-start justify-between gap-4">
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Report Name</label>
          <Input
            id="record_name"
            type="text"
            value={data.name}
            onChange={(e) => setData('name', e.target.value)}
          />
          <InputError message={errors.name} />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Record Type</label>
        <Input
          type="text"
          value={data.record_type}
          onChange={(e) => setData('record_type', e.target.value)}
        />
        <InputError message={errors.record_type} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Record Details</label>
        <Input
          required
          type="text"
          value={data.record_details}
          onChange={(e) => setData('record_details', e.target.value)}
        />
        <InputError message={errors.record_details} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Record File</label>
        <Input type="file" id="record_file" onChange={fileChange} />
        <InputError message={errors.record_file} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Visibility</label>
        <select
          value={data.visibility}
          onChange={(e) => setData('visibility', e.target.value as Visibility)}
          className="w-full rounded-lg border px-4 py-2 text-gray-700 dark:text-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600"
        >
          <option value={Visibility.Public}>Public</option>
          <option value={Visibility.Private}>Private</option>
          <option value={Visibility.Friends}>Friends</option>
        </select>
        <InputError message={errors.visibility} />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">Value</label>
        <Input
          type="text"
          value={data.value}
          onChange={(e) => setData('value', e.target.value)}
        />
        <InputError message={errors.value} />
      </div>

      <div className="flex w-full justify-center rounded-xl border bg-white dark:bg-gray-800 px-6 py-4 shadow-sm">
        <button
          className="mt-3 rounded-lg bg-green-500 px-5 py-2 font-semibold text-white shadow transition duration-200 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-700"
          disabled={processing}
        >
          Update
        </button>
      </div>
    </div>
  </form>
</div>

    </AppLayout>
  );
};

export default Edit;
