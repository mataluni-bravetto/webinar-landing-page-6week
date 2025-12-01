import React from 'react'

interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  label?: string
  required?: boolean
  children: React.ReactNode
}

export function FormField({ label, required, className = '', children, ...props }: FormFieldProps) {
  return (
    <div className={`space-y-2 ${className}`} {...props}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="text-red-500 ml-1">*</span>}
        </label>
      )}
      {children}
    </div>
  )
}

