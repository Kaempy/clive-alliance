import { SendMoneyType } from '@/lib/validation/send-money';

type TransferResponse = {
  success: boolean;
  message: string;
  data: SendMoneyType;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export const transfer = async (data: SendMoneyType): Promise<TransferResponse> => {
  // Simulate network latency
  await delay(750);

  const amount = Number(data.amount);
  if (!amount || amount <= 0) {
    throw new Error('Invalid amount');
  }

  return {
    success: true,
    message: 'Transfer successful',
    data,
  };
};
