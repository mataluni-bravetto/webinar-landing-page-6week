import React from 'react'
import { Button, ButtonProps } from './Button'

interface CTAButtonProps extends Omit<ButtonProps, 'children'> {
  label: string
  children?: React.ReactNode
}

export function CTAButton({ label, children, ...props }: CTAButtonProps) {
  return (
    <Button {...props}>
      {label || children}
    </Button>
  )
}

