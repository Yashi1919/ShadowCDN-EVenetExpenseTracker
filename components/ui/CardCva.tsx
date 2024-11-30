import type { TextRef, ViewRef } from '@rn-primitives/types';
import * as React from 'react';
import { Text, TextProps, View, ViewProps } from 'react-native';
import { TextClassContext } from '~/components/ui/text';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '~/lib/utils';

// Define card variants using CVA
const cardCva = cva(
  'rounded-md border shadow-sm',
  {
    variants: {
      variant: {
        default: 'border-border bg-card shadow-foreground/10',
        outline: 'border-gray-300 bg-transparent',
        shadowed: 'border-border bg-card shadow-md shadow-foreground/30',
        elevated: 'border-none bg-card shadow-xl shadow-foreground/50',
      },
      size: {
        sm: 'p-2',
        md: 'p-4',
        lg: 'p-6',
        xl: 'p-8',
      },
      color: {
        default: 'bg-white text-gray-800',
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-200 text-gray-800',
        danger: 'bg-red-500 text-white',
        success: 'bg-green-500 text-white',
        warning: 'bg-yellow-500 text-black',
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
      color: 'default',
      rounded: 'md',
    },
  }
);

// Extend ViewProps with custom card variants
type CardProps = ViewProps & VariantProps<typeof cardCva>;

const Card = React.forwardRef<ViewRef, CardProps>(
  ({ className, variant, size, color, rounded, ...props }, ref) => (
    <View
      ref={ref}
      className={cn(cardCva({ variant, size, color, rounded, className }))}
      {...props}
    />
  )
);
Card.displayName = 'Card';

const CardHeader = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-col space-y-1.5 p-6', className)} {...props} />
));
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef<TextRef, React.ComponentPropsWithoutRef<typeof Text>>(
  ({ className, ...props }, ref) => (
    <Text
      role='heading'
      aria-level={3}
      ref={ref}
      className={cn(
        'text-2xl font-semibold leading-none tracking-tight',
        'text-card-foreground',
        className
      )}
      {...props}
    />
  )
);
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef<TextRef, TextProps>(({ className, ...props }, ref) => (
  <Text ref={ref} className={cn('text-sm text-muted-foreground', className)} {...props} />
));
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <TextClassContext.Provider value='text-card-foreground'>
    <View ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  </TextClassContext.Provider>
));
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef<ViewRef, ViewProps>(({ className, ...props }, ref) => (
  <View ref={ref} className={cn('flex flex-row items-center p-6 pt-0', className)} {...props} />
));
CardFooter.displayName = 'CardFooter';

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle, cardCva };
export type { CardProps };
