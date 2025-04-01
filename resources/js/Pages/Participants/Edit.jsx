// resources/js/Pages/Participants/Edit.jsx
import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { Input, TextArea, Checkbox, Button } from '@/Components/FormElements';
import { FiChevronLeft, FiTrash2 } from 'react-icons/fi';

export default function ParticipantEdit({ participant, cooperative }) {
    const [showDeleteModal, setShowDeleteModal] = React.useState(false);

    const { data, setData, put, processing, errors } = useForm({
        name: participant.name || '',
        email: participant.email || '',
        phone: participant.phone || '',
        member_id: participant.member_id || '',
        additional_info: participant.additional_info ? JSON.stringify(participant.additional_info) : '{}',
        active: participant.active,
        _method: 'PUT',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route('participants.update', participant.id));
    };

    const handleDelete = () => {
        window.location.href = route('participants.destroy', participant.id);
    };

    return (
        <AppLayout>
            <PageHeader
                title="Edit Participant"
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
                <Card>
                    <form onSubmit={handleSubmit}>
                        <Input
                            id="name"
                            label="Full Name"
                            value={data.name}
                            onChange={(e) => setData('name', e.target.value)}
                            error={errors.name}
                            required
                        />

                        <Input
                            id="email"
                            type="email"
                            label="Email Address"
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                            error={errors.email}
                            required
                        />

                        <Input
                            id="phone"
                            type="tel"
                            label="Phone Number (Optional)"
                            value={data.phone}
                            onChange={(e) => setData('phone', e.target.value)}
                            error={errors.phone}
                        />

                        <Input
                            id="member_id"
                            label="Member ID (Optional)"
                            value={data.member_id}
                            onChange={(e) => setData('member_id', e.target.value)}
                            error={errors.member_id}
                        />

                        <Checkbox
                            id="active"
                            label="Active"
                            checked={data.active}
                            onChange={(e) => setData('active', e.target.checked)}
                        />

                        <div className="mt-6 flex justify-between">
                            <Button
                                type="button"
                                variant="danger"
                                onClick={() => setShowDeleteModal(true)}
                            >
                                <FiTrash2 className="mr-2" /> Delete Participant
                            </Button>

                            <div>
                                <Link
                                    href={route('participants.index')}
                                    className="btn-secondary mr-3"
                                >
                                    Cancel
                                </Link>
                                <Button
                                    type="submit"
                                    disabled={processing}
                                >
                                    {processing ? 'Saving...' : 'Save Changes'}
                                </Button>
                            </div>
                        </div>
                    </form>
                </Card>
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white dark:bg-dark-paper rounded-lg w-full max-w-md">
                        <div className="p-6">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
                                Confirm Deletion
                            </h3>
                            <p className="text-gray-600 dark:text-gray-300 mb-4">
                                Are you sure you want to delete {participant.name}? This action cannot be undone.
                            </p>
                            <div className="flex justify-end space-x-3">
                                <button
                                    className="btn-secondary"
                                    onClick={() => setShowDeleteModal(false)}
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
