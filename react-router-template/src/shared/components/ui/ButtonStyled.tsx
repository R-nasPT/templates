import type { ComponentProps } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { Button } from './Button';
import { cn } from '@/shared/lib';

const buttonStyledVariants = cva('duration-300', {
  variants: {
    variant: {
      'outline-blue':
        'border border-blue-300 text-blue-600 hover:bg-blue-50 hover:text-blue-500 dark:border-blue-800 dark:text-blue-400 dark:hover:bg-blue-950 dark:hover:text-blue-300',
      'outline-green':
        'border border-green-300 text-green-600 hover:bg-green-50 hover:text-green-500 dark:border-green-800 dark:text-green-400 dark:hover:bg-green-950 dark:hover:text-green-300',
      'outline-red':
        'border border-red-300 text-red-600 hover:bg-red-50 hover:text-red-500 dark:border-red-800 dark:text-red-400 dark:hover:bg-red-950 dark:hover:text-red-300',
      'outline-gray':
        'border border-gray-300 text-gray-600 hover:bg-gray-100 hover:text-gray-500 dark:border-gray-800 dark:text-gray-400 dark:hover:bg-gray-950 dark:hover:text-gray-300',
      'outline-orange':
        'border border-orange-200 text-orange-500 hover:bg-orange-50 hover:text-orange-600',

      'solid-blue':
        'bg-blue-500 text-white hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-600',
      'solid-green':
        'bg-green-500 text-white hover:bg-green-600 dark:bg-green-700 dark:hover:bg-green-600',
      'solid-red':
        'bg-red-500 text-white hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-600',
      'solid-emerald':
        'bg-emerald-500 text-white hover:bg-emerald-600 dark:bg-emerald-700 dark:hover:bg-emerald-600',

      'ghost-blue':
        'text-blue-500 hover:bg-blue-50 hover:text-blue-600 dark:text-blue-400 dark:hover:bg-blue-950',
      'ghost-green':
        'text-green-500 hover:bg-green-50 hover:text-green-600 dark:text-green-400 dark:hover:bg-green-950',
      'ghost-red':
        'text-red-500 hover:bg-red-50 hover:text-red-600 dark:text-red-600 dark:hover:bg-red-950',

      'soft-blue':
        'bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-950 dark:text-blue-300 dark:hover:bg-blue-900',
      'soft-green':
        'bg-green-100 text-green-700 hover:bg-green-200 dark:bg-green-950 dark:text-green-300 dark:hover:bg-green-900',
      'soft-red':
        'bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-950 dark:text-red-300 dark:hover:bg-red-900',
    },
  },
  defaultVariants: {
    variant: 'solid-blue',
  },
});

type ButtonStyledProps = Omit<ComponentProps<typeof Button>, 'variant'> &
  VariantProps<typeof buttonStyledVariants>;

function ButtonStyled({ variant, className, ...props }: ButtonStyledProps) {
  return (
    <Button
      variant="custom"
      className={cn(buttonStyledVariants({ variant }), className)}
      {...props}
    />
  );
}

export { ButtonStyled };
