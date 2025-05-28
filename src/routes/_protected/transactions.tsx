import { createFileRoute } from '@tanstack/react-router';

import { Button, PageLayout, TextInput, Select, Badge } from '../../components';

export const Route = createFileRoute('/_protected/transactions')({
  component: TransactionsComponent,
});

function TransactionsComponent() {
  return (
    <PageLayout
      background="cream"
      title="Transactions"
      showBackButton={true}
      rightContent={<Button variant="coral">Add Transaction</Button>}
    >
      <div className="space-y-6">
        <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <TextInput placeholder="Search transactions..." />
            <Select placeholder="Category">
              <option value="food">Food & Dining</option>
              <option value="transport">Transportation</option>
              <option value="shopping">Shopping</option>
              <option value="entertainment">Entertainment</option>
              <option value="bills">Bills & Utilities</option>
            </Select>
            <Select placeholder="Time Period">
              <option value="this-month">This Month</option>
              <option value="last-month">Last Month</option>
              <option value="this-year">This Year</option>
              <option value="custom">Custom Range</option>
            </Select>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-4 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900">Transaction History</h3>
          </div>

          <div className="divide-y divide-slate-200">
            <div className="p-4 hover:bg-slate-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center">
                      <span className="text-red-600 font-bold">☕</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Starbucks Coffee</p>
                      <p className="text-sm text-slate-500">Today, 10:30 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Food & Dining</Badge>
                    <Badge variant="outline">Debit Card</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600 text-lg">-$4.50</p>
                  <p className="text-sm text-slate-500">Balance: $2,445.50</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-slate-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-orange-100 rounded-full flex items-center justify-center">
                      <span className="text-orange-600 font-bold">🛒</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Whole Foods Market</p>
                      <p className="text-sm text-slate-500">Yesterday, 3:15 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Groceries</Badge>
                    <Badge variant="outline">Credit Card</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600 text-lg">-$67.23</p>
                  <p className="text-sm text-slate-500">Balance: $2,450.00</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-slate-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <span className="text-green-600 font-bold">💰</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Salary Deposit</p>
                      <p className="text-sm text-slate-500">May 25, 9:00 AM</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="success">Income</Badge>
                    <Badge variant="outline">Bank Transfer</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-green-600 text-lg">+$3,200.00</p>
                  <p className="text-sm text-slate-500">Balance: $2,517.23</p>
                </div>
              </div>
            </div>

            <div className="p-4 hover:bg-slate-50">
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 font-bold">⚡</span>
                    </div>
                    <div>
                      <p className="font-medium text-slate-900">Electric Bill</p>
                      <p className="text-sm text-slate-500">May 24, 2:00 PM</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Badge variant="secondary">Bills & Utilities</Badge>
                    <Badge variant="outline">Auto Pay</Badge>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-red-600 text-lg">-$89.45</p>
                  <p className="text-sm text-slate-500">Balance: $1,682.77</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-center">
          <Button variant="outline">Load More Transactions</Button>
        </div>
      </div>
    </PageLayout>
  );
}
