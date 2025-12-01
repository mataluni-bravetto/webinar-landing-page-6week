import React from 'react'

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'blockquote'
  size?: 'xs' | 'sm' | 'base' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl'
  weight?: 'normal' | 'medium' | 'semibold' | 'bold'
  variant?: 'default' | 'muted'
  align?: 'left' | 'center' | 'right'
  children: React.ReactNode
}

const sizeClasses = {
  xs: 'text-xs',
  sm: 'text-sm',
  base: 'text-base',
  lg: 'text-lg',
  xl: 'text-xl',
  '2xl': 'text-2xl',
  '3xl': 'text-3xl',
  '4xl': 'text-4xl',
  '5xl': 'text-5xl',
  '6xl': 'text-6xl',
}

const weightClasses = {
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
}

export function Text({ 
  as = 'p', 
  size = 'base', 
  weight = 'normal',
  variant,
  align,
  className = '', 
  children,
  ...props 
}: TextProps) {
  const Component = as
  const classes = [
    sizeClasses[size],
    weightClasses[weight],
    variant === 'muted' && 'text-gray-600',
    align === 'center' && 'text-center',
    align === 'right' && 'text-right',
    className
  ].filter(Boolean).join(' ')

  return (
    <Component className={classes} {...props}>
      {children}
    </Component>
  )
}

