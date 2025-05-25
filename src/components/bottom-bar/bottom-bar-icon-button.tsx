import { cva, type VariantProps } from 'class-variance-authority';
import { forwardRef, useRef, useState } from 'react';

import { cn } from '../../libs/utils';
import { Popover } from '../popover';

const bottomBarIconButtonVariants = cva(
  'inline-flex items-center justify-center font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 relative',
  {
    variants: {
      variant: {
        // Core color variants following color palette
        coral: 'bg-coral-500 text-white hover:bg-coral-600 focus:ring-coral-300 active:bg-coral-700',
        'coral-outline': 'border border-coral-300 bg-transparent text-coral-600 hover:bg-coral-50 focus:ring-coral-300',
        'coral-ghost': 'text-coral-600 hover:bg-coral-50 focus:ring-coral-300',

        sage: 'bg-sage-500 text-white hover:bg-sage-600 focus:ring-sage-300 active:bg-sage-700',
        'sage-outline': 'border border-sage-300 bg-transparent text-sage-600 hover:bg-sage-50 focus:ring-sage-300',
        'sage-ghost': 'text-sage-600 hover:bg-sage-50 focus:ring-sage-300',

        mist: 'bg-mist-500 text-white hover:bg-mist-600 focus:ring-mist-300 active:bg-mist-700',
        'mist-outline': 'border border-mist-300 bg-transparent text-mist-600 hover:bg-mist-50 focus:ring-mist-300',
        'mist-ghost': 'text-mist-600 hover:bg-mist-50 focus:ring-mist-300',

        slate: 'bg-slate-600 text-white hover:bg-slate-700 focus:ring-slate-300 active:bg-slate-800',
        'slate-outline': 'border border-slate-300 bg-transparent text-slate-600 hover:bg-slate-50 focus:ring-slate-300',
        'slate-ghost': 'text-slate-600 hover:bg-slate-50 focus:ring-slate-300',

        // Semantic variants
        success: 'bg-success-500 text-white hover:bg-success-600 focus:ring-success-300',
        'success-outline':
          'border border-success-300 bg-transparent text-success-600 hover:bg-success-50 focus:ring-success-300',
        'success-ghost': 'text-success-600 hover:bg-success-50 focus:ring-success-300',

        info: 'bg-info-500 text-white hover:bg-info-600 focus:ring-info-300',
        'info-outline': 'border border-info-300 bg-transparent text-info-600 hover:bg-info-50 focus:ring-info-300',
        'info-ghost': 'text-info-600 hover:bg-info-50 focus:ring-info-300',

        warning: 'bg-warning-500 text-white hover:bg-warning-600 focus:ring-warning-300',
        'warning-outline':
          'border border-warning-300 bg-transparent text-warning-600 hover:bg-warning-50 focus:ring-warning-300',
        'warning-ghost': 'text-warning-600 hover:bg-warning-50 focus:ring-warning-300',

        danger: 'bg-danger-500 text-white hover:bg-danger-600 focus:ring-danger-300',
        'danger-outline':
          'border border-danger-300 bg-transparent text-danger-600 hover:bg-danger-50 focus:ring-danger-300',
        'danger-ghost': 'text-danger-600 hover:bg-danger-50 focus:ring-danger-300',
      },
      size: {
        sm: 'h-8 w-8 text-sm',
        md: 'h-10 w-10 text-base',
        lg: 'h-12 w-12 text-lg',
        xl: 'h-14 w-14 text-xl',
      },
      rounded: {
        true: 'rounded-full',
        false: 'rounded-lg',
      },
      withBadge: {
        true: '',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'slate-ghost',
      size: 'md',
      rounded: true,
      withBadge: false,
    },
  }
);

export interface BottomBarIconButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof bottomBarIconButtonVariants> {
  icon?: React.ReactNode;
  badge?: string | number;
  badgeVariant?: 'coral' | 'sage' | 'danger' | 'warning' | 'info' | 'success';
  popoverContent?: React.ReactNode;
  popoverOpen?: boolean;
  onPopoverToggle?: (open: boolean) => void;
  tooltip?: string;
}

export const BottomBarIconButton = forwardRef<HTMLButtonElement, BottomBarIconButtonProps>(
  (
    {
      className,
      variant,
      size,
      rounded,
      withBadge,
      icon,
      badge,
      badgeVariant = 'coral',
      popoverContent,
      popoverOpen,
      onPopoverToggle,
      tooltip,
      onClick,
      ...props
    },
    ref
  ) => {
    const [internalPopoverOpen, setInternalPopoverOpen] = useState(false);
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    const isPopoverOpen = popoverOpen ?? internalPopoverOpen;

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (popoverContent) {
        const newOpen = !isPopoverOpen;
        if (onPopoverToggle) {
          onPopoverToggle(newOpen);
        } else {
          setInternalPopoverOpen(newOpen);
        }
      }
      onClick?.(e);
    };

    const handlePopoverClose = () => {
      if (onPopoverToggle) {
        onPopoverToggle(false);
      } else {
        setInternalPopoverOpen(false);
      }
    };

    const getBadgeColor = (selectedVariant: string) => {
      const colors = {
        coral: 'bg-coral-500 text-white',
        sage: 'bg-sage-500 text-white',
        danger: 'bg-danger-500 text-white',
        warning: 'bg-warning-500 text-white',
        info: 'bg-info-500 text-white',
        success: 'bg-success-500 text-white',
      };
      return colors[selectedVariant as keyof typeof colors] || colors.coral;
    };

    return (
      <>
        <button
          ref={ref ?? buttonRef}
          className={cn(bottomBarIconButtonVariants({ variant, size, rounded, withBadge }), className)}
          onClick={handleClick}
          title={tooltip}
          {...props}
        >
          {icon}

          {badge && (
            <span
              className={cn(
                'absolute -top-1 -right-1 min-w-[1.25rem] h-5 flex items-center justify-center text-xs font-semibold rounded-full px-1',
                getBadgeColor(badgeVariant)
              )}
            >
              {badge}
            </span>
          )}
        </button>

        {popoverContent && (
          <Popover
            open={isPopoverOpen}
            onClose={handlePopoverClose}
            trigger={(ref as unknown as any) ?? buttonRef}
            placement="top-end"
            className="min-w-48 max-w-sm bg-cream-50 border border-mist-200 rounded-lg shadow-lg p-3"
          >
            {popoverContent}
          </Popover>
        )}
      </>
    );
  }
);

BottomBarIconButton.displayName = 'BottomBarIconButton';
