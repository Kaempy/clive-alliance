import { Data, Help, Savings, Transfer } from '@/icons';
import React from 'react';
import { SvgProps } from 'react-native-svg';

type Transaction = {
  key: number;
  title: string;
  amount: number;
  date: string;
  type: 'credit' | 'debit';
  icon: (props: SvgProps) => React.JSX.Element;
};

const transactions: Transaction[] = [
  {
    key: 1,
    title: 'Transfer',
    amount: 1000,
    date: '2021-01-01',
    type: 'credit',
    icon: Transfer,
  },
  {
    key: 2,
    title: 'Data Purchase',
    amount: 500,
    date: '2021-01-02',
    type: 'debit',
    icon: Data,
  },
  {
    key: 3,
    title: 'Help Credit',
    amount: 1500,
    date: '2021-01-03',
    type: 'credit',
    icon: Help,
  },
  {
    key: 4,
    title: 'Savings',
    amount: 3000,
    date: '2021-01-04',
    type: 'credit',
    icon: Savings,
  },
  {
    key: 5,
    title: 'Transfer',
    amount: 2000,
    date: '2021-01-05',
    type: 'debit',
    icon: Transfer,
  },
  {
    key: 6,
    title: 'Data Topup',
    amount: 800,
    date: '2021-01-06',
    type: 'debit',
    icon: Data,
  },
  {
    key: 7,
    title: 'Help Refund',
    amount: 1000,
    date: '2021-01-07',
    type: 'credit',
    icon: Help,
  },
  {
    key: 8,
    title: 'Savings',
    amount: 500,
    date: '2021-01-08',
    type: 'debit',
    icon: Savings,
  },
  {
    key: 9,
    title: 'Transfer',
    amount: 1500,
    date: '2021-01-09',
    type: 'credit',
    icon: Transfer,
  },
  {
    key: 10,
    title: 'Data Subscription',
    amount: 1200,
    date: '2021-01-10',
    type: 'debit',
    icon: Data,
  },
  {
    key: 11,
    title: 'Help Payment',
    amount: 700,
    date: '2021-01-11',
    type: 'credit',
    icon: Help,
  },
  {
    key: 12,
    title: 'Savings',
    amount: 2200,
    date: '2021-01-12',
    type: 'credit',
    icon: Savings,
  },
  {
    key: 13,
    title: 'Transfer',
    amount: 900,
    date: '2021-01-13',
    type: 'credit',
    icon: Transfer,
  },
  {
    key: 14,
    title: 'Data Recharge',
    amount: 400,
    date: '2021-01-14',
    type: 'debit',
    icon: Data,
  },
  {
    key: 15,
    title: 'Help Bonus',
    amount: 600,
    date: '2021-01-15',
    type: 'credit',
    icon: Help,
  },
  {
    key: 16,
    title: 'Savings',
    amount: 1800,
    date: '2021-01-16',
    type: 'debit',
    icon: Savings,
  },
  {
    key: 17,
    title: 'Transfer',
    amount: 2500,
    date: '2021-01-17',
    type: 'debit',
    icon: Transfer,
  },
  {
    key: 18,
    title: 'Data Bundle',
    amount: 950,
    date: '2021-01-18',
    type: 'debit',
    icon: Data,
  },
  {
    key: 19,
    title: 'Help Assistance',
    amount: 850,
    date: '2021-01-19',
    type: 'credit',
    icon: Help,
  },
  {
    key: 20,
    title: 'Savings',
    amount: 2600,
    date: '2021-01-20',
    type: 'credit',
    icon: Savings,
  },
];
export { transactions, type Transaction };
