import { Button } from '../button';
import { FormLayout } from '../form-layout';
import { Select } from '../select';
import { TextArea } from '../text-area';
import { TextInput } from '../text-input';

export default function FormLayoutDemo() {
  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-slate-700 mb-4">FormLayout Demo</h2>
        <p className="text-slate-600 mb-6">Consistent field positioning and grid layout for forms</p>
      </div>

      {/* Basic 2-column form */}
      <div className="bg-white p-6 rounded-lg border border-mist-200">
        <h3 className="text-lg font-semibold text-slate-600 mb-4">2-Column Form</h3>
        <FormLayout columns={2}>
          <FormLayout.Field>
            <TextInput label="First Name" placeholder="Enter first name" />
          </FormLayout.Field>
          <FormLayout.Field>
            <TextInput label="Last Name" placeholder="Enter last name" />
          </FormLayout.Field>
          <FormLayout.Field span="full">
            <TextInput label="Email" type="email" placeholder="Enter email address" />
          </FormLayout.Field>
          <FormLayout.Field>
            <Select label="Country" placeholder="Select country" />
          </FormLayout.Field>
          <FormLayout.Field>
            <TextInput label="Phone" placeholder="Enter phone number" />
          </FormLayout.Field>
          <FormLayout.Field span="full">
            <TextArea label="Message" placeholder="Enter your message" rows={3} />
          </FormLayout.Field>
        </FormLayout>
      </div>

      {/* 3-column form */}
      <div className="bg-white p-6 rounded-lg border border-mist-200">
        <h3 className="text-lg font-semibold text-slate-600 mb-4">3-Column Form</h3>
        <FormLayout columns={3}>
          <FormLayout.Field>
            <TextInput label="First Name" placeholder="First name" />
          </FormLayout.Field>
          <FormLayout.Field>
            <TextInput label="Middle Name" placeholder="Middle name" />
          </FormLayout.Field>
          <FormLayout.Field>
            <TextInput label="Last Name" placeholder="Last name" />
          </FormLayout.Field>
          <FormLayout.Field span={2}>
            <TextInput label="Street Address" placeholder="Enter street address" />
          </FormLayout.Field>
          <FormLayout.Field>
            <TextInput label="Apt/Unit" placeholder="Apt #" />
          </FormLayout.Field>
          <FormLayout.Field>
            <TextInput label="City" placeholder="City" />
          </FormLayout.Field>
          <FormLayout.Field>
            <Select label="State" placeholder="State" />
          </FormLayout.Field>
          <FormLayout.Field>
            <TextInput label="ZIP Code" placeholder="ZIP" />
          </FormLayout.Field>
        </FormLayout>
      </div>

      {/* Mixed spans */}
      <div className="bg-white p-6 rounded-lg border border-mist-200">
        <h3 className="text-lg font-semibold text-slate-600 mb-4">Mixed Field Spans</h3>
        <FormLayout columns={4} gap="lg">
          <FormLayout.Field span="full">
            <TextInput label="Project Title" placeholder="Enter project title" />
          </FormLayout.Field>
          <FormLayout.Field span={2}>
            <TextInput label="Description" placeholder="Brief description" />
          </FormLayout.Field>
          <FormLayout.Field>
            <Select label="Priority" placeholder="Select priority" />
          </FormLayout.Field>
          <FormLayout.Field>
            <TextInput label="Due Date" type="date" />
          </FormLayout.Field>
          <FormLayout.Field span={3}>
            <TextArea label="Detailed Notes" placeholder="Enter detailed notes..." rows={2} />
          </FormLayout.Field>
          <FormLayout.Field>
            <Select label="Assignee" placeholder="Select assignee" />
          </FormLayout.Field>
        </FormLayout>
      </div>

      {/* Action buttons */}
      <div className="flex gap-4 justify-end">
        <Button variant="outline">Cancel</Button>
        <Button variant="coral">Save Form</Button>
      </div>
    </div>
  );
}
