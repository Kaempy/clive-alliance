import React, { memo } from 'react';
import { OtpInput, OtpInputProps } from 'react-native-otp-entry';

const CustomOtpInput = (props: OtpInputProps) => {
  const { textInputProps, ...rest } = props;
  return (
    <OtpInput
      numberOfDigits={6}
      focusColor="#061237"
      autoFocus
      hideStick={false}
      placeholder="•"
      blurOnFilled={true}
      disabled={false}
      type="numeric"
      focusStickBlinkingDuration={500}
      {...rest}
      textInputProps={{
        accessibilityLabel: 'OTP Input',
        ...textInputProps,
        textContentType: 'oneTimeCode',
        autoComplete: 'sms-otp',
      }}
      theme={{
        pinCodeContainerStyle: {
          height: 46,
        },
        containerStyle: {
          height: 46,
          marginTop: 16,
          width: '100%',
          margin: 'auto',
        },
      }}
    />
  );
};

export default memo(CustomOtpInput);
