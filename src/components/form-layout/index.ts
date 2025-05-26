import { FormLayout as BaseFormLayout } from './form-layout';
import { FormLayoutField } from './form-layout-field';

type FormLayoutCompositionModel = {
  Field: typeof FormLayoutField;
};

const FormLayoutComposition = {
  Field: FormLayoutField,
} satisfies FormLayoutCompositionModel;

export const FormLayout = Object.assign(BaseFormLayout, FormLayoutComposition);

export type { FormLayoutProps } from './form-layout';
export type { FormLayoutFieldProps } from './form-layout-field';
