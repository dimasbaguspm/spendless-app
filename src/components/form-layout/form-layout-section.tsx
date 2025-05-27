import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '../../libs/utils';

const formLayoutSectionVariants = cva('space-y-4', {
  variants: {
    spacing: {
      sm: 'space-y-2',
      md: 'space-y-4',
      lg: 'space-y-6',
      xl: 'space-y-8',
    },
  },
  defaultVariants: {
    spacing: 'md',
  },
});

const formLayoutSectionTitleVariants = cva('font-semibold text-slate-700 border-b border-slate-200 pb-2', {
  variants: {
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
  },
  defaultVariants: {
    size: 'md',
  },
});

export interface FormLayoutSectionProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof formLayoutSectionVariants> {
  title?: string;
  titleSize?: VariantProps<typeof formLayoutSectionTitleVariants>['size'];
  titleClassName?: string;
}

export const FormLayoutSection = forwardRef<HTMLDivElement, FormLayoutSectionProps>(
  ({ className, spacing, title, titleSize, titleClassName, children, ...props }, ref) => {
    return (
      <div ref={ref} className={cn(formLayoutSectionVariants({ spacing }), className)} {...props}>
        {title && <h3 className={cn(formLayoutSectionTitleVariants({ size: titleSize }), titleClassName)}>{title}</h3>}
        {children}
      </div>
    );
  }
);

FormLayoutSection.displayName = 'FormLayoutSection';
