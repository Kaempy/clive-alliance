import { cn, formatCurrency } from '@/lib';
import { FlashList } from '@shopify/flash-list';
import { Link } from 'expo-router';
import React from 'react';
import { Text, View } from 'react-native';
import { Transaction, transactions } from './mock-data';

const renderItem = ({ item }: { item: Transaction }) => (
  <View className="flex-row items-center justify-between gap-4">
    <View
      className={cn(
        'flex-shrink-0 items-center justify-center rounded-full p-3',
        item.type === 'credit' ? 'bg-primary/25' : 'bg-error/25',
      )}>
      <item.icon color={item.type === 'credit' ? '#608E75' : '#D73F3F'} />
    </View>
    <View className="flex-1 gap-1">
      <Text className="text-sm font-semibold text-[#404040]">{item.title}</Text>
      <Text className="text-[10px] font-medium text-[#404040]">{item.date}</Text>
    </View>
    <View className="flex-shrink-0">
      <Text
        className={cn(
          'text-sm font-semibold text-[#404040]',
          item.type === 'credit' ? 'text-primary' : 'text-error',
        )}>
        {item.type === 'credit'
          ? `+ ${formatCurrency(item.amount)}`
          : `- ${formatCurrency(item.amount)}`}
      </Text>
    </View>
  </View>
);

const Transactions = () => {
  return (
    <View className="flex-1 gap-2">
      <View className="flex-row items-center justify-between">
        <Text className="text-base font-semibold text-[#032211]">Recent Transactions</Text>
        <Link href="/#transactions" className="text-xs font-medium text-grey">
          See all
        </Link>
      </View>
      <FlashList
        data={transactions}
        keyExtractor={(item) => item.key.toString()}
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}
        ItemSeparatorComponent={() => <View className="h-4" />}
      />
    </View>
  );
};

export default Transactions;
