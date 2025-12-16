import React from 'react';
import { BaseToast, ErrorToast, ToastProps } from 'react-native-toast-message';

export const toastConfig = {
  success: (props: ToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: '#69C779', height: 40 }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
  error: (props: ToastProps) => (
    <ErrorToast
      {...props}
      style={{ borderLeftColor: '#FE6301', height: 40 }}
      text1Style={{
        fontSize: 14,
        fontWeight: '400',
      }}
      text2Style={{
        fontSize: 12,
      }}
    />
  ),
};
