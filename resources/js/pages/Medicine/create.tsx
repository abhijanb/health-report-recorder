import InputError from '@/components/input-error';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import React from 'react';

enum Frequency {
  Once = 'once',
  Twice = 'twice',
  Thrice = 'thrice',
  Daily = 'daily',
}

type Medicine_Record = {
  medicine_name: string;
  dosage: string;
  frequency: Frequency;
  start_date: string;
  end_date: string;
  price: number;
  store_name: string;
  prescription: File | null;
};

const Create = () => {
  const { message } = usePage<SharedData>().props;
  const { post, errors, data, setData, processing, reset } = useForm<Medicine_Record>({
    medicine_name: '',
    dosage: '',
    frequency: Frequency.Once,
    start_date: '',
    end_date: '',
    price: 0,
    store_name: '',
    prescription: null,
  });

  const frequencyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setData('frequency', e.target.value as Frequency);
  };

  const prescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData('prescription', e.target.files ? e.target.files[0] : null);
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    post(route('medicine.store'), {
      onSuccess: () => {
        reset('dosage', 'end_date', 'frequency', 'price', 'prescription', 'store_name', 'start_date');
      },
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 px-4 py-10">
            <Head title='Add Medicine' />

      <div className="w-full max-w-2xl bg-white text-gray-800 shadow-xl rounded-2xl p-8 border border-gray-200">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-blue-700">Add Medicine Report</h1>
          {message ? (
            <p className="text-green-600 text-sm mt-2">{message}</p>
          ) : (
            <p className="text-gray-500 text-sm mt-2">Fill out the form to add a new medicine record.</p>
          )}
        </div>

        <form onSubmit={submit} className="space-y-6">
          {[
            { label: 'Medicine Name', name: 'medicine_name', type: 'text' },
            { label: 'Dosage', name: 'dosage', type: 'text' },
            { label: 'Start Date', name: 'start_date', type: 'date' },
            { label: 'End Date', name: 'end_date', type: 'date' },
            { label: 'Price', name: 'price', type: 'number' },
            { label: 'Store Name', name: 'store_name', type: 'text' },
          ].map(({ label, name, type }) => (
            <div key={name}>
              <Label htmlFor={name} className="text-sm font-medium text-gray-700">
                {label}
              </Label>
              <Input
                id={name}
                type={type}
                value={data[name as keyof Medicine_Record] as string | number}
                onChange={(e) =>
                  setData(name as keyof Medicine_Record, type === 'number' ? parseFloat(e.target.value) : e.target.value)
                }
                className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
              />
              <InputError message={errors[name as keyof Medicine_Record]} />
            </div>
          ))}

          <div>
            <Label htmlFor="frequency" className="text-sm font-medium text-gray-700">
              Frequency
            </Label>
            <select
              id="frequency"
              value={data.frequency}
              onChange={frequencyChange}
              className="mt-1 w-full border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-200"
            >
              {Object.values(Frequency).map((f) => (
                <option key={f} value={f}>
                  {f.charAt(0).toUpperCase() + f.slice(1)}
                </option>
              ))}
            </select>
            <InputError message={errors.frequency} />
          </div>

          <div>
            <Label htmlFor="prescription" className="text-sm font-medium text-gray-700">
              Prescription
            </Label>
            <Input
              id="prescription"
              type="file"
              onChange={prescriptionChange}
              className="mt-1 w-full rounded-md border-gray-300 shadow-sm focus:ring focus:ring-blue-200"
            />
            <InputError message={errors.prescription} />
          </div>

          <div className="text-right">
            <button
              type="submit"
              disabled={processing}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-6 rounded-md transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {processing ? 'Processing...' : 'Submit'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Create;
