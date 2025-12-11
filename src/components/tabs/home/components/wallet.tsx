import { formatCurrency } from '@/lib';
import * as Clipboard from 'expo-clipboard';
import { Copy, Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { toast } from 'sonner-native';

type WalletProps = {
  balance: number;
  lastUpdated: string;
  refreshing: boolean;
};

const Wallet: React.FC<WalletProps> = ({ balance, lastUpdated, refreshing }: WalletProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const [accountNumber] = useState('02396728366');

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };
  const copyToClipboard = async (): Promise<void> => {
    await Clipboard.setStringAsync(`Account Number: ${accountNumber}`);
    toast.success('Account number copied to clipboard');
  };
  const displayBalance = isVisible ? '************' : formatCurrency(balance);
  return (
    <View className="gap-3">
      <View className="flex-row items-center gap-1">
        <Text className="text-xs font-medium text-grey">Account Number:</Text>
        <Text className="text-sm font-medium text-header1">{accountNumber} </Text>
        <Copy size={16} color="#404040" onPress={copyToClipboard} />
      </View>
      <View className="flex-row items-center gap-1">
        <View className="flex-1 gap-1">
          <Text className="text-sm font-medium text-[#404040]">Your Balance</Text>
          {refreshing ? (
            <View className="h-6 w-40 items-center justify-center rounded-lg bg-slate-200" />
          ) : (
            <Text className="text-2xl font-semibold text-header1">{displayBalance} </Text>
          )}
          <Text className="text-[10px] font-medium text-grey">Last Updated: {lastUpdated} </Text>
        </View>
        <Pressable onPress={handleVisible}>
          {isVisible ? <Eye size={20} color="#404040" /> : <EyeOff size={20} color="#404040" />}
        </Pressable>
      </View>
    </View>
  );
};

export default Wallet;
