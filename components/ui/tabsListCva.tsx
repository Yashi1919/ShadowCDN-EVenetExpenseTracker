import * as TabsPrimitive from '@rn-primitives/tabs';
import * as React from 'react';
import { cn } from '~/lib/utils';
import { cva, type VariantProps } from 'class-variance-authority';
import { TextClassContext } from '~/components/ui/text';

// Define tabs list styles using CVA
const tabsListCva = cva('flex items-center justify-start', {
  variants: {
    variant: {
      default: 'bg-muted rounded-md p-1',
      underline: 'border-b border-muted p-0',
      rounded: 'bg-muted rounded-lg p-2',
    },
    size: {
      sm: 'h-8',
      md: 'h-10',
      lg: 'h-12',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
  },
});

// Define tabs trigger styles using CVA
const tabsTriggerCva = cva(
  'inline-flex items-center justify-center text-sm font-medium web:transition-all',
  {
    variants: {
      variant: {
        default: 'bg-transparent text-muted-foreground hover:text-foreground',
        underline: 'border-b-2 border-transparent hover:border-foreground',
        pill: 'rounded-full bg-muted hover:bg-background text-muted-foreground',
      },
      size: {
        sm: 'px-2 py-1',
        md: 'px-3 py-1.5',
        lg: 'px-4 py-2',
      },
      color: {
        default: 'text-muted-foreground',
        primary: 'bg-blue-500 text-white hover:bg-blue-600',
        secondary: 'bg-gray-500 text-white hover:bg-gray-600',
        danger: 'bg-red-500 text-white hover:bg-red-600',
        success: 'bg-green-500 text-white hover:bg-green-600',
        warning: 'bg-yellow-500 text-black hover:bg-yellow-600',
      },
      active: {
        true: 'bg-background text-foreground shadow-md',
        false: '',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'md',
      color: 'default',
      active: 'false',
    },
  }
);

// Define tabs content styles using CVA
const tabsContentCva = cva('p-4', {
  variants: {
    size: {
      sm: 'p-2',
      md: 'p-4',
      lg: 'p-6',
    },
    color: {
      default: 'bg-background text-foreground',
      primary: 'bg-blue-50 text-blue-800',
      secondary: 'bg-gray-100 text-gray-800',
      danger: 'bg-red-50 text-red-800',
      success: 'bg-green-50 text-green-800',
      warning: 'bg-yellow-50 text-yellow-800',
    },
  },
  defaultVariants: {
    size: 'md',
    color: 'default',
  },
});

// Tabs Root
const Tabs = TabsPrimitive.Root;

// Tabs List
const TabsList = React.forwardRef<
  TabsPrimitive.ListRef,
  TabsPrimitive.ListProps & VariantProps<typeof tabsListCva>
>(({ className, variant, size, ...props }, ref) => (
  <TabsPrimitive.List
    ref={ref}
    className={cn(tabsListCva({ variant, size, className }))}
    {...props}
  />
));
TabsList.displayName = TabsPrimitive.List.displayName;

// Tabs Trigger
const TabsTrigger = React.forwardRef<
  TabsPrimitive.TriggerRef,
  TabsPrimitive.TriggerProps & VariantProps<typeof tabsTriggerCva>
>(({ className, variant, size, color, ...props }, ref) => {
  const { value } = TabsPrimitive.useRootContext();
  const isActive = value === props.value;

  return (
    <TextClassContext.Provider
      value={cn(
        tabsTriggerCva({ variant, size, color, active: isActive ? 'true' : 'false' }),
        className
      )}
    >
      <TabsPrimitive.Trigger
        ref={ref}
        className={cn(
          tabsTriggerCva({ variant, size, color, active: isActive ? 'true' : 'false' }),
          props.disabled && 'web:pointer-events-none opacity-50',
          className
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
});
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName;

// Tabs Content
const TabsContent = React.forwardRef<
  TabsPrimitive.ContentRef,
  TabsPrimitive.ContentProps & VariantProps<typeof tabsContentCva>
>(({ className, size, color, ...props }, ref) => (
  <TabsPrimitive.Content
    ref={ref}
    className={cn(tabsContentCva({ size, color, className }))}
    {...props}
  />
));
TabsContent.displayName = TabsPrimitive.Content.displayName;

export { Tabs, TabsContent, TabsList, TabsTrigger, tabsListCva, tabsTriggerCva, tabsContentCva };
