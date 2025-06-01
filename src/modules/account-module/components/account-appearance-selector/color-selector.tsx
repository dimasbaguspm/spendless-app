import { Select } from '../../../../components';
import { ACCOUNT_COLORS } from '../account-icon/constants';

interface ColorSelectorProps {
  selectedColor: string;
  colorVariant: 'fill' | 'outline';
  onColorSelect: (colorValue: string) => void;
  onVariantChange: (variant: 'fill' | 'outline', currentColor: string) => void;
}

export const ColorSelector = ({ selectedColor, colorVariant, onColorSelect, onVariantChange }: ColorSelectorProps) => {
  // Filter colors based on selected variant
  const filteredColors = ACCOUNT_COLORS.filter((color) => {
    if (colorVariant === 'fill') {
      return !color.value.includes('-outline');
    } else {
      return color.value.includes('-outline');
    }
  });

  const variantOptions = [
    { value: 'fill', label: 'Fill Colors' },
    { value: 'outline', label: 'Outline Colors' },
  ];

  return (
    <div>
      <h3 className="text-sm font-medium text-slate-700 mb-3">Choose Color</h3>

      <div className="mb-4">
        <Select
          id="color-variant"
          placeholder="Select color type..."
          options={variantOptions}
          value={colorVariant}
          onChange={(e) => onVariantChange(e.target.value as 'fill' | 'outline', selectedColor)}
          size="sm"
          variant="mist"
        />
      </div>

      <div className="grid grid-cols-4 gap-3">
        {filteredColors.map((colorOption) => {
          const isSelected = selectedColor === colorOption.value;

          return (
            <button
              key={colorOption.value}
              type="button"
              className={`
                relative flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200
                ${
                  isSelected
                    ? `border-slate-300 bg-slate-50 ${colorOption.ring} ring-2 ring-offset-1 scale-105`
                    : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50 hover:scale-105'
                }
              `}
              onClick={() => onColorSelect(colorOption.value)}
              title={colorOption.label}
            >
              <div className={`w-6 h-6 rounded-full ${colorOption.color} shadow-md`} />
              <span className="text-xs font-medium text-slate-700">{colorOption.label}</span>
              {isSelected && (
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-coral-500 rounded-full flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
