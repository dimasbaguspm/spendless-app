import type { UpdateCategory, Category } from '../../../../types/api';

export interface EditCategoryFormData extends UpdateCategory {
  name: string;
  note?: string | null;
  parentId?: number | null;
}

export interface EditCategoryDrawerProps {
  category: Category;
  onSuccess?: () => void;
  onError?: (message: string) => void;
}
