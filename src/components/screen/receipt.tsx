import { formatCurrency } from '@/lib';
import { TransferReceipt } from '@/services/transfer';
import { format } from 'date-fns';
import { useLocalSearchParams } from 'expo-router';
import React from 'react';
import { Image, Text, View } from 'react-native';
const logo = require('../../../assets/public/logo.png');

const Receipt = () => {
  const { receipt } = useLocalSearchParams();

  const fallbackReceipt: TransferReceipt = {
    amount: 63250,
    type: 'INTER-BANK',
    sender: 'Nnamdi Okeke',
    beneficiary: 'Nnamdi Okeke \n 162789176178 \n Zikora Bank',
    narration: 'Bolt',
    reference: '547725CTD43892637Dv2436FTr6386',
    status: 'Transfer Request Successful',
    date: '2024-11-01T13:20:22Z',
  };

  let parsedData: TransferReceipt = fallbackReceipt;
  if (receipt) {
    try {
      parsedData = JSON.parse(receipt as string) as TransferReceipt;
    } catch {
      parsedData = fallbackReceipt;
    }
  }

  const items = [
    {
      id: '1',
      label: 'Transaction Amount',
      value: formatCurrency(parsedData.amount),
      accessibilityLabel: 'transaction-amount',
    },
    {
      id: '2',
      label: 'Transaction Type',
      value: parsedData.type,
      accessibilityLabel: 'transaction-type',
    },
    {
      id: '3',
      label: 'Sender',
      value: parsedData.sender,
      accessibilityLabel: 'sender',
    },
    {
      id: '4',
      label: 'Beneficiary',
      value: parsedData.beneficiary,
      accessibilityLabel: 'beneficiary',
    },
    {
      id: '5',
      label: 'Narration',
      value: parsedData.narration,
      accessibilityLabel: 'narration',
    },
    {
      id: '6',
      label: 'Reference',
      value: parsedData.reference,
      accessibilityLabel: 'reference',
    },
    {
      id: '7',
      label: 'Transaction Status',
      value: parsedData.status,
      accessibilityLabel: 'transaction-status',
    },
  ];
  return (
    <View className="flex-1">
      <View className="flex- flex-row items-center justify-center gap-2 px-6">
        <View className="flex-shrink-0">
          <Image source={logo} className="h-[40px] w-[40px]" resizeMode="contain" />
        </View>
        <View className="flex-1 items-center">
          <Text className="text-sm font-bold uppercase text-black">Transaction Receipt</Text>
        </View>
      </View>
      <View className="items-center justify-center bg-primary p-4">
        <Text className="text-sm font-semibold text-white">
          {format(parsedData.date, 'dd MMMM, yyyy h:mm:ss a')}
        </Text>
      </View>
      <View className="flex-1 p-6">
        <View className="flex-1 gap-2">
          {items.map((item) => (
            <View className="flex-1 flex-row justify-between gap-2" key={item.id}>
              <Text className="text-sm font-medium text-[#404040]">{item.label}</Text>
              <Text
                accessibilityLabel={item.accessibilityLabel}
                className="max-w-[180px] text-right text-base font-semibold text-black">
                {item.value}
              </Text>
            </View>
          ))}
        </View>
        <View className="my-4 border-t border-[#E8EAED]" />
        <View className="items-center gap-2">
          <Text className="text-sm font-bold uppercase text-black">DISCLAIMER</Text>
          <Text className="text-sm font-medium text-[#747474]">
            Please review the details carefully; if discrepancies are noted, contact customer
            support within 24 hours. This receipt does not constitute a contractual obligation, and
            all transactions are subject to bank terms and conditions.
          </Text>
        </View>
      </View>
      <View className="items-center justify-center bg-primary p-4">
        <Text className="text-sm font-semibold text-white">
          Contact us @zikora&apos;s email and phone number
        </Text>
      </View>
    </View>
  );
};

export default Receipt;
