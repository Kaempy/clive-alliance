import { formatCurrency } from '@/lib';
import * as Clipboard from 'expo-clipboard';
import { Copy, Eye, EyeOff } from 'lucide-react-native';
import React, { useState } from 'react';
import { Pressable, Text, View } from 'react-native';
const Wallet = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [accountNumber] = useState('02396728366');

  const handleVisible = () => {
    setIsVisible(!isVisible);
  };
  const copyToClipboard = async () => {
    await Clipboard.setStringAsync(`Account Number: ${accountNumber}`);
  };
  const balance = isVisible ? '************' : formatCurrency(500000);
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
          <Text className="text-2xl font-semibold text-header1">{balance} </Text>
          <Text className="text-[10px] font-medium text-grey">Last Updated: 20 mins ago </Text>
        </View>
        <Pressable onPress={handleVisible} className="text-[#404040]">
          {isVisible ? <Eye size={20} /> : <EyeOff size={20} />}
        </Pressable>
      </View>
    </View>
  );
};

export default Wallet;
