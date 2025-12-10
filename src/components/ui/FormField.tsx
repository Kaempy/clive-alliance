import { cn } from '@/lib';
import { Eye, EyeClosed } from 'lucide-react-native';
import React, { Dispatch, memo, SetStateAction, useCallback, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import {
  BlurEvent,
  FocusEvent,
  Pressable,
  Text,
  TextInput,
  TextInputProps,
  View,
} from 'react-native';

type Props = {
  name: string;
  label?: string;
  loading?: boolean;
  isPassword?: boolean;
  inputProps?: TextInputProps;
};

export const Label = memo(({ label }: { label?: string }) => {
  if (!label) return null;
  return <Text className={cn('ms-2 text-sm text-black')}>{label}</Text>;
});
Label.displayName = 'Label';

const ErrorMessage = memo(({ message }: { message?: string }) => {
  if (!message) return null;
  return <Text className="text-sm text-[firebrick]">{message}</Text>;
});
ErrorMessage.displayName = 'Error Message';

const BaseInput = memo(
  ({
    name,
    inputProps,
    onChange,
    onBlur,
    setFocus,
    value,
    error,
  }: {
    name: string;
    inputProps?: TextInputProps;
    onChange: (val: string) => void;
    onBlur: () => void;
    setFocus?: Dispatch<SetStateAction<boolean>>;
    value: string | undefined;
    error?: boolean;
  }) => {
    const [focused, setFocused] = useState(false);
    const inputValue = value ?? '';

    const handleChangeText = useCallback(
      (val: string) => {
        if (inputProps?.keyboardType === 'numeric') {
          onChange(val.replace(/[^0-9]/g, ''));
          return;
        }
        onChange(val);
      },
      [inputProps?.keyboardType, onChange],
    );
    const handleFocus = useCallback(
      (e: FocusEvent) => {
        setFocused(true);
        setFocus?.(true);
      },
      [setFocused, setFocus],
    );

    const handleBlur = useCallback(
      (e: BlurEvent) => {
        setFocused(false);
        setFocus?.(false);
        onBlur();
      },
      [onBlur, setFocused, setFocus],
    );

    return (
      <TextInput
        nativeID={name}
        {...inputProps}
        onFocus={handleFocus}
        className={cn(
          'h-14 items-center justify-center rounded-full border border-input px-3 py-2',
          focused && 'border-primary-title',
          error && 'border-[firebrick]',
          inputProps?.className,
        )}
        placeholderTextColor={inputProps?.placeholderTextColor ?? '#83899B'}
        style={[{ fontSize: 13 }, inputProps?.style]}
        autoCapitalize={inputProps?.autoCapitalize ?? 'none'}
        autoCorrect={inputProps?.autoCorrect ?? false}
        value={inputValue}
        onChangeText={handleChangeText}
        onBlur={handleBlur}
      />
    );
  },
);
BaseInput.displayName = 'BaseInput';

const PasswordInput = memo(
  ({
    name,
    inputProps,
    onChange,
    onBlur,
    value,
    error,
  }: {
    name: string;
    inputProps?: TextInputProps;
    onChange: (val: string) => void;
    onBlur: () => void;
    value: string;
    error: boolean;
  }) => {
    const [showPassword, setShowPassword] = useState(false);
    const [focus, setFocus] = useState(false);
    const handleShowPassword = useCallback(() => {
      setShowPassword((prev) => !prev);
    }, []);

    return (
      <Pressable
        className={cn(
          'h-14 flex-row items-center rounded-full border border-input',
          focus && 'border-primary-title',
          error && 'border-[firebrick]',
        )}>
        <BaseInput
          name={name}
          inputProps={{
            ...inputProps,
            secureTextEntry: !showPassword,
            className: 'border-none border-transparent flex-1',
          }}
          onChange={onChange}
          onBlur={onBlur}
          setFocus={setFocus}
          value={value}
        />
        <Pressable
          className="me-2 shrink-0 items-center justify-center p-2"
          onPress={handleShowPassword}>
          {showPassword ? <EyeClosed color="black" size={20} /> : <Eye color="black" size={20} />}
        </Pressable>
      </Pressable>
    );
  },
);
PasswordInput.displayName = 'PasswordInput';

const FormField = ({ name, label, isPassword, loading, inputProps }: Props) => {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      disabled={loading}
      render={({ field: { onChange, onBlur, value }, fieldState: { error } }) => (
        <View className="gap-0.5">
          <Label label={label} />
          {isPassword ? (
            <PasswordInput
              name={name}
              inputProps={inputProps}
              onChange={onChange}
              onBlur={onBlur}
              value={value}
              error={!!error?.message}
            />
          ) : (
            <BaseInput
              name={name}
              inputProps={inputProps}
              onChange={onChange}
              onBlur={onBlur}
              value={value as string | undefined}
              error={!!error?.message}
            />
          )}
          <ErrorMessage message={error?.message} />
        </View>
      )}
    />
  );
};

export default memo(FormField);
