import { type FC, useState, useEffect } from 'react';

import { Drawer, TextInput, Select, TextArea, Button } from '../../../components';
import {
  useApiCreateTransactionMutation,
  useApiAccountsQuery,
  useApiCategoriesQuery,
  useApiCurrentUserQuery,
} from '../../../hooks';
import type { NewTransaction } from '../../../types/api';
import { useDrawerProvider } from '../context';

export const AddTransactionDrawer: FC = () => {
  const { closeDrawer } = useDrawerProvider();
  const [currentUserData] = useApiCurrentUserQuery();
  const [accountsData] = useApiAccountsQuery();
  const [categoriesData] = useApiCategoriesQuery();
  const [createTransaction, createError, createStates] = useApiCreateTransactionMutation();

  const [formData, setFormData] = useState<Partial<NewTransaction>>({
    amount: 0,
    currency: 'USD',
    date: new Date().toISOString().split('T')[0], // Today's date in YYYY-MM-DD format
    note: null,
    recurrenceId: null,
  });

  const [validationErrors, setValidationErrors] = useState<Record<string, string>>({});

  // Auto-populate user and group data when available
  useEffect(() => {
    if (currentUserData?.user) {
      setFormData((prev) => ({
        ...prev,
        createdByUserId: currentUserData.user.id,
        groupId: currentUserData.user.groupId,
      }));
    }
  }, [currentUserData]);

  const handleInputChange =
    (field: keyof NewTransaction) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
      const value = event.target.value;
      let processedValue: string | number = value;

      if (field === 'amount') {
        processedValue = parseFloat(value) || 0;
      } else if (field === 'accountId' || field === 'categoryId') {
        processedValue = parseInt(value, 10);
      }

      setFormData((prev) => ({ ...prev, [field]: processedValue }));
      // Clear validation error when user starts typing
      if (validationErrors[field]) {
        setValidationErrors((prev) => ({ ...prev, [field]: '' }));
      }
    };

  const validateForm = (): boolean => {
    const errors: Record<string, string> = {};

    if (!formData.groupId) errors.groupId = 'Group is required';
    if (!formData.accountId) errors.accountId = 'Account is required';
    if (!formData.categoryId) errors.categoryId = 'Category is required';
    if (!formData.createdByUserId) errors.createdByUserId = 'User is required';
    if (!formData.amount || formData.amount === 0) errors.amount = 'Amount is required and must be greater than 0';
    if (!formData.currency?.trim()) errors.currency = 'Currency is required';
    if (!formData.date?.trim()) errors.date = 'Date is required';

    // Validate currency format (3 characters)
    if (formData.currency && formData.currency.length !== 3) {
      errors.currency = 'Currency must be exactly 3 characters (e.g., USD, EUR)';
    }

    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      await createTransaction(formData as NewTransaction);
      closeDrawer();
      // Reset form
      setFormData({
        amount: 0,
        currency: 'USD',
        date: new Date().toISOString().split('T')[0],
        note: null,
        recurrenceId: null,
      });
    } catch {
      // Error is handled by the mutation hook
    }
  };

  // Prepare options for selects
  const accountOptions =
    accountsData?.items?.map((account) => ({
      value: account.id?.toString() ?? '',
      label: `${account.name} (${account.type})`,
    })) ?? [];

  const categoryOptions =
    categoriesData?.items?.map((category) => ({
      value: category.id?.toString() ?? '',
      label: category.name ?? '',
    })) ?? [];

  const currencyOptions = [
    { value: 'USD', label: 'USD - US Dollar' },
    { value: 'EUR', label: 'EUR - Euro' },
    { value: 'GBP', label: 'GBP - British Pound' },
    { value: 'CAD', label: 'CAD - Canadian Dollar' },
    { value: 'AUD', label: 'AUD - Australian Dollar' },
  ];

  return (
    <Drawer onClose={closeDrawer} size="md">
      <Drawer.Header>
        <Drawer.Title>Add Transaction</Drawer.Title>
        <Drawer.CloseButton />
      </Drawer.Header>
      <Drawer.Content>
        <div className="space-y-6">
          <Select
            label="Account"
            placeholder="Select an account"
            options={accountOptions}
            value={formData.accountId?.toString() ?? ''}
            onChange={handleInputChange('accountId')}
            errorText={validationErrors.accountId}
          />

          <Select
            label="Category"
            placeholder="Select a category"
            options={categoryOptions}
            value={formData.categoryId?.toString() ?? ''}
            onChange={handleInputChange('categoryId')}
            errorText={validationErrors.categoryId}
          />

          <TextInput
            label="Amount"
            type="number"
            step="0.01"
            min="0"
            placeholder="0.00"
            value={formData.amount?.toString() ?? ''}
            onChange={handleInputChange('amount')}
            errorText={validationErrors.amount}
          />

          <Select
            label="Currency"
            placeholder="Select currency"
            options={currencyOptions}
            value={formData.currency ?? ''}
            onChange={handleInputChange('currency')}
            errorText={validationErrors.currency}
          />

          <TextInput
            label="Date"
            type="date"
            value={formData.date ?? ''}
            onChange={handleInputChange('date')}
            errorText={validationErrors.date}
          />

          <TextArea
            label="Notes"
            placeholder="Add any notes about this transaction..."
            value={formData.note ?? ''}
            onChange={handleInputChange('note')}
            helperText="Optional description for this transaction"
            rows={3}
          />
        </div>

        {createError && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">
              {(createError as Error)?.message ?? 'Failed to create transaction. Please try again.'}
            </p>
          </div>
        )}
      </Drawer.Content>
      <Drawer.Footer>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={closeDrawer}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit} disabled={createStates.isPending}>
            {createStates.isPending ? 'Creating...' : 'Create Transaction'}
          </Button>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
};
