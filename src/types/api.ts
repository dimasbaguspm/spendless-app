/* eslint-disable */
/* tslint:disable */
/**
 * AUTO-GENERATED FILE - DO NOT EDIT MANUALLY!
 * 
 * This file was automatically generated from the Swagger/OpenAPI specification.
 * Any manual changes will be overwritten when the types are regenerated.
 * 
 * To regenerate this file, run: npm run generate-types
 * 
 * Generated on: 2025-05-25T08:18:45.913Z
 * Source: http://localhost:3000/api/docs/swagger.json
 */

export interface Error {
  /** Error message */
  error?: string;
  /** HTTP status code */
  status?: number;
  /**
   * Error timestamp
   * @format date-time
   */
  timestamp?: string;
}

export interface User {
  /** User unique identifier */
  id?: number;
  /** Group identifier the user belongs to */
  groupId?: number;
  /**
   * User email address
   * @format email
   * @maxLength 255
   */
  email?: string;
  /**
   * User full name
   * @maxLength 255
   */
  name?: string;
  /** Whether the user is active */
  isActive?: boolean;
  /**
   * User creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * User last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

export interface Group {
  /** Group unique identifier */
  id?: number;
  /**
   * Group name
   * @maxLength 255
   */
  name?: string;
  /**
   * Default currency code (3 characters)
   * @minLength 3
   * @maxLength 3
   * @example "USD"
   */
  defaultCurrency?: string;
  /**
   * Group creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Group last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

export interface Account {
  /** Account unique identifier */
  id?: number;
  /** Group identifier the account belongs to */
  groupId?: number;
  /**
   * Account name
   * @maxLength 255
   */
  name?: string;
  /**
   * Account type (e.g., checking, savings, credit, cash)
   * @maxLength 50
   * @example "checking"
   */
  type?: string;
  /** Optional account notes */
  note?: string | null;
  /**
   * Account creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Account last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

export interface Category {
  /** Category unique identifier */
  id?: number;
  /** Group identifier the category belongs to */
  groupId?: number;
  /** Parent category ID for nested categories */
  parentId?: number | null;
  /**
   * Category name
   * @maxLength 100
   */
  name?: string;
  /** Optional category notes */
  note?: string | null;
  /**
   * Category creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Category last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

export interface Transaction {
  /** Transaction unique identifier */
  id?: number;
  /** Group identifier */
  groupId?: number;
  /** Account identifier */
  accountId?: number;
  /** Category identifier */
  categoryId?: number;
  /** User who created the transaction */
  createdByUserId?: number;
  /**
   * Transaction amount with 2 decimal precision
   * @multipleOf 0.01
   * @example 123.45
   */
  amount?: number;
  /**
   * Currency code (3 characters)
   * @minLength 3
   * @maxLength 3
   * @example "USD"
   */
  currency?: string;
  /**
   * Transaction date
   * @format date
   */
  date?: string;
  /** Optional transaction notes */
  note?: string | null;
  /** Recurrence pattern ID if this is a recurring transaction */
  recurrenceId?: number | null;
  /**
   * Transaction creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Transaction last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

export interface AuthTokens {
  /** JWT access token */
  accessToken?: string;
  /** JWT refresh token */
  refreshToken?: string;
  /** Access token expiration time in seconds */
  expiresIn?: number;
}

export interface AccountLimit {
  /** Account limit unique identifier */
  id?: number;
  /** Account identifier */
  accountId?: number;
  /** Limit period */
  period?: "month" | "week";
  /**
   * Spending limit amount
   * @min 0
   * @multipleOf 0.01
   */
  limit?: number;
  /**
   * Account limit creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Account limit last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

export interface Recurrence {
  /** Recurrence unique identifier */
  id?: number;
  /** Recurrence frequency */
  frequency?: "daily" | "weekly" | "monthly" | "yearly";
  /**
   * Interval between recurrences
   * @min 1
   */
  interval?: number;
  /**
   * Next occurrence date
   * @format date
   */
  nextOccurrenceDate?: string;
  /**
   * End date for recurrence
   * @format date
   */
  endDate?: string | null;
  /**
   * Recurrence creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Recurrence last update timestamp
   * @format date-time
   */
  updatedAt?: string;
}

export interface RefreshToken {
  /** Refresh token unique identifier */
  id?: number;
  /** User identifier */
  userId?: number;
  /** Refresh token value */
  token?: string;
  /**
   * Token expiration timestamp
   * @format date-time
   */
  expires?: string;
  /**
   * Token creation timestamp
   * @format date-time
   */
  createdAt?: string;
  /**
   * Token revocation timestamp
   * @format date-time
   */
  revokedAt?: string | null;
  /** Token that replaced this one */
  replacedByToken?: string | null;
}

export interface PaginatedResponse {
  /** Array of items */
  items?: any[];
  /** Current page number */
  pageNumber?: number;
  /** Number of items per page */
  pageSize?: number;
  /** Total number of items */
  totalItems?: number;
  /** Total number of pages */
  totalPages?: number;
}

export type PagedGroups = PaginatedResponse & {
  items?: Group[];
};

export type PagedUsers = PaginatedResponse & {
  items?: User[];
};

export type PagedAccounts = PaginatedResponse & {
  items?: Account[];
};

export type PagedAccountLimits = PaginatedResponse & {
  items?: AccountLimit[];
};

export type PagedCategories = PaginatedResponse & {
  items?: Category[];
};

export type PagedRecurrences = PaginatedResponse & {
  items?: Recurrence[];
};

export type PagedTransactions = PaginatedResponse & {
  items?: Transaction[];
};

export interface NewGroup {
  /**
   * Group name
   * @maxLength 255
   */
  name: string;
  /**
   * Default currency code (3 characters)
   * @minLength 3
   * @maxLength 3
   * @example "USD"
   */
  defaultCurrency: string;
}

export interface UpdateGroup {
  /**
   * Group name
   * @maxLength 255
   */
  name?: string;
  /**
   * Default currency code (3 characters)
   * @minLength 3
   * @maxLength 3
   * @example "USD"
   */
  defaultCurrency?: string;
}

export interface NewUser {
  /** Group identifier the user belongs to */
  groupId: number;
  /**
   * User email address
   * @format email
   * @maxLength 255
   */
  email: string;
  /**
   * User password hash
   * @maxLength 255
   */
  passwordHash: string;
  /**
   * User full name
   * @maxLength 255
   */
  name: string;
  /** Whether the user is active */
  isActive: boolean;
}

export interface UpdateUser {
  /** Group identifier the user belongs to */
  groupId?: number;
  /**
   * User email address
   * @format email
   * @maxLength 255
   */
  email?: string;
  /**
   * User password hash
   * @maxLength 255
   */
  passwordHash?: string;
  /**
   * User full name
   * @maxLength 255
   */
  name?: string;
  /** Whether the user is active */
  isActive?: boolean;
}

export interface NewAccount {
  /** Group identifier the account belongs to */
  groupId: number;
  /**
   * Account name
   * @maxLength 255
   */
  name: string;
  /**
   * Account type (e.g., checking, savings, credit, cash)
   * @maxLength 50
   * @example "checking"
   */
  type: string;
  /** Optional account notes */
  note?: string | null;
}

export interface UpdateAccount {
  /** Group identifier the account belongs to */
  groupId?: number;
  /**
   * Account name
   * @maxLength 255
   */
  name?: string;
  /**
   * Account type (e.g., checking, savings, credit, cash)
   * @maxLength 50
   * @example "checking"
   */
  type?: string;
  /** Optional account notes */
  note?: string | null;
}

export interface NewAccountLimit {
  /** Account identifier */
  accountId: number;
  /** Limit period */
  period: "month" | "week";
  /**
   * Spending limit amount
   * @min 0
   * @multipleOf 0.01
   */
  limit: number;
}

export interface UpdateAccountLimit {
  /** Account identifier */
  accountId?: number;
  /** Limit period */
  period?: "month" | "week";
  /**
   * Spending limit amount
   * @min 0
   * @multipleOf 0.01
   */
  limit?: number;
}

export interface NewCategory {
  /** Group identifier the category belongs to */
  groupId: number;
  /** Parent category ID for nested categories */
  parentId?: number | null;
  /**
   * Category name
   * @maxLength 100
   */
  name: string;
  /** Optional category notes */
  note?: string | null;
}

export interface UpdateCategory {
  /** Group identifier the category belongs to */
  groupId?: number;
  /** Parent category ID for nested categories */
  parentId?: number | null;
  /**
   * Category name
   * @maxLength 100
   */
  name?: string;
  /** Optional category notes */
  note?: string | null;
}

export interface NewRecurrence {
  /** Recurrence frequency */
  frequency: "daily" | "weekly" | "monthly" | "yearly";
  /**
   * Interval between recurrences
   * @min 1
   */
  interval: number;
  /**
   * Next occurrence date
   * @format date
   */
  nextOccurrenceDate: string;
  /**
   * End date for recurrence
   * @format date
   */
  endDate?: string | null;
}

export interface UpdateRecurrence {
  /** Recurrence frequency */
  frequency?: "daily" | "weekly" | "monthly" | "yearly";
  /**
   * Interval between recurrences
   * @min 1
   */
  interval?: number;
  /**
   * Next occurrence date
   * @format date
   */
  nextOccurrenceDate?: string;
  /**
   * End date for recurrence
   * @format date
   */
  endDate?: string | null;
}

export interface NewTransaction {
  /** Group identifier */
  groupId: number;
  /** Account identifier */
  accountId: number;
  /** Category identifier */
  categoryId: number;
  /** User who created the transaction */
  createdByUserId: number;
  /**
   * Transaction amount with 2 decimal precision
   * @multipleOf 0.01
   * @example 123.45
   */
  amount: number;
  /**
   * Currency code (3 characters)
   * @minLength 3
   * @maxLength 3
   * @example "USD"
   */
  currency: string;
  /**
   * Transaction date
   * @format date
   */
  date: string;
  /** Optional transaction notes */
  note?: string | null;
  /** Recurrence pattern ID if this is a recurring transaction */
  recurrenceId?: number | null;
}

export interface UpdateTransaction {
  /** Group identifier */
  groupId?: number;
  /** Account identifier */
  accountId?: number;
  /** Category identifier */
  categoryId?: number;
  /** User who created the transaction */
  createdByUserId?: number;
  /**
   * Transaction amount with 2 decimal precision
   * @multipleOf 0.01
   * @example 123.45
   */
  amount?: number;
  /**
   * Currency code (3 characters)
   * @minLength 3
   * @maxLength 3
   * @example "USD"
   */
  currency?: string;
  /**
   * Transaction date
   * @format date
   */
  date?: string;
  /** Optional transaction notes */
  note?: string | null;
  /** Recurrence pattern ID if this is a recurring transaction */
  recurrenceId?: number | null;
}

export interface NewRefreshToken {
  /** User identifier */
  userId: number;
  /** Refresh token value */
  token: string;
  /**
   * Token expiration timestamp
   * @format date-time
   */
  expires: string;
  /**
   * Token revocation timestamp
   * @format date-time
   */
  revokedAt?: string | null;
  /** Token that replaced this one */
  replacedByToken?: string | null;
}

export interface UpdateRefreshToken {
  /** User identifier */
  userId?: number;
  /** Refresh token value */
  token?: string;
  /**
   * Token expiration timestamp
   * @format date-time
   */
  expires?: string;
  /**
   * Token revocation timestamp
   * @format date-time
   */
  revokedAt?: string | null;
  /** Token that replaced this one */
  replacedByToken?: string | null;
}

export interface QueryParameters {
  /**
   * Page number for pagination
   * @min 1
   * @default 1
   */
  pageNumber?: number;
  /**
   * Number of items per page
   * @min 1
   * @max 100
   * @default 25
   */
  pageSize?: number;
  /** Field to sort by */
  sortBy?: string;
  /**
   * Sort order
   * @default "asc"
   */
  sortOrder?: "asc" | "desc";
}

export type UserQueryParameters = QueryParameters & {
  /** Filter by user ID */
  id?: number;
  /** Filter by group ID */
  groupId?: number;
  /**
   * Filter by email
   * @format email
   */
  email?: string;
  /** Filter by name */
  name?: string;
  /** Filter by active status */
  isActive?: boolean;
  /** Field to sort by */
  sortBy?: "name" | "email" | "createdAt";
};

export type GroupQueryParameters = QueryParameters & {
  /** Filter by group ID */
  id?: number;
  /** Filter by group name */
  name?: string;
  /** Field to sort by */
  sortBy?: "name" | "createdAt";
};

export type AccountQueryParameters = QueryParameters & {
  /** Filter by account ID */
  id?: number;
  /** Filter by group ID */
  groupId?: number;
  /** Filter by account name */
  name?: string;
  /** Filter by account type */
  type?: string;
  /** Field to sort by */
  sortBy?: "name" | "type" | "createdAt";
};

export type CategoryQueryParameters = QueryParameters & {
  /** Filter by category ID */
  id?: number;
  /** Filter by group ID */
  groupId?: number;
  /** Filter by parent category ID */
  parentId?: number | null;
  /** Filter by category name */
  name?: string;
  /** Field to sort by */
  sortBy?: "name" | "createdAt";
};

export type TransactionQueryParameters = QueryParameters & {
  /** Filter by transaction ID */
  id?: number;
  /** Filter by group ID */
  groupId?: number;
  /** Filter by account ID */
  accountId?: number;
  /** Filter by category ID */
  categoryId?: number;
  /** Filter by user who created the transaction */
  createdByUserId?: number;
  /** Search in transaction notes */
  note?: string;
  /**
   * Filter transactions from this date
   * @format date
   */
  startDate?: string;
  /**
   * Filter transactions until this date
   * @format date
   */
  endDate?: string;
  /**
   * Filter by currency code
   * @minLength 3
   * @maxLength 3
   */
  currency?: string;
  /** Filter by recurrence ID */
  recurrenceId?: number;
  /** Field to sort by */
  sortBy?: "date" | "amount" | "createdAt";
};

export type AccountLimitQueryParameters = QueryParameters & {
  /** Filter by account limit ID */
  id?: number;
  /** Filter by account ID */
  accountId?: number;
  /** Filter by period */
  period?: "month" | "week";
  /** Field to sort by */
  sortBy?: "period" | "limit" | "startDate" | "createdAt";
};

export type RecurrenceQueryParameters = QueryParameters & {
  /** Filter by recurrence ID */
  id?: number;
  /** Filter by frequency */
  frequency?: "daily" | "weekly" | "monthly" | "yearly";
  /**
   * Filter recurrences starting from this date
   * @format date
   */
  startDate?: string;
  /**
   * Filter recurrences ending before this date
   * @format date
   */
  endDate?: string;
  /** Field to sort by */
  sortBy?: "frequency" | "interval" | "nextOccurrenceDate" | "createdAt";
};

export type RefreshTokenQueryParameters = QueryParameters & {
  /** Filter by user ID */
  userId?: number;
  /** Filter by token value */
  token?: string;
  /** Filter by active status (not revoked) */
  isActive?: boolean;
  /** Field to sort by */
  sortBy?: "userId" | "expires" | "createdAt";
};
