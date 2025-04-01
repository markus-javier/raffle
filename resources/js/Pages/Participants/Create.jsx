// resources/js/Pages/Participants/Create.jsx
import React from 'react';
import { useForm, Link } from '@inertiajs/react';
import AppLayout from '@/Layouts/AppLayout';
import Card from '@/Components/Card';
import PageHeader from '@/Components/PageHeader';
import { Input, TextArea, Checkbox, Button } from '@/Components/FormElements';
import { FiChevronLeft } from 'react-icons/fi';

export default function ParticipantCreate({ cooperative }) {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        email: '',
        phone: '',
        member_id: '',
        additional_info: '{}',
        active: true,
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        post(route('participants.store'));
    };

    return (
        <AppLayout>
            <PageHeader
                title="Add Participant"
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

                        <div className="mt-6 flex justify-end">
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
                                {processing ? 'Adding...' : 'Add Participant'}
                            </Button>
                        </div>
                    </form>
                </Card>
            </div>
        </AppLayout>
    );
}
