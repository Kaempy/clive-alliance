import { Data, Help, Savings, Transfer } from '@/icons';
import { cn, formatCurrency } from '@/lib';
import React from 'react';
import { Text, View } from 'react-native';
import transactionsData from './transactions.json';

type TransactionCategory = 'transfer' | 'data' | 'help' | 'savings';

type Transaction = {
  key: number;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  category: TransactionCategory;
};

const iconMap: Record<TransactionCategory, React.ComponentType<{ color: string }>> = {
  transfer: Transfer,
  data: Data,
  help: Help,
  savings: Savings,
};

const transactions = transactionsData as Transaction[];

const renderTransactionItem = ({ item }: { item: Transaction }) => {
  const Icon = iconMap[item.category];
  const iconColor = item.type === 'credit' ? '#608E75' : '#D73F3F';

  return (
    <View className="flex-row items-center justify-between gap-4">
      <View
        className={cn(
          'flex-shrink-0 items-center justify-center rounded-full p-3',
          item.type === 'credit' ? 'bg-primary/25' : 'bg-error/25',
        )}>
        <Icon color={iconColor} />
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
};

const TransactionItemSeparator = () => <View className="h-2" />;
export { renderTransactionItem, Transaction, TransactionItemSeparator, transactions };
