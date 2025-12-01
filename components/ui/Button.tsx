import React from 'react'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'developer' | 'creative' | 'enterprise'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  label?: string
  children?: React.ReactNode
}

const variantClasses = {
  default: 'bg-gray-600 hover:bg-gray-700',
  developer: 'bg-blue-600 hover:bg-blue-700',
  creative: 'bg-purple-600 hover:bg-purple-700',
  enterprise: 'bg-indigo-600 hover:bg-indigo-700',
}

const sizeClasses = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg',
  xl: 'px-8 py-4 text-xl',
}

export function Button({ 
  variant = 'default', 
  size = 'md', 
  label,
  className = '', 
  children,
  ...props 
}: ButtonProps) {
  const classes = [
    'text-white font-semibold rounded-lg transition-colors',
    variantClasses[variant],
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ')

  return (
    <button className={classes} {...props}>
      {label || children}
    </button>
  )
}

