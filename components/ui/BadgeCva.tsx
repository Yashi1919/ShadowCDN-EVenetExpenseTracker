import { cva, type VariantProps } from 'class-variance-authority';
import React from 'react';
import { Text, View, ViewProps, TextProps } from 'react-native';
import { cn } from '~/lib/utils';

// Define badge variants using CVA
const badgeCva = cva(
  'flex items-center justify-center rounded-full px-3 py-1 text-sm font-medium',
  {
    variants: {
      variant: {
        default: 'bg-gray-200 text-gray-800',
        primary: 'bg-blue-500 text-white',
        secondary: 'bg-gray-500 text-white',
        success: 'bg-green-500 text-white',
        danger: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-black',
      },
      size: {
        sm: 'text-xs px-2 py-0.5',
        md: 'text-sm px-3 py-1',
        lg: 'text-base px-4 py-1.5',
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
      rounded: 'full',
    },
  }
);

// Extend ViewProps with custom badge variants
type BadgeProps = ViewProps & VariantProps<typeof badgeCva> & { textProps?: TextProps };

// Create the Badge component
const Badge: React.FC<BadgeProps> = ({ children, variant, size, rounded, className, textProps, ...props }) => {
  return (
    <View
      className={cn(badgeCva({ variant, size, rounded, className }))}
      {...props}
    >
      <Text {...textProps}>{children}</Text>
    </View>
  );
};

export { Badge, badgeCva };
export type { BadgeProps };
