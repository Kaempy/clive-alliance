import { getInitials, normalizeText } from '@/lib';
import { router } from 'expo-router';
import { Link } from 'expo-router/build/link/Link';
import { ChevronRight } from 'lucide-react-native';
import React from 'react';
import { Pressable, Text, View } from 'react-native';

interface Beneficiary {
  name: string;
  color: string;
}

interface PaymentOption {
  id: string;
  name: string;
  description: string;
  handler?: () => void;
}

const beneficiaries: Beneficiary[] = [
  {
    name: 'Michael Eisgbone',
    color: '#326CA1',
  },

  {
    name: '1k Shop',
    color: '#6D46DD',
  },
  {
    name: 'Opeyemi Adeniji',
    color: '#E23DB4',
  },
  {
    name: 'Yarima Mary',
    color: '#D7C62D',
  },
  {
    name: 'Inu John',
    color: '#16CCD8',
  },
];
const paymentOptions: Record<string, PaymentOption[]> = {
  send_money: [
    {
      id: '1',
      name: 'Send Money to Bank Account',
      description: 'Send money to any local banks in your region swiftly.',
      handler: () => router.push('/(screen)/pay'),
    },
    {
      id: '2',
      name: 'Send Money via Phone Number/Email',
      description: 'Send money to any Zikora User by Email/Phone numbers.',
    },
  ],
  pay_bills: [
    {
      id: '1',
      name: 'Buy Airtime',
      description: 'Buy Airtime to your Phone number',
    },
    {
      id: '2',
      name: 'Pay a Bill',
      description: 'Pay your utility bill, buy data swiftly.',
    },
  ],
};

const Pay: React.FC = () => {
  return (
    <View className="flex-1 gap-8 p-4">
      <View className="gap-4">
        <View className="flex-row items-center justify-between">
          <Text className="text-base font-semibold text-[#045227]">Beneficiaries</Text>
          <Link href="/#beneficiaries" className="text-[10px] font-medium text-grey">
            See all
          </Link>
        </View>
        <View className="flex-row items-start justify-between gap-2">
          {beneficiaries.map((beneficiary) => (
            <View
              key={beneficiary.name}
              className="flex-shrink-0 items-center justify-between gap-2">
              <View
                className="h-12 w-12 items-center justify-center rounded-full"
                style={{ backgroundColor: beneficiary.color }}>
                <Text className="text-xs font-medium uppercase text-white">
                  {getInitials(beneficiary.name)}
                </Text>
              </View>
              <Text
                className="w-16 truncate text-center text-[10px] font-medium capitalize text-grey"
                numberOfLines={2}>
                {beneficiary.name}
              </Text>
            </View>
          ))}
        </View>
      </View>
      {Object.entries(paymentOptions).map(([key, options]) => (
        <View key={key} className="gap-1">
          <Text className="text-base font-semibold text-[#045227]">{normalizeText(key)}</Text>
          <View className="gap-6">
            {options.map((option) => (
              <Pressable
                key={option.id}
                className="flex-row items-center justify-between"
                onPress={option.handler}>
                <View>
                  <Text className="text-sm font-medium capitalize text-[#032211]">
                    {option.name}
                  </Text>
                  <Text className="text-xs font-medium capitalize text-grey">
                    {option.description}
                  </Text>
                </View>
                <ChevronRight size={20} />
              </Pressable>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};

export default Pay;
