import { Edit2, Trash2, Tag, DollarSign, ShoppingCart, Car, Home, Coffee } from 'lucide-react';

import { Button } from '../../../../components';
import { DRAWER_IDS } from '../../../../constants/drawer-id';
import { useApiCategoriesQuery, useApiDeleteCategoryMutation } from '../../../../hooks/use-api';
import { useDrawerRouterProvider } from '../../../../providers/drawer-router/context';

export interface CategoriesListProps {
  onAddCategory?: () => void;
}

const ICON_OPTIONS = [
  { value: 'shopping-cart', label: 'Shopping', icon: ShoppingCart },
  { value: 'car', label: 'Transportation', icon: Car },
  { value: 'home', label: 'Housing', icon: Home },
  { value: 'coffee', label: 'Food & Dining', icon: Coffee },
  { value: 'dollar-sign', label: 'Income', icon: DollarSign },
  { value: 'tag', label: 'General', icon: Tag },
];

export function CategoriesList() {
  const [categoriesData, , categoriesState] = useApiCategoriesQuery();
  const [deleteCategory] = useApiDeleteCategoryMutation();
  const { openDrawer } = useDrawerRouterProvider();

  const categories = categoriesData?.items ?? [];

  const getIconComponent = (iconName: string) => {
    const iconOption = ICON_OPTIONS.find((opt) => opt.value === iconName);
    return iconOption ? iconOption.icon : Tag;
  };

  const handleOpenAddCategoryDrawer = async () => {
    await openDrawer(DRAWER_IDS.ADD_CATEGORY);
  };

  const handleDeleteCategory = async (categoryId: number) => {
    if (confirm('Are you sure you want to delete this category? This action cannot be undone.')) {
      try {
        await deleteCategory({ categoryId });
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to delete category:', error);
        alert('Failed to delete category. Please try again.');
      }
    }
  };

  if (categoriesState.isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-500">Loading categories...</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100">
      {categories.map((category) => {
        const IconComponent = getIconComponent('tag'); // Default icon since API doesn't have icon field
        return (
          <div key={category.id} className="p-4 flex items-center gap-4">
            {/* Icon */}
            <div className="flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center text-white bg-slate-500">
              <IconComponent className="w-5 h-5" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-medium text-slate-900">{category.name}</h3>
              </div>
              <p className="text-sm text-slate-500">Category #{category.id}</p>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-2">
              <button
                onClick={() => openDrawer(DRAWER_IDS.EDIT_CATEGORY, { categoryId: category.id })}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-mist-50 rounded-lg transition-colors"
              >
                <Edit2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => category.id && handleDeleteCategory(category.id)}
                className="p-2 text-slate-400 hover:text-danger-600 hover:bg-danger-50 rounded-lg transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          </div>
        );
      })}

      {categories.length === 0 && (
        <div className="p-8 text-center">
          <Tag className="w-12 h-12 text-slate-300 mx-auto mb-4" />
          <p className="text-slate-500 mb-4">No categories added yet</p>

          <Button variant="coral" onClick={handleOpenAddCategoryDrawer}>
            Add Your First Category
          </Button>
        </div>
      )}
    </div>
  );
}
