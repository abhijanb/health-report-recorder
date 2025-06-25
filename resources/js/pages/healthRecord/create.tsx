import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { useRef } from 'react';

const breadcrumbs: BreadcrumbItem[] = [
  { title: 'Health', href: '/health-record' },
];

const HealthRecordForm = () => {
  const { processing, errors, post, data, setData, reset } = useForm({
    name: '',
    record_type: 'file',
    record_details: '',
    record_file: null,
    priority: '',
    status: '',
    value: 0,
    unit: '',
    tags: [],
    source: '',
  });

  const fileInputRef = useRef<HTMLInputElement>(null);
  const isFileOrImage = data.record_type === 'file' || data.record_type === 'image';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setData('record_file', file);
  };

  const canSubmit = () => {
    if (!data.name.trim()) return false;
    if (!data.priority) return false;
    if (!data.status) return false;
    if (isFileOrImage && !data.record_details.trim()) return false;
    if (isFileOrImage && !data.record_file) return false;
    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!canSubmit()) {
      alert('Please fill in all required fields.');
      return;
    }

    post(route('health-record.store'), {
      forceFormData: true,
      onFinish: () => reset(),
    });
  };

  const medicalUnits = [
    { value: 'mg/dL', label: 'mg/dL (milligrams per deciliter)' },
    { value: 'mmol/L', label: 'mmol/L (millimoles per liter)' },
    { value: 'bpm', label: 'bpm (beats per minute)' },
    { value: 'mmHg', label: 'mmHg (millimeters of mercury)' },
  ];

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Create Health Record" />
      <div className="min-h-screen px-4 py-12 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-900 dark:to-gray-800">
        <div className="w-full max-w-lg mx-auto p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-center text-gray-800 dark:text-white mb-6">
            Create Health Record
          </h2>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={data.name}
                onChange={(e) => setData('name', e.target.value)}
                disabled={processing}
                className={`${
                  !data.name.trim() ? 'border-red-500' : 'border-gray-300 dark:border-gray-700'
                }`}
                required
              />
              {!data.name.trim() && <p className="text-red-500 text-sm">Name is required.</p>}
              <InputError message={errors.name} />
            </div>

            {/* Record Type */}
            <div className="space-y-2">
              <Label htmlFor="record_type">Record Type</Label>
              <select
                id="record_type"
                value={data.record_type}
                onChange={(e) => setData('record_type', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                disabled={processing}
                required
              >
                <option value="file">File</option>
                <option value="text">Text</option>
                <option value="image">Image</option>
                <option value="json">JSON</option>
              </select>
              <InputError message={errors.record_type} />
            </div>

            {/* Record Details */}
            <div className="space-y-2">
              <Label htmlFor="record_details">Record Details</Label>
              <textarea
                id="record_details"
                value={data.record_details}
                onChange={(e) => setData('record_details', e.target.value)}
                disabled={processing}
                placeholder="Enter detailed info"
                className={`w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white ${
                  isFileOrImage && !data.record_details.trim()
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                required={isFileOrImage}
              />
              {isFileOrImage && !data.record_details.trim() && (
                <p className="text-red-500 text-sm">Record details are required for File/Image records.</p>
              )}
              <InputError message={errors.record_details} />
            </div>

            {/* Record File */}
            <div className="space-y-2">
              <Label htmlFor="record_file">Record File</Label>
              <input
                ref={fileInputRef}
                id="record_file"
                type="file"
                onChange={handleFileChange}
                disabled={processing}
                className={`w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-white ${
                  isFileOrImage && !data.record_file
                    ? 'border-red-500'
                    : 'border-gray-300 dark:border-gray-700'
                }`}
                accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                required={isFileOrImage}
              />
              {isFileOrImage && !data.record_file && (
                <p className="text-red-500 text-sm">A file must be uploaded for File/Image records.</p>
              )}
              <InputError message={errors.record_file} />
            </div>

            {/* Priority */}
            <div className="space-y-2">
              <Label htmlFor="priority">Priority</Label>
              <select
                id="priority"
                value={data.priority}
                onChange={(e) => setData('priority', e.target.value)}
                className={`w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                  !data.priority ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={processing}
                required
              >
                <option value="" disabled>
                  -- Select Priority --
                </option>
                <option value="low">Low — Less urgent</option>
                <option value="normal">Normal — Standard attention</option>
                <option value="high">High — Immediate action needed</option>
              </select>
              {!data.priority && <p className="text-red-500 text-sm">Priority is required.</p>}
              <InputError message={errors.priority} />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <select
                id="status"
                value={data.status}
                onChange={(e) => setData('status', e.target.value)}
                className={`w-full p-2 border rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white ${
                  !data.status ? 'border-red-500' : 'border-gray-300'
                }`}
                disabled={processing}
                required
              >
                <option value="" disabled>
                  -- Select Status --
                </option>
                <option value="active">Active — Currently in use</option>
                <option value="archived">Archived — Stored but inactive</option>
                <option value="pending">Pending — Awaiting action</option>
              </select>
              {!data.status && <p className="text-red-500 text-sm">Status is required.</p>}
              <InputError message={errors.status} />
            </div>

            {/* Value */}
            <div className="space-y-2">
              <Label htmlFor="value">Value</Label>
              <Input
                id="value"
                type="number"
                value={data.value}
                onChange={(e) => setData('value', parseFloat(e.target.value) || 0)}
                disabled={processing}
                placeholder="Numeric value"
              />
              <InputError message={errors.value} />
            </div>

            {/* Unit */}
            <div className="space-y-2">
              <Label htmlFor="unit">Unit</Label>
              <select
                id="unit"
                value={data.unit}
                onChange={(e) => setData('unit', e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-700 dark:text-white"
                disabled={processing}
              >
                <option value="" disabled>
                  -- Select Unit --
                </option>
                {medicalUnits.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
              <InputError message={errors.unit} />
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label>Tags</Label>
              <div className="flex flex-wrap items-center gap-2 border p-2 rounded-md">
                {data.tags.map((tag: string, index: number) => (
                  <div
                    key={index}
                    className="flex items-center bg-blue-100 text-blue-700 rounded-full px-3 py-1 text-sm cursor-default"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => {
                        const newTags = [...data.tags];
                        newTags.splice(index, 1);
                        setData('tags', newTags);
                      }}
                      className="ml-2 text-red-500 hover:text-red-700 focus:outline-none"
                      aria-label={`Remove tag ${tag}`}
                    >
                      &times;
                    </button>
                  </div>
                ))}
                <input
                  type="text"
                  placeholder="Add tag and press Enter"
                  disabled={processing}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      const val = (e.target as HTMLInputElement).value.trim();
                      if (val && !data.tags.includes(val)) {
                        setData('tags', [...data.tags, val]);
                        (e.target as HTMLInputElement).value = '';
                      }
                    }
                  }}
                  className="flex-grow p-1 border-none focus:ring-0 dark:bg-gray-900 dark:text-white"
                />
              </div>
              <InputError message={errors.tags} />
            </div>

            {/* Source */}
            <div className="space-y-2">
              <Label htmlFor="source">Source</Label>
              <Input
                id="source"
                value={data.source}
                onChange={(e) => setData('source', e.target.value)}
                disabled={processing}
                placeholder="Record source (optional)"
              />
              <InputError message={errors.source} />
            </div>

            <Button
              type="submit"
              className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
              disabled={processing}
            >
              {processing && <LoaderCircle className="h-4 w-4 animate-spin mr-2 inline-block" />}
              Create
            </Button>
          </form>
        </div>
      </div>
    </AppLayout>
  );
};

export default HealthRecordForm;
