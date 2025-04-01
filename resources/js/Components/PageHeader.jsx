// resources/js/Components/PageHeader.jsx
import React from 'react';
import { Link } from '@inertiajs/react';

export default function PageHeader({ title, actions = [] }) {
    return (
        <div className="pb-5 border-b border-gray-200 dark:border-gray-700 sm:flex sm:items-center sm:justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{title}</h1>
            {actions.length > 0 && (
                <div className="mt-3 flex sm:mt-0 sm:ml-4">
                    {actions.map((action, index) => (
                        <React.Fragment key={index}>
                            {action.href ? (
                                <Link
                                    href={action.href}
                                    className={`${index > 0 ? 'ml-3' : ''} ${action.variant ? `btn-${action.variant}` : 'btn-primary'}`}
                                >
                                    {action.icon && <span className="mr-2">{action.icon}</span>}
                                    {action.label}
                                </Link>
                            ) : (
                                <button
                                    type="button"
                                    onClick={action.onClick}
                                    className={`${index > 0 ? 'ml-3' : ''} ${action.variant ? `btn-${action.variant}` : 'btn-primary'}`}
                                >
                                    {action.icon && <span className="mr-2">{action.icon}</span>}
                                    {action.label}
                                </button>
                            )}
                        </React.Fragment>
                    ))}
                </div>
            )}
        </div>
    );
}
