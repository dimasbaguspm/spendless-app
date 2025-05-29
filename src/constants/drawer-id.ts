export const DRAWER_IDS = {
  CREATE_TRANSACTION: 'create-transaction',
  EDIT_TRANSACTION: 'edit-transaction',
} as const;

export type DrawerId = (typeof DRAWER_IDS)[keyof typeof DRAWER_IDS];
