import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Pressable, PressableProps } from 'react-native';
import { cn } from '~/lib/utils';

// Define button variants using CVA
const btnVariants = cva(
  'flex items-center justify-center rounded-md web:transition-colors web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-offset-2',
  {
    variants: {
      variant: {
        default: 'bg-primary text-white web:hover:bg-primary-dark',
        destructive: 'bg-red-500 text-white web:hover:bg-red-600',
        outline: 'border border-gray-300 bg-white text-gray-800 web:hover:bg-gray-100',
        secondary: 'bg-gray-200 text-gray-800 web:hover:bg-gray-300',
        ghost: 'bg-transparent text-gray-800 web:hover:bg-gray-100',
        link: 'text-blue-500 underline web:hover:text-blue-600',
      },
      size: {
        sm: 'h-8 px-3 text-sm',
        md: 'h-10 px-4 text-base',
        lg: 'h-12 px-6 text-lg',
        xl: 'h-14 px-8 text-xl',
      },
      rounded: {
        none: 'rounded-none',
        sm: 'rounded-sm',
        md: 'rounded-md',
        lg: 'rounded-lg',
        full: 'rounded-full',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      rounded: 'md',
    },
  }
);

// Extend React Native Pressable Props with custom variants
type BtnProps = PressableProps & VariantProps<typeof btnVariants>;

// Create the Btn component
const Btn: React.FC<BtnProps> = ({ children, variant, size, rounded, className, ...props }) => {
  return (
    <Pressable
      className={cn(btnVariants({ variant, size, rounded, className }))}
      {...props}
    >
      {children}
    </Pressable>
  );
};

export { Btn, btnVariants };
export type { BtnProps };
