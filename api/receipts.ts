import api from './index';
import { RECEIPT_ENDPOINTS } from '@/constants/endpoints';

export interface ReceiptItem {
  name: string;
  quantity: number;
  price: number;
}

export interface ReceiptData {
  store: string | null;
  date: string | null;
  items: ReceiptItem[];
  subtotal: number;
  tax: number;
  total: number;
  currency: string | null;
}

export interface ScanReceiptResponse {
  success: boolean;
  data?: ReceiptData;
  rawText?: string;
  error?: string;
}

export const scanReceipt = async (imageUri: string) => {
  const formData = new FormData();
  
  const uriParts = imageUri.split('.');
  const fileType = uriParts[uriParts.length - 1];
  
  formData.append('image', {
    uri: imageUri,
    name: `receipt.${fileType}`,
    type: `image/${fileType}`,
  } as any);

  return api.post<ScanReceiptResponse>(RECEIPT_ENDPOINTS.SCAN, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};
