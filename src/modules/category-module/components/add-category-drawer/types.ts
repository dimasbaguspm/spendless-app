import type { NewCategory } from '../../../../types/api';

export type AddCategoryFormData = NewCategory;

export interface AddCategoryDrawerProps {
  onSuccess?: () => void;
  onError?: (message: string) => void;
}
