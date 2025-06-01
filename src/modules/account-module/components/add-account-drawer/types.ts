import type { NewAccount } from '../../../../types/api';

export interface AddAccountFormData extends NewAccount {
  enableLimit: boolean;
  limitPeriod: 'daily' | 'weekly' | 'monthly' | 'yearly';
  limitAmount: number;
  metadata: Record<string, string>;
}

export interface AddAccountDrawerProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}
