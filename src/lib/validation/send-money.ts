import { z } from 'zod';

const sendMoneySchema = z.object({
  bank: z.string({ message: 'Bank is required' }).min(1, 'Bank is required'),
  account: z.string({ message: 'Account is required' }).min(1, 'Account is required'),
  account_number: z
    .string({ message: 'Account number is required' })
    .min(1, 'Account number is required'),
  amount: z.string({ message: 'Amount is required' }).min(1, 'Amount is required'),
  category: z.string().optional(),
  remark: z.string(),
});
type SendMoneyType = z.infer<typeof sendMoneySchema>;

export { sendMoneySchema };
export type { SendMoneyType };
