import { cn } from '@/lib';
import { cva, type VariantProps } from 'class-variance-authority';
import React, { FC, memo, ReactNode } from 'react';
import { Pressable, PressableProps, Text, View } from 'react-native';

const buttonContainer = cva('w-full rounded-xl border border-transparent bg-primary', {
  variants: {
    variant: {
      primary: 'bg-primary',
      outline: 'bg-white border-primary',
    },
    pressed: {
      true: '',
    },
    disabled: {
      true: 'bg-gray-300 border-gray-300',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      pressed: true,
      className: 'bg-primary/80',
    },
    {
      variant: 'outline',
      pressed: true,
      className: 'bg-white border-primary',
    },
    {
      variant: 'primary',
      disabled: true,
      className: 'bg-gray-300 border-gray-300',
    },
    {
      variant: 'outline',
      disabled: true,
      className: 'bg-gray-100 border-gray-300',
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
});

const buttonText = cva('font-semibold', {
  variants: {
    variant: {
      primary: 'text-white',
      outline: 'text-primary',
    },
    disabled: {
      true: 'text-gray-500',
    },
  },
  compoundVariants: [
    {
      variant: 'primary',
      disabled: true,
      className: 'text-gray-500',
    },
    {
      variant: 'outline',
      disabled: true,
      className: 'text-gray-400',
    },
  ],
  defaultVariants: {
    variant: 'primary',
  },
});

interface Props extends PressableProps, VariantProps<typeof buttonContainer> {
  children: ReactNode;
  shouldFlex?: boolean;
}

const Button: FC<Props> = ({ className, children, shouldFlex, variant, ...rest }: Props) => {
  const { disabled } = rest;
  const derivedVariant =
    variant ??
    (className?.includes('bg-white')
      ? 'outline'
      : className?.includes('bg-primary')
        ? 'primary'
        : 'primary');

  return (
    <Pressable {...rest} className={cn('mx-auto w-full items-center', shouldFlex && 'flex-1')}>
      {({ pressed }) => (
        <View
          className={cn(
            buttonContainer({
              variant: derivedVariant,
              pressed,
              disabled,
            }),
            className,
          )}>
          <View className="mx-auto flex items-center justify-center rounded-xl bg-inherit p-4">
            {typeof children === 'string' ? (
              <Text
                className={cn(
                  buttonText({
                    variant: derivedVariant,
                    disabled,
                  }),
                )}>
                {children}
              </Text>
            ) : (
              children
            )}
          </View>
        </View>
      )}
    </Pressable>
  );
};

export default memo(Button);
