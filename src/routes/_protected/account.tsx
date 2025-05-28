import { createFileRoute } from '@tanstack/react-router';

import { Button, PageLayout, TextInput, Avatar, Switch } from '../../components';

export const Route = createFileRoute('/_protected/account')({
  component: AccountComponent,
});

function AccountComponent() {
  return (
    <PageLayout background="cream" title="Account Settings" showBackButton={true}>
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Profile Information</h3>

          <div className="flex items-center gap-4 mb-6">
            <Avatar size="lg" src="https://picsum.photos/80/80" />
            <div>
              <Button variant="outline" size="sm">
                Change Photo
              </Button>
              <p className="text-sm text-slate-500 mt-1">JPG, PNG or GIF. Max size 2MB.</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">First Name</label>
              <TextInput defaultValue="John" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Last Name</label>
              <TextInput defaultValue="Doe" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <TextInput type="email" defaultValue="john.doe@example.com" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone Number</label>
              <TextInput type="tel" defaultValue="+1 (555) 123-4567" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="coral">Save Changes</Button>
          </div>
        </div>

        {/* Security Settings */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Security Settings</h3>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Current Password</label>
              <TextInput type="password" placeholder="Enter current password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">New Password</label>
              <TextInput type="password" placeholder="Enter new password" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Confirm Password</label>
              <TextInput type="password" placeholder="Confirm new password" />
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button variant="coral">Update Password</Button>
          </div>
        </div>

        {/* Preferences */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Preferences</h3>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Email Notifications</p>
                <p className="text-sm text-slate-500">Receive email updates about your transactions</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Push Notifications</p>
                <p className="text-sm text-slate-500">Get notified about spending alerts</p>
              </div>
              <Switch defaultChecked />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Monthly Reports</p>
                <p className="text-sm text-slate-500">Automatically generate monthly spending reports</p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="font-medium text-slate-900">Budget Alerts</p>
                <p className="text-sm text-slate-500">Alert when approaching budget limits</p>
              </div>
              <Switch defaultChecked />
            </div>
          </div>
        </div>

        {/* Account Actions */}
        <div className="bg-white p-6 rounded-lg shadow-sm border border-slate-200">
          <h3 className="text-lg font-semibold text-slate-900 mb-4">Account Actions</h3>

          <div className="space-y-3">
            <Button variant="outline" className="w-full justify-start">
              Export Data
            </Button>
            <Button variant="outline" className="w-full justify-start">
              Download Statements
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start text-orange-600 border-orange-200 hover:bg-orange-50"
            >
              Deactivate Account
            </Button>
            <Button variant="outline" className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50">
              Delete Account
            </Button>
          </div>
        </div>

        {/* Logout */}
        <div className="flex justify-center">
          <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50">
            Sign Out
          </Button>
        </div>
      </div>
    </PageLayout>
  );
}
