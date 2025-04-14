import { Head, Link, router } from '@inertiajs/react';

const Show = ({ reminder }) => {
  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this reminder?')) {
      router.delete(route('reminder.destroy', reminder.id));
    }
  };

  return (
    <>
      <Head title="Reminder Details" />

      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow rounded-xl">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Reminder Details</h1>

        <div className="space-y-4 text-sm text-gray-700">
          <div><span className="font-semibold">Reminder ID:</span> {reminder.id}</div>
          <div><span className="font-semibold">Message:</span> {reminder.reminder_message}</div>
          <div><span className="font-semibold">Type:</span> {reminder.reminder_type}</div>
          <div><span className="font-semibold">Date:</span> {reminder.reminder_time}</div>
          <div>
            <span className="font-semibold">Status:</span>{' '}
            <span className={reminder.is_active ? 'text-green-600' : 'text-red-600'}>
              {reminder.is_active ? 'Active' : 'Inactive'}
            </span>
          </div>
          <div><span className="font-semibold">Created At:</span> {new Date(reminder.created_at).toLocaleString()}</div>
          <div><span className="font-semibold">Last Updated:</span> {new Date(reminder.updated_at).toLocaleString()}</div>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex gap-4">
          <Link
            href={route('reminder.edit', reminder.id)}
            className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </div>
    </>
  );
};

export default Show;
