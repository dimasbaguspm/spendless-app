import { createFileRoute } from '@tanstack/react-router';

import { Button, PageLayout } from '../../components';

export const Route = createFileRoute('/_protected/')({
  component: HomeComponent,
});

function HomeComponent() {
  return (
    <PageLayout background="cream">
      <div className="space-y-6">
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-slate-900">Welcome Back!</h1>
          <p className="text-slate-600">Manage your expenses and track your spending</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">Total Balance</h3>
            <p className="text-2xl font-bold text-green-600">$2,450.00</p>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
            <h3 className="text-lg font-semibold text-slate-900 mb-2">This Month</h3>
            <p className="text-2xl font-bold text-red-600">-$850.00</p>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-3">
            <Button variant="coral" className="w-full">
              Add Transaction
            </Button>
            <Button variant="outline" className="w-full">
              View Analytics
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Recent Transactions</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <div>
                <p className="font-medium text-slate-900">Coffee Shop</p>
                <p className="text-sm text-slate-500">Today, 10:30 AM</p>
              </div>
              <p className="font-bold text-red-600">-$4.50</p>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-slate-100">
              <div>
                <p className="font-medium text-slate-900">Grocery Store</p>
                <p className="text-sm text-slate-500">Yesterday, 3:15 PM</p>
              </div>
              <p className="font-bold text-red-600">-$67.23</p>
            </div>
            <div className="flex justify-between items-center py-2">
              <div>
                <p className="font-medium text-slate-900">Salary Deposit</p>
                <p className="text-sm text-slate-500">May 25, 9:00 AM</p>
              </div>
              <p className="font-bold text-green-600">+$3,200.00</p>
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
