export const DRAWER_IDS = {
  CREATE_TRANSACTION: 'create-transaction',
  EDIT_TRANSACTION: 'edit-transaction',
  ADD_ACCOUNT: 'add-account',
} as const;

export type DrawerId = (typeof DRAWER_IDS)[keyof typeof DRAWER_IDS];
