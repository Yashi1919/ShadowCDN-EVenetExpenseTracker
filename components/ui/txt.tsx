import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Text as RNText, TextProps as RNTextProps } from 'react-native';
import { cn } from '~/lib/utils';

// Define text variants using CVA
const txtVariants = cva('font-medium text-base', {
  variants: {
    variant: {
      default: 'text-foreground',
      primary: 'text-primary',
      secondary: 'text-secondary',
      destructive: 'text-destructive',
      muted: 'text-muted',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
    },
    weight: {
      light: 'font-light',
      normal: 'font-normal',
      bold: 'font-bold',
      extrabold: 'font-extrabold',
    },
    color: {
      default: '',
      red: 'text-red-500',
      blue: 'text-blue-500',
      green: 'text-green-500',
      yellow: 'text-yellow-500',
      purple: 'text-purple-500',
      gray: 'text-gray-500',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    weight: 'normal',
    color: 'default',
  },
});

// Extend React Native Text Props with custom variants
type TxtProps = RNTextProps & VariantProps<typeof txtVariants>;

// Create the Txt component
const Txt: React.FC<TxtProps> = ({ children, variant, size, weight, color, className, ...props }) => {
  return (
    <RNText className={cn(txtVariants({ variant, size, weight, color, className }))} {...props}>
      {children}
    </RNText>
  );
};

export { Txt, txtVariants };
export type { TxtProps };
