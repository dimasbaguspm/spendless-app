import { type FC } from 'react';
import { Controller } from 'react-hook-form';

import { Drawer, TextInput, Select, TextArea, Button } from '../../../../components';

import type { AddCategoryDrawerProps } from './types';
import { useAddCategoryForm } from './use-add-category-form.hook';

export const AddCategoryDrawer: FC<AddCategoryDrawerProps> = ({ onSuccess, onError }) => {
  const { handleSubmit, control, errors, isPending, onSubmit, closeDrawer, validationRules, parentCategoryOptions } =
    useAddCategoryForm({ onSuccess, onError });

  return (
    <Drawer onClose={closeDrawer} size="md">
      <Drawer.Header>
        <Drawer.Title>Add Category</Drawer.Title>
        <Drawer.CloseButton />
      </Drawer.Header>
      <Drawer.Content>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <Controller
            name="name"
            control={control}
            rules={validationRules.name}
            render={({ field }) => (
              <TextInput
                {...field}
                label="Category Name"
                placeholder="Enter category name"
                errorText={errors.name?.message}
                maxLength={100}
              />
            )}
          />

          <Controller
            name="parentId"
            control={control}
            rules={validationRules.parentId}
            render={({ field }) => (
              <Select
                {...field}
                value={field.value?.toString() ?? ''}
                onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value, 10) : null)}
                label="Parent Category"
                placeholder="Select parent category (optional)"
                options={parentCategoryOptions}
                errorText={errors.parentId?.message}
                helperText="Choose a parent category to create subcategories"
              />
            )}
          />

          <Controller
            name="note"
            control={control}
            rules={validationRules.note}
            render={({ field }) => (
              <TextArea
                {...field}
                value={field.value ?? ''}
                label="Notes"
                placeholder="Add any notes about this category..."
                helperText="Optional description for this category"
                rows={3}
              />
            )}
          />
        </form>
      </Drawer.Content>
      <Drawer.Footer>
        <div className="flex gap-3 justify-end">
          <Button variant="secondary" onClick={closeDrawer}>
            Cancel
          </Button>
          <Button variant="default" onClick={handleSubmit(onSubmit)} disabled={isPending}>
            {isPending ? 'Creating...' : 'Create Category'}
          </Button>
        </div>
      </Drawer.Footer>
    </Drawer>
  );
};
