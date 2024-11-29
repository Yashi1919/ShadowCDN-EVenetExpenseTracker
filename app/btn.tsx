import React from 'react';
import { cva } from 'class-variance-authority';

const buttonStyles = cva(
  'base-button',
  {
    variants: {
      size: {
        small: 'button-small',
        medium: 'button-medium',
        large: 'button-large',
      },
      color: {
        primary: 'button-primary',
        secondary: 'button-secondary',
      },
    },
    defaultVariants: {
      size: 'medium',
      color: 'primary',
    },
  }
);

const Button = ({ size, color, children }) => {
  return (
    <button className={buttonStyles({ size, color })}>
      {children}
    </button>
  );
};

export default Button;