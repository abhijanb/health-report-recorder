import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import { LoaderCircle } from 'lucide-react';
import React, { FormEventHandler } from 'react';
enum RecordType {
    File = 'file',
    Text = 'text',
    Image = 'image',
}
enum Visibility {
    Public = 'public_all',
    Private = 'private',
    Friends = 'friends',
}
type HealthRecordForm = {
    name: string;
    record_type: RecordType;
    record_details: string;
    record_file: File | null;
    visibility: Visibility;
    value: number;
};
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Health',
        href: '/health-record',
    },
];
const create = () => {
    const { processing, errors, post, data, setData, reset } = useForm<HealthRecordForm>({
        
        name: '',
        record_type: RecordType.File,
        record_details: '',
        record_file: null,
        visibility: Visibility.Private,
        value: 0,
    });

    const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('record_type', e.target.value as RecordType);
    };
    const ImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;
        if (file) {
            setData('record_file', file);
        }
    };
    const VisibilityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setData('visibility', e.target.value as Visibility);
    };
    const NotText = data.record_type !== RecordType.Text;
    const submit: FormEventHandler = (e) => {
        e.preventDefault();
        post(route('health-record.store'), {
            onFinish: () => {
                // Reset the form or perform any other actions
                reset('name', 'record_type', 'record_details', 'record_file', 'visibility', 'value');
            },
        });
    };
    console.log("rerender");
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Health" />
        <div className="flex items-center justify-center min-h-screen bg-gray-50 text-black">
        <div className="w-full max-w-lg p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-semibold text-center text-gray-800 mb-6">Create Health Record</h2>
            
            <form className="space-y-6" onSubmit={submit}>
                <div className="space-y-6">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            type="text"
                            required
                            autoFocus
                            tabIndex={1}
                            autoComplete="name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            disabled={processing}
                            placeholder="Full name"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        <InputError message={errors.name} className="mt-2 text-red-500" />
                    </div>
    
                    {/* Record Type Field */}
                    <div className="space-y-2">
                        <Label htmlFor="record_type">Record Type</Label>
                        <select
                            id="record_type"
                            required
                            name="record_type"
                            value={data.record_type}
                            onChange={handleTypeChange}
                            disabled={processing}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value={RecordType.File}>File</option>
                            <option value={RecordType.Text}>Text</option>
                            <option value={RecordType.Image}>Image</option>
                        </select>
                        <InputError message={errors.record_type} className="mt-2 text-red-500" />
                    </div>
    
                    {/* Record Details Field */}
                    <div className="space-y-2">
                        <Label htmlFor="record_details">Record Details</Label>
                        <textarea
                            id="record_details"
                            required
                            name="record_details"
                            value={data.record_details}
                            onChange={(e) => setData('record_details', e.target.value)}
                            disabled={processing}
                            placeholder="Record details"
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        <InputError message={errors.record_details} className="mt-2 text-red-500" />
                    </div>
    
                    {/* Record File Field */}
                    <div className="space-y-2">
                        <Label className={NotText ? 'text-black' : 'cursor-not-allowed text-gray-400'} htmlFor="record_file">
                            Record File
                        </Label>
                        <input
                            id="record_file"
                            type="file"
                            name="record_file"
                            accept=".pdf,.doc,.docx,.txt,.png,.jpg,.jpeg"
                            onChange={ImageChange}
                            disabled={!NotText}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        <InputError message={errors.record_file} className="mt-2 text-red-500" />
                    </div>
    
                    {/* Visibility Field */}
                    <div className="space-y-2">
                        <Label htmlFor="visibility">Visibility</Label>
                        <select
                            id="visibility"
                            required
                            name="visibility"
                            value={data.visibility}
                            onChange={VisibilityChange}
                            disabled={processing}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        >
                            <option value={Visibility.Public}>Public</option>
                            <option value={Visibility.Private}>Private</option>
                            <option value={Visibility.Friends}>Friends</option>
                        </select>
                        <InputError message={errors.visibility} className="mt-2 text-red-500" />
                    </div>
    
                    {/* Value Field */}
                    <div className="space-y-2">
                        <Label htmlFor="value">Value</Label>
                        <input
                            id="value"
                            type="number"
                            name="value"
                            value={data.value}
                            onChange={(e) => setData('value', parseFloat(e.target.value) || 0)}
                            disabled={processing}
                            className="w-full p-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-indigo-500"
                        />
                        <InputError message={errors.value} className="mt-2 text-red-500" />
                    </div>
                </div>
    
                {/* Submit Button */}
                <Button
                    type="submit"
                    className="mt-4 w-full py-2 bg-indigo-600 text-white rounded-md shadow-sm hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
                    tabIndex={5}
                    disabled={processing}
                >
                    {processing && <LoaderCircle className="h-4 w-4 animate-spin" />}
                    Create
                </Button>
            </form>
        </div>
    </div>
        </AppLayout>
    

    );
};

export default create;
