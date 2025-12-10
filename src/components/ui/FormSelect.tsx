import { cn } from '@/lib';
import { styles } from '@/styles';
import { memo, useEffect, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { Text, View } from 'react-native';
import DropDownPicker, { type DropDownPickerProps, ItemType } from 'react-native-dropdown-picker';

type FormSelectProps<T extends string | number> = {
  name: string;
  label?: string;
  loading?: boolean;
  required?: boolean;
  isOptional?: boolean;
  options: ItemType<T>[];
  placeholder?: string;
  dropdownPickerProps?: Pick<
    DropDownPickerProps<T>,
    | 'listMode'
    | 'searchable'
    | 'multiple'
    | 'modalAnimationType'
    | 'bottomOffset'
    | 'mode'
    | 'zIndex'
    | 'zIndexInverse'
  >;
};

const FormSelect = <T extends string | number>({
  name,
  label,
  isOptional,
  loading,
  options,
  required,
  placeholder = 'Select an option',
  dropdownPickerProps,
}: FormSelectProps<T>) => {
  const { control } = useFormContext();
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState(options);
  const multiple = !!dropdownPickerProps?.multiple;
  // Update items when options prop changes
  useEffect(() => {
    setItems(options);
  }, [options]);
  return (
    <Controller
      name={name}
      control={control}
      rules={{
        required: required && 'This field is required',
        validate: (value) => {
          if (required && multiple) {
            return (value && value.length > 0) || 'At least one option is required';
          }
          return true;
        },
      }}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <View className="gap-0.5">
          <View className="flex-row items-center justify-between gap-1">
            {label && (
              <Text
                className={cn(
                  'ms-1 text-sm font-medium text-[#404040]',
                  error?.message && 'text-[firebrick]',
                )}>
                {label}
              </Text>
            )}
            {isOptional && <Text className="text-xs font-medium text-primary">Optional</Text>}
          </View>
          <DropDownPicker
            open={open}
            value={value}
            items={items}
            setOpen={setOpen}
            setValue={(callback) => {
              const newValue = callback(value);
              onChange(newValue);
            }}
            setItems={setItems}
            loading={loading}
            disabled={loading}
            placeholder={placeholder}
            {...dropdownPickerProps}
            multiple={multiple}
            mode={multiple ? 'BADGE' : 'SIMPLE'}
            min={0}
            max={items.length}
            searchTextInputProps={{
              placeholder: 'Search...',
              placeholderTextColor: '#83899B',
            }}
            style={{
              backgroundColor: 'white',
              borderColor: error ? '#DC3545' : '#E8EAED',
              minHeight: 52,
              borderRadius: 8,
            }}
            textStyle={{
              fontSize: 14,
              color: '#061237',
              fontFamily: 'Quicksand-Regular',
            }}
            dropDownContainerStyle={{
              borderColor: error ? '#DC3545' : '#E8EAED',
              backgroundColor: 'white',
              zIndex: 1000,
              ...styles.shadow,
            }}
            placeholderStyle={{
              color: '#83899B',
              fontSize: 13,
              fontFamily: 'Quicksand-Regular',
            }}
            listMessageTextStyle={{
              color: '#83899B',
            }}
            searchContainerStyle={{
              borderBottomColor: '#E8EAED',
            }}
            closeAfterSelecting={!multiple}
            closeOnBackPressed
            modalAnimationType="slide"
            badgeColors={['#E8F4FD']} // Custom badge colors for multiple selection
            badgeTextStyle={{
              color: '#061237',
              fontSize: 12,
            }}
            badgeDotColors={['#1A171F']}
            bottomOffset={100}
            searchTextInputStyle={{
              borderColor: '#E8EAED',
              paddingHorizontal: 10,
              paddingVertical: 10,
            }}
          />
          {error && <Text className="text-sm text-[firebrick]">{error.message}</Text>}
        </View>
      )}
    />
  );
};

export default memo(FormSelect);
