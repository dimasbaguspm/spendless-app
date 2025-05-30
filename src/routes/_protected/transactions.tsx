import { createFileRoute } from '@tanstack/react-router';
import { Filter, Calendar } from 'lucide-react';
import { useState } from 'react';

import { Button, PageLayout, PageHeader, IconButton, DatePicker } from '../../components';
import { WeeklyDateRibbon } from '../../modules/transaction-module';

export const Route = createFileRoute('/_protected/transactions')({
  component: TransactionsComponent,
});

function TransactionsComponent() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const handleOpenAddTransactionDrawer = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  return (
    <PageLayout
      background="cream"
      mainProps={{ padding: 'none' }}
      header={
        <div>
          <PageHeader
            title="Transactions"
            showBackButton={true}
            rightContent={
              <div className="flex items-center gap-2">
                <IconButton
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    handleOpenAddTransactionDrawer();
                  }}
                  title="Select Date"
                >
                  <Calendar className="h-5 w-5" />
                </IconButton>
                <IconButton
                  variant="ghost"
                  size="md"
                  onClick={() => {
                    // TODO: Open filter drawer
                  }}
                  title="Filter Transactions"
                >
                  <Filter className="h-5 w-5" />
                </IconButton>
              </div>
            }
            className="p-4 pb-0 mb-2"
          />
          <DatePicker
            variant="coral"
            showInput={false}
            isOpen={isDatePickerOpen}
            onOpenChange={setIsDatePickerOpen}
            value={selectedDate}
            onChange={(data) => {
              if (data) {
                handleDateSelect(data);
              }
            }}
          />
          <WeeklyDateRibbon
            selectedDate={selectedDate}
            onDateSelect={handleDateSelect}
            variant="default"
            size="md"
            className="mb-6"
          />
        </div>
      }
    >
      <div className="px-4 space-y-6">
        {/* 
        {selectedDateTransactions.length > 0 ? (
          <TransactionGroup
            key={selectedDate.toDateString()}
            date={selectedDate}
            transactions={selectedDateTransactions}
            showBalance={true}
          />
        ) : (
          <div className="bg-white rounded-lg shadow-sm border border-slate-200 p-8 text-center">
            <p className="text-slate-500">No transactions logged for {selectedDate.toLocaleDateString()}.</p>
          </div>
        )} */}

        {/* Load More button at bottom */}
        <div className="flex justify-center">
          <Button variant="outline">Load More Transactions</Button>
        </div>
      </div>
    </PageLayout>
  );
}
