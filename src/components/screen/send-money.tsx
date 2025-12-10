import { sendMoneySchema, SendMoneyType } from '@/lib/validation/send-money';
import { zodResolver } from '@hookform/resolvers/zod';
import { router } from 'expo-router';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { Pressable, ScrollView, Text, View } from 'react-native';
import Button from '../ui/Button';
import FormField from '../ui/FormField';
import FormSelect from '../ui/FormSelect';

const banks = [
  { label: 'Access Bank', value: 'access-bank' },
  { label: 'Zenith Bank', value: 'zenith-bank' },
  { label: 'UBA', value: 'uba' },
  { label: 'Fidelity Bank', value: 'fidelity-bank' },
  { label: 'GTBank', value: 'gtbank' },
  { label: 'Polaris Bank', value: 'polaris-bank' },
  { label: 'Stanbic IBTC Bank', value: 'stanbic-ibtc-bank' },
  { label: 'Sterling Bank', value: 'sterling-bank' },
  { label: 'Union Bank', value: 'union-bank' },
  { label: 'Unity Bank', value: 'unity-bank' },
];
const accounts = [
  { label: '1234567890', value: '1234567890' },
  { label: '0987654321', value: '0987654321' },
];
const category = [
  { label: 'Gift', value: 'gift' },
  { label: 'Bill Payment', value: 'bill-payment' },
  { label: 'Food', value: 'food' },
  { label: 'Rent', value: 'rent' },
  { label: 'Bills', value: 'bills' },
  { label: 'Other', value: 'other' },
];
const amountOptions = ['50', '100', '500', '1000'];
const SendMoney = () => {
  const form = useForm<SendMoneyType>({
    resolver: zodResolver(sendMoneySchema),
  });
  const {
    setValue,
    handleSubmit,
    formState: { isSubmitting },
  } = form;
  const handleAmountPress = (amount: string) => {
    setValue('amount', amount);
  };
  const onSubmit = async (data: SendMoneyType) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log(data);
    router.push('/(screen)/receipt');
  };
  return (
    <View className="flex-1 justify-between gap-6 bg-white px-6 py-4">
      <FormProvider {...form}>
        <View className="gap-6">
          <FormSelect
            name="bank"
            label="Choose Bank"
            placeholder="Select the bank"
            options={banks}
            dropdownPickerProps={{
              listMode: 'SCROLLVIEW',
              zIndex: 6000,
              zIndexInverse: 5000,
            }}
          />
          <FormSelect
            name="account"
            label="Your Account"
            placeholder="Select account"
            options={accounts}
          />
          <FormField
            name="account_number"
            label="Account Number"
            inputProps={{
              placeholder: 'Enter Account Number',
              keyboardType: 'numeric',
              className: 'rounded-none border-b border-x-0 border-t-0',
            }}
          />
          <View className="gap-3">
            <FormField
              name="amount"
              label="Amount"
              inputProps={{
                placeholder: 'Enter Amount to sent',
                keyboardType: 'numeric',
                className: 'rounded-none border-b border-x-0 border-t-0',
              }}
            />
            <Text className="text-xs font-medium text-[#FF4040]">
              This transfer will attract a charge of N
            </Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View className="flex-row gap-2">
                {amountOptions.map((amount) => (
                  <Pressable
                    key={amount}
                    className="rounded-full border border-input px-4 py-1"
                    onPress={() => handleAmountPress(amount)}>
                    <Text className="text-xs font-medium text-[#747474]">{amount}</Text>
                  </Pressable>
                ))}
              </View>
            </ScrollView>
          </View>
          <FormSelect
            name="category"
            label="Category"
            placeholder="What is it for?"
            options={category}
            isOptional
          />
          <FormField
            name="remark"
            label="Remark"
            inputProps={{
              placeholder: 'Remarks (e.g Shopping)',
              className: 'rounded-none border-b border-x-0 border-t-0',
            }}
          />
        </View>
        <Button variant="primary" onPress={handleSubmit(onSubmit)} disabled={isSubmitting}>
          {isSubmitting ? 'Sending...' : 'Continue'}
        </Button>
      </FormProvider>
    </View>
  );
};

export default SendMoney;
