import type { Category } from '../../../../types/api';

import type { EditCategoryFormData } from './types';

export const getDefaultFormValues = (category: Category): Partial<EditCategoryFormData> => ({
  groupId: category.groupId,
  name: category.name ?? '',
  note: category.note,
  parentId: category.parentId,
});

export const VALIDATION_RULES = {
  groupId: {
    required: 'Group is required',
  },
  name: {
    required: 'Category name is required',
    maxLength: {
      value: 100,
      message: 'Category name must be less than 100 characters',
    },
  },
  note: {
    maxLength: {
      value: 500,
      message: 'Notes must be less than 500 characters',
    },
  },
  parentId: {
    // No validation needed for optional field
  },
};

/**
 * Transforms form data to API format for category update
 */
export const transformToCategoryData = (data: EditCategoryFormData) => ({
  groupId: data.groupId,
  name: data.name,
  note: data.note,
  parentId: data.parentId,
});

/**
 * Validates if the form data is ready for submission
 */
export const validateFormData = (data: EditCategoryFormData): { isValid: boolean; error?: string } => {
  if (!data.groupId) {
    return { isValid: false, error: 'Group is required' };
  }

  if (!data.name?.trim()) {
    return { isValid: false, error: 'Category name is required' };
  }

  return { isValid: true };
};
