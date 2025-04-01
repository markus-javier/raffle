// resources/js/Pages/Participants/Index.jsx
import React, { useState } from 'react';
import { Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { FiPlus, FiUpload, FiEdit, FiTrash2, FiEye, FiSearch, FiFilter } from 'react-icons/fi';

export default function ParticipantsIndex({ participants, importErrors }) {
    const [search, setSearch] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [selectedParticipant, setSelectedParticipant] = useState(null);
    const [filterActive, setFilterActive] = useState('all'); // 'all', 'active', 'inactive'

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleDeleteClick = (participant) => {
        setSelectedParticipant(participant);
        setShowDeleteModal(true);
    };

    const handleDelete = () => {
        if (!selectedParticipant) return;
        window.location.href = route('participants.destroy', selectedParticipant.id);
    };

    const closeModal = () => {
        setShowDeleteModal(false);
        setSelectedParticipant(null);
    };

    const filterParticipants = (participant) => {
        // Filter by search text
        const matchesSearch = search === '' ||
            participant.name.toLowerCase().includes(search.toLowerCase()) ||
            participant.email.toLowerCase().includes(search.toLowerCase()) ||
            (participant.member_id && participant.member_id.toLowerCase().includes(search.toLowerCase()));

        // Filter by active/inactive status
        const matchesActiveFilter =
            filterActive === 'all' ||
            (filterActive === 'active' && participant.active) ||
            (filterActive === 'inactive' && !participant.active);

        return matchesSearch && matchesActiveFilter;
    };

    const filteredParticipants = participants.data.filter(filterParticipants);

    return (
        <AppLayout>
            <PageHeader
                title="Participants"
                actions={[
                    {
                        label: 'Import CSV',
                        href: route('participants.import'),
                        icon: <FiUpload />,
                        variant: 'secondary',
                    },
                    {
                        label: 'Add Participant',
                        href: route('participants.create'),
                        icon: <FiPlus />,
                    },
                ]}
            />

            {importErrors && importErrors.length > 0 && (
                <Card className="mb-6 bg-yellow-50 dark:bg-yellow-900 border border-yellow-200 dark:border-yellow-800">
                    <h3 className="font-medium text-yellow-800 dark:text-yellow-200 mb-3">Import Errors</h3>
                    <ul className="list-disc list-inside text-yellow-700 dark:text-yellow-300 text-sm">
                        {importErrors.map((error, index) => (
                            <li key={index}>{error}</li>
                        ))}
                    </ul>
                </Card>
            )}

            <Card>
                <div className="mb-4 flex flex-wrap items-center justify-between">
                    <div>
                        <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                            Manage Participants
                        </h2>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                            {participants.total} total participants
                        </p>
                    </div>

                    <div className="mt-2 sm:mt-0 flex flex-wrap items-center gap-2">
                        <div className="relative">
                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                <FiSearch className="h-5 w-5 text-gray-400" />
                            </div>
                            <input
                                type="text"
                                placeholder="Search participants..."
                                className="pl-10 input"
                                value={search}
                                onChange={handleSearchChange}
                            />
                        </div>

                        <div className="flex rounded-md shadow-sm">
                            <button
                                onClick={() => setFilterActive('all')}
                                className={`px-3 py-2 text-sm font-medium rounded-l-md ${
                                    filterActive === 'all'
                                        ? 'bg-indigo-600 dark:bg-dark-primary text-white'
                                        : 'bg-white dark:bg-dark-paper text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                                }`}
                            >
                                All
                            </button>
                            <button
                                onClick={() => setFilterActive('active')}
                                className={`px-3 py-2 text-sm font-medium ${
                                    filterActive === 'active'
                                        ? 'bg-indigo-600 dark:bg-dark-primary text-white'
                                        : 'bg-white dark:bg-dark-paper text-gray-700 dark:text-gray-300 border-t border-b border-gray-300 dark:border-gray-700'
                                }`}
                            >
                                Active
                            </button>
                            <button
                                onClick={() => setFilterActive('inactive')}
                                className={`px-3 py-2 text-sm font-medium rounded-r-md ${
                                    filterActive === 'inactive'
                                        ? 'bg-indigo-600 dark:bg-dark-primary text-white'
                                        : 'bg-white dark:bg-dark-paper text-gray-700 dark:text-gray-300 border border-gray-300 dark:border-gray-700'
                                }`}
                            >
                                Inactive
                            </button>
                        </div>
                    </div>
                </div>

                {filteredParticipants.length > 0 ? (
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                            <thead className="bg-gray-50 dark:bg-dark-light">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Name</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Email</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Member ID</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Status</th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Actions</th>
                            </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-dark-paper divide-y divide-gray-200 dark:divide-gray-700">
                            {filteredParticipants.map((participant) => (
                                <tr key={participant.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{participant.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">{participant.email}</div>
                                        {participant.phone && (
                                            <div className="text-xs text-gray-500 dark:text-gray-400">{participant.phone}</div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500 dark:text-gray-400">
                                            {participant.member_id || "-"}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        {participant.active ? (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200">
                          Active
                        </span>
                                        ) : (
                                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200">
                          Inactive
                        </span>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <Link
                                            href={route('participants.show', participant.id)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3"
                                        >
                                            <FiEye className="inline h-4 w-4 mr-1" /> View
                                        </Link>
                                        <Link
                                            href={route('participants.edit', participant.id)}
                                            className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-900 dark:hover:text-indigo-300 mr-3"
                                        >
                                            <FiEdit className="inline h-4 w-4 mr-1" /> Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDeleteClick(participant)}
                                            className="text-red-600 dark:text-red-400 hover:text-red-900 dark:hover:text-red-300"
                                        >
                                            <FiTrash2 className="inline h-4 w-4 mr-1" /> Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-gray-500 dark:text-gray-400 mb-4">No participants found matching your filters.</p>
                        <div className="flex justify-center">
                            <Link href={route('participants.create')} className="btn-primary">
                                Add Participant
                            </Link>
                        </div>
                    </div>
                )}

                {participants.data.length > 0 && (
                    <div className="mt-6 flex justify-center">
                        <nav className="flex items-center">
                            {participants.links.map((link, index) => (
                                <Link
                                    key={index}
                                    href={link.url}
                                    className={`px-3 py-1 rounded-md mx-1 ${
                                        link.active
                                            ? 'bg-indigo-600 dark:bg-dark-primary text-white'
                                            : 'bg-white dark:bg-dark-paper text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-dark-light'
                                    } ${!link.url ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    preserveScroll
                                    dangerouslySetInnerHTML={{ __html: link.label }}
                                />
                            ))}
                        </nav>
                    </div>
                )}
            </Card>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && selectedParticipant && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-paper rounded-lg w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Confirm Deletion
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Are you sure you want to delete {selectedParticipant.name}? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    className="btn-secondary"
                                    onClick={closeModal}
                                >
                                    Cancel
                                </button>
                                <button
                                    className="btn-danger"
                                    onClick={handleDelete}
                                >
                                    Delete Participant
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </AppLayout>
    );
}
