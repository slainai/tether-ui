import { cva, type VariantProps } from 'class-variance-authority'
import { type ComponentRef, forwardRef, type HTMLAttributes } from 'react'
import { cn } from '@/lib/utils'

const templateVariants = cva('', {
  variants: {
    variant: {
      default: '',
    },
    size: {
      sm: '',
      md: '',
      lg: '',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
})

interface TemplateProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof templateVariants> {}

const Template = forwardRef<ComponentRef<'div'>, TemplateProps>(
  ({ className, variant, size, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(templateVariants({ variant, size }), className)} {...props} />
    )
  },
)
Template.displayName = 'Template'

export { Template, type TemplateProps, templateVariants }
