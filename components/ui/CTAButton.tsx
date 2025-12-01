import React from 'react'
import { Button, ButtonProps } from './Button'

interface CTAButtonProps extends ButtonProps {
  label: string
}

export function CTAButton({ label, children, ...props }: CTAButtonProps) {
  return (
    <Button {...props}>
      {label || children}
    </Button>
  )
}

