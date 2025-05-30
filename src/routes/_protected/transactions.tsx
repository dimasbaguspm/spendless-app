import { createFileRoute } from '@tanstack/react-router';
import { Filter, Calendar } from 'lucide-react';
import { useState } from 'react';

import { Button, PageLayout, PageHeader, IconButton, DatePicker } from '../../components';
import { WeeklyDateRibbon, SeamlessTransactionList } from '../../modules/transaction-module';

export const Route = createFileRoute('/_protected/transactions')({
  component: TransactionsComponent,
});

function TransactionsComponent() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [loadMoreTrigger, setLoadMoreTrigger] = useState(0);
  const [canLoadMore, setCanLoadMore] = useState(true);

  const handleOpenAddTransactionDrawer = () => {
    setIsDatePickerOpen(true);
  };

  const handleDateSelect = (date: Date) => {
    setSelectedDate(date);
  };

  const handleLoadMore = () => {
    setLoadMoreTrigger((prev) => prev + 1);
  };

  const handleCanLoadMoreChange = (newCanLoadMore: boolean) => {
    setCanLoadMore(newCanLoadMore);
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
        </div>
      }
    >
      <WeeklyDateRibbon
        selectedDate={selectedDate}
        onDateSelect={handleDateSelect}
        variant="default"
        size="md"
        className="mb-6"
      />
      <div className="px-4 space-y-6">
        <SeamlessTransactionList
          selectedDate={selectedDate}
          showBalance={true}
          maxDaysBefore={4}
          loadMoreTrigger={loadMoreTrigger}
          onCanLoadMoreChange={handleCanLoadMoreChange}
        />

        {canLoadMore && (
          <div className="flex justify-center">
            <Button variant="outline" onClick={handleLoadMore}>
              Load More Transactions
            </Button>
          </div>
        )}
      </div>
    </PageLayout>
  );
}
