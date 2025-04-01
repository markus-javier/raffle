// resources/js/Pages/Participants/Import.jsx
import React, { useState } from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { Button } from '@/Components/FormElements';
import { FiChevronLeft, FiUpload, FiFileText, FiInfo, FiCheck } from 'react-icons/fi';

export default function ParticipantsImport({ cooperative }) {
    const [isDragging, setIsDragging] = useState(false);
    const [csvTemplate, setCsvTemplate] = useState(false);

    const { data, setData, post, processing, errors, progress } = useForm({
        csv_file: null,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('participants.import.process'));
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = (e) => {
        e.preventDefault();
        setIsDragging(false);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setIsDragging(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setData('csv_file', e.dataTransfer.files[0]);
        }
    };

    const handleFileChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            setData('csv_file', e.target.files[0]);
        }
    };

    const generateCsvTemplate = () => {
        const header = "name,email,phone,member_id\n";
        const sampleRow = "John Doe,john@example.com,+1234567890,MEM123\n";

        const blob = new Blob([header, sampleRow], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);

        const a = document.createElement('a');
        a.href = url;
        a.download = 'participants_template.csv';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        window.URL.revokeObjectURL(url);

        setCsvTemplate(true);
    };

    return (
        <AppLayout>
            <PageHeader
                title="Import Participants"
                actions={[
                    {
                        label: 'Back to Participants',
                        href: route('participants.index'),
                        icon: <FiChevronLeft />,
                        variant: 'secondary',
                    },
                ]}
            />

            <div className="max-w-3xl mx-auto">
                <Card className="mb-6">
                    <div className="flex items-start">
                        <div className="bg-blue-50 dark:bg-dark-light p-3 rounded-full mr-4">
                            <FiInfo className="h-6 w-6 text-blue-500 dark:text-blue-400" />
                        </div>
                        <div>
                            <h3 className="font-medium text-gray-900 dark:text-white mb-2">
                                CSV Import Instructions
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm mb-2">
                                Use CSV import to add multiple participants at once. Your CSV file should have the following columns:
                            </p>
                            <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 text-sm mb-4 pl-2">
                                <li><span className="font-semibold">name</span> - Full name of the participant (required)</li>
                                <li><span className="font-semibold">email</span> - Email address (required)</li>
                                <li><span className="font-semibold">phone</span> - Phone number (optional)</li>
                                <li><span className="font-semibold">member_id</span> - Member ID (optional)</li>
                            </ul>
                            <Button
                                onClick={generateCsvTemplate}
                                variant="secondary"
                                className="text-sm"
                            >
                                <FiFileText className="mr-2" />
                                {csvTemplate ? 'Template Downloaded' : 'Download CSV Template'}
                            </Button>
                        </div>
                    </div>
                </Card>

                <Card>
                    <div className="mb-4">
                        <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2">Import to:</h2>
                        <div className="text-lg font-semibold text-gray-900 dark:text-white">
                            {cooperative.name}
                        </div>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div
                            className={`border-2 border-dashed rounded-lg p-6 text-center ${
                                isDragging ? 'border-indigo-500 dark:border-dark-accent bg-indigo-50 dark:bg-indigo-900 bg-opacity-50' :
                                    errors.csv_file ? 'border-red-500 dark:border-red-700' :
                                        data.csv_file ? 'border-green-500 dark:border-green-700' :
                                            'border-gray-300 dark:border-gray-700'
                            }`}
                            onDragOver={handleDragOver}
                            onDragLeave={handleDragLeave}
                            onDrop={handleDrop}
                        >
                            {data.csv_file ? (
                                <div className="py-4">
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 dark:bg-green-900">
                                        <FiCheck className="h-6 w-6 text-green-600 dark:text-green-300" />
                                    </div>
                                    <div className="mt-3 text-center sm:mt-5">
                                        <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                            File Selected
                                        </h3>
                                        <div className="mt-2">
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                {data.csv_file.name} ({(data.csv_file.size / 1024).toFixed(2)} KB)
                                            </p>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="btn-secondary"
                                            onClick={() => setData('csv_file', null)}
                                        >
                                            Choose Different File
                                        </button>
                                    </div>
                                </div>
                            ) : (
                                <>
                                    <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-indigo-100 dark:bg-indigo-900 mb-4">
                                        <FiUpload className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                                    </div>
                                    <p className="text-gray-700 dark:text-gray-300 mb-2">
                                        <span className="font-medium">Click to upload</span> or drag and drop
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 mb-4">
                                        CSV files only (max 2MB)
                                    </p>
                                    <input
                                        type="file"
                                        id="csv_file"
                                        name="csv_file"
                                        accept=".csv"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="csv_file"
                                        className="btn-secondary cursor-pointer inline-block"
                                    >
                                        Select CSV File
                                    </label>
                                </>
                            )}
                        </div>

                        {errors.csv_file && (
                            <p className="mt-2 text-sm text-red-600 dark:text-red-400">{errors.csv_file}</p>
                        )}

                        {progress && (
                            <div className="mt-4">
                                <div className="text-xs text-gray-500 dark:text-gray-400 mb-1">
                                    {progress.percentage}% Uploaded
                                </div>
                                <div className="w-full bg-gray-200 dark:bg-dark-light rounded-full h-2">
                                    <div
                                        className="bg-indigo-600 dark:bg-dark-primary h-2 rounded-full"
                                        style={{ width: `${progress.percentage}%` }}
                                    />
                                </div>
                            </div>
                        )}

                        <div className="mt-6 flex justify-end">
                            <Link
                                href={route('participants.index')}
                                className="btn-secondary mr-3"
                            >
                                Cancel
                            </Link>
                            <Button
                                type="submit"
                                disabled={processing || !data.csv_file}
                            >
                                {processing ? 'Importing...' : 'Import Participants'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
