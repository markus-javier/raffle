// resources/js/Components/Card.jsx
import React from 'react';

export default function Card({ title, children, footer = null, className = '' }) {
    return (
        <div className={`card ${className}`}>
            {title && (
                <div className="mb-4 pb-2 border-b border-gray-200 dark:border-gray-700">
                    <h2 className="text-lg font-medium text-gray-900 dark:text-white">{title}</h2>
                </div>
            )}
            <div>{children}</div>
            {footer && (
                <div className="mt-4 pt-2 border-t border-gray-200 dark:border-gray-700">
                    {footer}
                </div>
            )}
        </div>
    );
}
