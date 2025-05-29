import { CreditCard, Edit, Trash2, Loader } from 'lucide-react';

import { Button } from '../../../../components';

import type { AccountItemProps } from './types';

export function AccountItem({ account, isDeleting = false, onEdit, onDelete }: AccountItemProps) {
  const formatAccountType = (type: string) => {
    return type.replace('_', ' ').replace(/\b\w/g, (l) => l.toUpperCase());
  };

  return (
    <div className="p-4 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <div className="text-coral-600">
          <CreditCard className="w-6 h-6" />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="font-medium text-slate-900">{account.name}</p>
          </div>
          <p className="text-sm text-slate-500">
            {account.type && formatAccountType(account.type)}
            {account.note && ` • ${account.note}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        {onEdit && (
          <Button variant="ghost" size="sm" onClick={() => onEdit(account)}>
            <Edit className="w-4 h-4" />
          </Button>
        )}
        {onDelete && (
          <Button
            variant="ghost"
            size="sm"
            className="text-red-600 hover:text-red-700"
            onClick={() => onDelete(account)}
            disabled={isDeleting}
          >
            {isDeleting ? <Loader className="w-4 h-4 animate-spin" /> : <Trash2 className="w-4 h-4" />}
          </Button>
        )}
      </div>
    </div>
  );
}
