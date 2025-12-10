import { Data, Help, Savings, Transfer } from '@/icons';
import { cn } from '@/lib';
import React from 'react';
import { Pressable, Text, View } from 'react-native';
const quickActions = [
  {
    icon: Transfer,
    label: 'Transfer',
  },

  {
    icon: Data,
    label: 'Buy Data',
  },
  {
    icon: Help,
    label: 'Help',
  },
  {
    icon: Savings,
    label: 'Savings',
  },
];
const QuickActions = () => {
  return (
    <View className="flex-row items-center justify-between rounded-xl bg-[#002210] p-6">
      {quickActions.map((action) => (
        <Pressable key={action.label}>
          {({ pressed }) => (
            <View className={cn('items-center justify-between gap-2', pressed && 'opacity-75')}>
              <View className="items-center justify-center rounded-full bg-[#F0FFF7] p-3">
                <action.icon color="#042915" />
              </View>
              <Text className="text-[10px] font-medium text-[#AFAFAF]">{action.label}</Text>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
};

export default QuickActions;
