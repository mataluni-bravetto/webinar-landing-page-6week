import React from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: string
  size?: 'sm' | 'md' | 'lg'
}

const sizeClasses = {
  sm: 'h-8 text-sm',
  md: 'h-10',
  lg: 'h-12 text-lg',
}

export function Input({ variant, size = 'md', className = '', ...props }: InputProps) {
  const classes = [
    'w-full px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500',
    sizeClasses[size],
    className
  ].filter(Boolean).join(' ')

  return <input className={classes} {...props} />
}

