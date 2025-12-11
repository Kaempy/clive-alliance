import React from 'react';
import { Image, Text, View } from 'react-native';
const logo = require('../../../assets/public/logo.png');

const items = [
  { id: '1', label: 'Transaction Amount', value: 'N 63, 250.00' },
  { id: '2', label: 'Transaction Type', value: 'INTER-BANK' },
  { id: '3', label: 'Sender', value: 'Nnamdi Okeke' },
  { id: '4', label: 'Beneficiary', value: 'Nnamdi Okeke \n 162789176178 \n Zikora Bank' },
  { id: '5', label: 'Narration', value: 'Bolt' },
  { id: '6', label: 'Reference', value: '547725CTD43892637Dv2436FTr6386' },
  { id: '7', label: 'Transaction Status', value: 'Transfer Request Successful' },
];
const Receipt = () => {
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
        <Text className="text-sm font-semibold text-white">1st November, 2024 1:20:22 PM</Text>
      </View>
      <View className="flex-1 p-6">
        <View className="flex-1 gap-2">
          {items.map((item) => (
            <View className="flex-1 flex-row justify-between gap-2" key={item.id}>
              <Text className="text-sm font-medium text-[#404040]">{item.label}</Text>
              <Text className="max-w-[180px] text-right text-base font-semibold text-black">
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
