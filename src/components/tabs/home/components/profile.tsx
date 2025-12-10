import Button from '@/components/ui/Button';
import { Plus } from 'lucide-react-native';
import React from 'react';
import { Image, Text, View } from 'react-native';

const avatar = require('../../../../../assets/public/avatar.png');

const Profile = () => {
  return (
    <View className="flex-row items-center justify-between gap-4">
      <View className="flex-shrink-0">
        <Image source={avatar} className="h-[40px] w-[40px] rounded-full" resizeMode="contain" />
      </View>
      <View className="flex-1">
        <Text className="text-base font-semibold text-header1">Good Afternoon Shalom</Text>
        <Text className="text-sm font-medium text-grey">Welcome to Zikora</Text>
      </View>
      <View className="flex-shrink-0 items-center justify-center">
        <Button className="rounded-full border-none bg-[#F1F1F1]">
          <Plus color="#585858" size={18} />
        </Button>
      </View>
    </View>
  );
};

export default Profile;
