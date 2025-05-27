import { FormLayout as BaseFormLayout } from './form-layout';
import { FormLayoutField } from './form-layout-field';
import { FormLayoutTitle } from './form-layout-title';

type FormLayoutCompositionModel = {
  Field: typeof FormLayoutField;
  Title: typeof FormLayoutTitle;
};

const FormLayoutComposition = {
  Field: FormLayoutField,
  Title: FormLayoutTitle,
} satisfies FormLayoutCompositionModel;

export const FormLayout = Object.assign(BaseFormLayout, FormLayoutComposition);

export type { FormLayoutProps } from './form-layout';
export type { FormLayoutFieldProps } from './form-layout-field';
export type { FormLayoutTitleProps } from './form-layout-title';
