import { SendMoneyType } from '@/lib/validation/send-money';

type TransferReceipt = {
  amount: number;
  type: string;
  sender: string;
  beneficiary: string;
  narration: string;
  reference: string;
  status: string;
  date: string;
};

type TransferResponse = {
  success: boolean;
  message: string;
  data: SendMoneyType;
  receipt: TransferReceipt;
};

const delay = (ms: number): Promise<void> => new Promise((resolve) => setTimeout(resolve, ms));

const generateReference = (): string =>
  `TRX-${Math.random().toString(36).slice(2, 10).toUpperCase()}${Date.now().toString().slice(-6)}`;

export const transfer = async (data: SendMoneyType): Promise<TransferResponse> => {
  // Simulate network latency
  await delay(750);

  const amount = Number(data.amount);
  if (!amount || amount <= 0) {
    throw new Error('Invalid amount');
  }

  const receipt: TransferReceipt = {
    amount,
    type: (data.category ?? 'INTER-BANK').toUpperCase(),
    sender: 'You',
    beneficiary: `${data.account}\nShalom\n${data.bank}`,
    narration: data.remark,
    reference: generateReference(),
    status: 'Transfer Request Successful',
    date: new Date().toISOString(),
  };

  return {
    success: true,
    message: 'Transfer successful',
    data,
    receipt,
  };
};

export type { TransferReceipt, TransferResponse };
