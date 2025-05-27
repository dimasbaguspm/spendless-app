import { FormLayout as BaseFormLayout } from './form-layout';
import { FormLayoutField } from './form-layout-field';
import { FormLayoutSection } from './form-layout-section';

type FormLayoutCompositionModel = {
  Field: typeof FormLayoutField;
  Section: typeof FormLayoutSection;
};

const FormLayoutComposition = {
  Field: FormLayoutField,
  Section: FormLayoutSection,
} satisfies FormLayoutCompositionModel;

export const FormLayout = Object.assign(BaseFormLayout, FormLayoutComposition);

export type { FormLayoutProps } from './form-layout';
export type { FormLayoutFieldProps } from './form-layout-field';
export type { FormLayoutSectionProps } from './form-layout-section';
