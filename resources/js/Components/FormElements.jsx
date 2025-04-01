// resources/js/Components/FormElements.jsx
import React from 'react';

export const Input = ({
                          id,
                          type = 'text',
                          label,
                          className = '',
                          error = null,
                          ...props
                      }) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <input
                id={id}
                type={type}
                className={`input ${error ? 'border-red-500 dark:border-red-800' : ''} ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
};

export const TextArea = ({
                             id,
                             label,
                             className = '',
                             error = null,
                             ...props
                         }) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <textarea
                id={id}
                className={`input ${error ? 'border-red-500 dark:border-red-800' : ''} ${className}`}
                {...props}
            />
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
};

export const Select = ({
                           id,
                           label,
                           options = [],
                           className = '',
                           error = null,
                           ...props
                       }) => {
    return (
        <div className="mb-4">
            {label && (
                <label htmlFor={id} className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    {label}
                </label>
            )}
            <select
                id={id}
                className={`input ${error ? 'border-red-500 dark:border-red-800' : ''} ${className}`}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>}
        </div>
    );
};

export const Checkbox = ({
                             id,
                             label,
                             className = '',
                             ...props
                         }) => {
    return (
        <div className="flex items-center mb-4">
            <input
                id={id}
                type="checkbox"
                className={`h-4 w-4 text-indigo-600 dark:text-dark-accent focus:ring-indigo-500 dark:focus:ring-dark-accent border-gray-300 dark:border-gray-700 rounded ${className}`}
                {...props}
            />
            {label && (
                <label htmlFor={id} className="ml-2 block text-sm text-gray-700 dark:text-gray-300">
                    {label}
                </label>
            )}
        </div>
    );
};

export const Button = ({
                           children,
                           type = 'button',
                           variant = 'primary',
                           className = '',
                           ...props
                       }) => {
    const variantClass = {
        primary: 'btn-primary',
        secondary: 'btn-secondary',
        danger: 'btn-danger',
        success: 'btn-success',
    }[variant] || 'btn-primary';

    return (
        <button
            type={type}
            className={`${variantClass} ${className}`}
            {...props}
        >
            {children}
        </button>
    );
};
