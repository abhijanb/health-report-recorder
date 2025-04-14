import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem, SharedData } from '@/types';
import { Head, useForm, usePage } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';

enum Reminder_Type {
    Medication = 'medication',
    Appointment = 'appointment',
    Exercise = 'exercise',
    Other = 'other',
}
type Reminder_Record = {
    reminder_type: Reminder_Type;
    reminder_message: string;
    reminder_time: string;
    is_active: boolean;
}
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: `Create Reminder`,
        href: '/reminder/create',
    },
];
const create = () => {
  
  const {message} = usePage<SharedData>().props;
    const { post, data, setData, processing, errors, reset } = useForm<Reminder_Record>({
        reminder_type: Reminder_Type.Medication,
        reminder_message: '',
        reminder_time: '',
        is_active: true,
    });

    const handleReminderTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('reminder_type', e.target.value as Reminder_Type);
    };
    const handleIsActiveChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('is_active', e.target.value === '1');
    };
    const submit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('reminder.store'));
    };
    return (
      <AppLayout breadcrumbs={breadcrumbs}>
        <Head title="Create Reminder" />
      <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="bg-white shadow-lg rounded-lg w-full sm:w-96 p-8 space-y-6">
        {/* Heading */}
        <div className="text-center">
          <h1 className="text-2xl font-semibold text-gray-800 mb-6">Create Health Reminder</h1>
          {
            message ? (
              <p className="text-green-500 text-sm mb-4">{message}</p> 
            ) :
            (
              <p className="text-gray-500 text-sm">Please fill out the form below to set a health reminder.</p>
            )
          }
        </div>
    
        <form onSubmit={submit} className="space-y-4">
          {/* Reminder Type */}
          <div>
            <Label htmlFor="reminder_type" className="block text-sm font-medium text-gray-700">Reminder Type</Label>
            <select
              value={data.reminder_type}
              name="reminder_type"
              id="reminder_type"
              onChange={handleReminderTypeChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={Reminder_Type.Appointment}>{Reminder_Type.Appointment}</option>
              <option value={Reminder_Type.Exercise}>{Reminder_Type.Exercise}</option>
              <option value={Reminder_Type.Medication}>{Reminder_Type.Medication}</option>
              <option value={Reminder_Type.Other}>{Reminder_Type.Other}</option>
            </select>
            {errors.reminder_type && <p className="text-red-500 text-xs mt-1">{errors.reminder_type}</p>}
          </div>
    
          {/* Reminder Message */}
          <div>
            <Label htmlFor="reminder_message" className="block text-sm font-medium text-gray-700">Reminder Message</Label>
            <Input
              id="reminder_message"
              type="text"
              required
              tabIndex={1}
              value={data.reminder_message}
              onChange={(e) => setData('reminder_message', e.target.value)}
              placeholder="Enter reminder message"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <InputError message={errors.reminder_message} />
          </div>
    
          {/* Reminder Time */}
          <div>
            <Label htmlFor="reminder_time" className="block text-sm font-medium text-gray-700">Reminder Time</Label>
            <Input
              id="reminder_time"
              type="date"
              required
              tabIndex={2}
              value={data.reminder_time}
              onChange={(e) => setData('reminder_time', e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
            <InputError message={errors.reminder_time} />
          </div>
    
          {/* Is Active */}
          <div>
            <Label htmlFor="is_active" className="block text-sm font-medium text-gray-700">Status</Label>
            <select
              name="is_active"
              id="is_active"
              onChange={handleIsActiveChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 text-black rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value={1}>Active</option>
              <option value={0}>Inactive</option>
            </select>
            {errors.is_active && <p className="text-red-500 text-xs mt-1">{errors.is_active}</p>}
          </div>
    
          {/* Submit Button */}
          <Button
            type="submit"
            className="mt-4 w-full py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:bg-gray-400"
            tabIndex={5}
            disabled={processing}
          >
            {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
            Create Reminder
          </Button>
        </form>
      </div>
    </div>
    </AppLayout>
    

    
        );
};

export default create;
