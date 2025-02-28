/* tslint:disable */
/* eslint-disable */
/**
 * This file was automatically generated by Payload.
 * DO NOT MODIFY IT BY HAND. Instead, modify your source Payload config,
 * and re-run `payload generate:types` to regenerate this file.
 */

/**
 * Supported timezones in IANA format.
 *
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "supportedTimezones".
 */
export type SupportedTimezones =
  | 'Pacific/Midway'
  | 'Pacific/Niue'
  | 'Pacific/Honolulu'
  | 'Pacific/Rarotonga'
  | 'America/Anchorage'
  | 'Pacific/Gambier'
  | 'America/Los_Angeles'
  | 'America/Tijuana'
  | 'America/Denver'
  | 'America/Phoenix'
  | 'America/Chicago'
  | 'America/Guatemala'
  | 'America/New_York'
  | 'America/Bogota'
  | 'America/Caracas'
  | 'America/Santiago'
  | 'America/Buenos_Aires'
  | 'America/Sao_Paulo'
  | 'Atlantic/South_Georgia'
  | 'Atlantic/Azores'
  | 'Atlantic/Cape_Verde'
  | 'Europe/London'
  | 'Europe/Berlin'
  | 'Africa/Lagos'
  | 'Europe/Athens'
  | 'Africa/Cairo'
  | 'Europe/Moscow'
  | 'Asia/Riyadh'
  | 'Asia/Dubai'
  | 'Asia/Baku'
  | 'Asia/Karachi'
  | 'Asia/Tashkent'
  | 'Asia/Calcutta'
  | 'Asia/Dhaka'
  | 'Asia/Almaty'
  | 'Asia/Jakarta'
  | 'Asia/Bangkok'
  | 'Asia/Shanghai'
  | 'Asia/Singapore'
  | 'Asia/Tokyo'
  | 'Asia/Seoul'
  | 'Australia/Sydney'
  | 'Pacific/Guam'
  | 'Pacific/Noumea'
  | 'Pacific/Auckland'
  | 'Pacific/Fiji';

export interface Config {
  auth: {
    'hooks-users': HooksUserAuthOperations;
  };
  blocks: {};
  collections: {
    'before-change-hooks': BeforeChangeHook;
    'before-validate': BeforeValidate;
    afterOperation: AfterOperation;
    'context-hooks': ContextHook;
    transforms: Transform;
    hooks: Hook;
    'nested-after-read-hooks': NestedAfterReadHook;
    'chaining-hooks': ChainingHook;
    relations: Relation;
    'hooks-users': HooksUser;
    'data-hooks': DataHook;
    'field-paths': FieldPath;
    'value-hooks': ValueHook;
    'payload-locked-documents': PayloadLockedDocument;
    'payload-preferences': PayloadPreference;
    'payload-migrations': PayloadMigration;
  };
  collectionsJoins: {};
  collectionsSelect: {
    'before-change-hooks': BeforeChangeHooksSelect<false> | BeforeChangeHooksSelect<true>;
    'before-validate': BeforeValidateSelect<false> | BeforeValidateSelect<true>;
    afterOperation: AfterOperationSelect<false> | AfterOperationSelect<true>;
    'context-hooks': ContextHooksSelect<false> | ContextHooksSelect<true>;
    transforms: TransformsSelect<false> | TransformsSelect<true>;
    hooks: HooksSelect<false> | HooksSelect<true>;
    'nested-after-read-hooks': NestedAfterReadHooksSelect<false> | NestedAfterReadHooksSelect<true>;
    'chaining-hooks': ChainingHooksSelect<false> | ChainingHooksSelect<true>;
    relations: RelationsSelect<false> | RelationsSelect<true>;
    'hooks-users': HooksUsersSelect<false> | HooksUsersSelect<true>;
    'data-hooks': DataHooksSelect<false> | DataHooksSelect<true>;
    'field-paths': FieldPathsSelect<false> | FieldPathsSelect<true>;
    'value-hooks': ValueHooksSelect<false> | ValueHooksSelect<true>;
    'payload-locked-documents': PayloadLockedDocumentsSelect<false> | PayloadLockedDocumentsSelect<true>;
    'payload-preferences': PayloadPreferencesSelect<false> | PayloadPreferencesSelect<true>;
    'payload-migrations': PayloadMigrationsSelect<false> | PayloadMigrationsSelect<true>;
  };
  db: {
    defaultIDType: string;
  };
  globals: {
    'data-hooks-global': DataHooksGlobal;
  };
  globalsSelect: {
    'data-hooks-global': DataHooksGlobalSelect<false> | DataHooksGlobalSelect<true>;
  };
  locale: null;
  user: HooksUser & {
    collection: 'hooks-users';
  };
  jobs: {
    tasks: unknown;
    workflows: unknown;
  };
}
export interface HooksUserAuthOperations {
  forgotPassword: {
    email: string;
    password: string;
  };
  login: {
    email: string;
    password: string;
  };
  registerFirstUser: {
    email: string;
    password: string;
  };
  unlock: {
    email: string;
    password: string;
  };
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "before-change-hooks".
 */
export interface BeforeChangeHook {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "before-validate".
 */
export interface BeforeValidate {
  id: string;
  title?: string | null;
  selection?: ('a' | 'b') | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "afterOperation".
 */
export interface AfterOperation {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "context-hooks".
 */
export interface ContextHook {
  id: string;
  value?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "transforms".
 */
export interface Transform {
  id: string;
  /**
   * @minItems 2
   * @maxItems 2
   */
  transform?: [number, number] | null;
  /**
   * @minItems 2
   * @maxItems 2
   */
  localizedTransform?: [number, number] | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hooks".
 */
export interface Hook {
  id: string;
  fieldBeforeValidate?: boolean | null;
  fieldBeforeChange?: boolean | null;
  fieldAfterChange?: boolean | null;
  fieldAfterRead?: boolean | null;
  collectionBeforeValidate?: boolean | null;
  collectionBeforeChange?: boolean | null;
  collectionAfterChange?: boolean | null;
  collectionBeforeRead?: boolean | null;
  collectionAfterRead?: boolean | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nested-after-read-hooks".
 */
export interface NestedAfterReadHook {
  id: string;
  text?: string | null;
  group?: {
    array?:
      | {
          input?: string | null;
          afterRead?: string | null;
          shouldPopulate?: (string | null) | Relation;
          id?: string | null;
        }[]
      | null;
    subGroup?: {
      afterRead?: string | null;
      shouldPopulate?: (string | null) | Relation;
    };
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relations".
 */
export interface Relation {
  id: string;
  title: string;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "chaining-hooks".
 */
export interface ChainingHook {
  id: string;
  text?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hooks-users".
 */
export interface HooksUser {
  id: string;
  roles: ('admin' | 'user')[];
  afterLoginHook?: boolean | null;
  updatedAt: string;
  createdAt: string;
  email: string;
  resetPasswordToken?: string | null;
  resetPasswordExpiration?: string | null;
  salt?: string | null;
  hash?: string | null;
  loginAttempts?: number | null;
  lockUntil?: string | null;
  password?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "data-hooks".
 */
export interface DataHook {
  id: string;
  field_collectionAndField?: string | null;
  collection_beforeOperation_collection?: string | null;
  collection_beforeChange_collection?: string | null;
  collection_afterChange_collection?: string | null;
  collection_beforeRead_collection?: string | null;
  collection_afterRead_collection?: string | null;
  collection_afterOperation_collection?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "field-paths".
 */
export interface FieldPath {
  id: string;
  topLevelNamedField?: string | null;
  array?:
    | {
        fieldWithinArray?: string | null;
        nestedArray?:
          | {
              fieldWithinNestedArray?: string | null;
              id?: string | null;
            }[]
          | null;
        fieldWithinRowWithinArray?: string | null;
        id?: string | null;
      }[]
    | null;
  fieldWithinRow?: string | null;
  fieldWithinUnnamedTab?: string | null;
  fieldWithinNestedUnnamedTab?: string | null;
  namedTab?: {
    fieldWithinNamedTab?: string | null;
  };
  topLevelNamedField_beforeValidate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  topLevelNamedField_beforeChange_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  topLevelNamedField_afterRead_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  topLevelNamedField_beforeDuplicate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinArray_beforeValidate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinArray_beforeChange_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinArray_afterRead_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinArray_beforeDuplicate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNestedArray_beforeValidate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNestedArray_beforeChange_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNestedArray_afterRead_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNestedArray_beforeDuplicate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinRowWithinArray_beforeValidate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinRowWithinArray_beforeChange_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinRowWithinArray_afterRead_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinRowWithinArray_beforeDuplicate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinRow_beforeValidate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinRow_beforeChange_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinRow_afterRead_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinRow_beforeDuplicate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinUnnamedTab_beforeValidate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinUnnamedTab_beforeChange_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinUnnamedTab_afterRead_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinUnnamedTab_beforeDuplicate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNestedUnnamedTab_beforeValidate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNestedUnnamedTab_beforeChange_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNestedUnnamedTab_afterRead_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNestedUnnamedTab_beforeDuplicate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNamedTab_beforeValidate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNamedTab_beforeChange_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNamedTab_afterRead_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  fieldWithinNamedTab_beforeDuplicate_FieldPaths?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "value-hooks".
 */
export interface ValueHook {
  id: string;
  slug?: string | null;
  beforeValidate_value?: string | null;
  beforeChange_value?: string | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents".
 */
export interface PayloadLockedDocument {
  id: string;
  document?:
    | ({
        relationTo: 'before-change-hooks';
        value: string | BeforeChangeHook;
      } | null)
    | ({
        relationTo: 'before-validate';
        value: string | BeforeValidate;
      } | null)
    | ({
        relationTo: 'afterOperation';
        value: string | AfterOperation;
      } | null)
    | ({
        relationTo: 'context-hooks';
        value: string | ContextHook;
      } | null)
    | ({
        relationTo: 'transforms';
        value: string | Transform;
      } | null)
    | ({
        relationTo: 'hooks';
        value: string | Hook;
      } | null)
    | ({
        relationTo: 'nested-after-read-hooks';
        value: string | NestedAfterReadHook;
      } | null)
    | ({
        relationTo: 'chaining-hooks';
        value: string | ChainingHook;
      } | null)
    | ({
        relationTo: 'relations';
        value: string | Relation;
      } | null)
    | ({
        relationTo: 'hooks-users';
        value: string | HooksUser;
      } | null)
    | ({
        relationTo: 'data-hooks';
        value: string | DataHook;
      } | null)
    | ({
        relationTo: 'field-paths';
        value: string | FieldPath;
      } | null)
    | ({
        relationTo: 'value-hooks';
        value: string | ValueHook;
      } | null);
  globalSlug?: string | null;
  user: {
    relationTo: 'hooks-users';
    value: string | HooksUser;
  };
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences".
 */
export interface PayloadPreference {
  id: string;
  user: {
    relationTo: 'hooks-users';
    value: string | HooksUser;
  };
  key?: string | null;
  value?:
    | {
        [k: string]: unknown;
      }
    | unknown[]
    | string
    | number
    | boolean
    | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations".
 */
export interface PayloadMigration {
  id: string;
  name?: string | null;
  batch?: number | null;
  updatedAt: string;
  createdAt: string;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "before-change-hooks_select".
 */
export interface BeforeChangeHooksSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "before-validate_select".
 */
export interface BeforeValidateSelect<T extends boolean = true> {
  title?: T;
  selection?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "afterOperation_select".
 */
export interface AfterOperationSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "context-hooks_select".
 */
export interface ContextHooksSelect<T extends boolean = true> {
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "transforms_select".
 */
export interface TransformsSelect<T extends boolean = true> {
  transform?: T;
  localizedTransform?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hooks_select".
 */
export interface HooksSelect<T extends boolean = true> {
  fieldBeforeValidate?: T;
  fieldBeforeChange?: T;
  fieldAfterChange?: T;
  fieldAfterRead?: T;
  collectionBeforeValidate?: T;
  collectionBeforeChange?: T;
  collectionAfterChange?: T;
  collectionBeforeRead?: T;
  collectionAfterRead?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "nested-after-read-hooks_select".
 */
export interface NestedAfterReadHooksSelect<T extends boolean = true> {
  text?: T;
  group?:
    | T
    | {
        array?:
          | T
          | {
              input?: T;
              afterRead?: T;
              shouldPopulate?: T;
              id?: T;
            };
        subGroup?:
          | T
          | {
              afterRead?: T;
              shouldPopulate?: T;
            };
      };
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "chaining-hooks_select".
 */
export interface ChainingHooksSelect<T extends boolean = true> {
  text?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "relations_select".
 */
export interface RelationsSelect<T extends boolean = true> {
  title?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "hooks-users_select".
 */
export interface HooksUsersSelect<T extends boolean = true> {
  roles?: T;
  afterLoginHook?: T;
  updatedAt?: T;
  createdAt?: T;
  email?: T;
  resetPasswordToken?: T;
  resetPasswordExpiration?: T;
  salt?: T;
  hash?: T;
  loginAttempts?: T;
  lockUntil?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "data-hooks_select".
 */
export interface DataHooksSelect<T extends boolean = true> {
  field_collectionAndField?: T;
  collection_beforeOperation_collection?: T;
  collection_beforeChange_collection?: T;
  collection_afterChange_collection?: T;
  collection_beforeRead_collection?: T;
  collection_afterRead_collection?: T;
  collection_afterOperation_collection?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "field-paths_select".
 */
export interface FieldPathsSelect<T extends boolean = true> {
  topLevelNamedField?: T;
  array?:
    | T
    | {
        fieldWithinArray?: T;
        nestedArray?:
          | T
          | {
              fieldWithinNestedArray?: T;
              id?: T;
            };
        fieldWithinRowWithinArray?: T;
        id?: T;
      };
  fieldWithinRow?: T;
  fieldWithinUnnamedTab?: T;
  fieldWithinNestedUnnamedTab?: T;
  namedTab?:
    | T
    | {
        fieldWithinNamedTab?: T;
      };
  topLevelNamedField_beforeValidate_FieldPaths?: T;
  topLevelNamedField_beforeChange_FieldPaths?: T;
  topLevelNamedField_afterRead_FieldPaths?: T;
  topLevelNamedField_beforeDuplicate_FieldPaths?: T;
  fieldWithinArray_beforeValidate_FieldPaths?: T;
  fieldWithinArray_beforeChange_FieldPaths?: T;
  fieldWithinArray_afterRead_FieldPaths?: T;
  fieldWithinArray_beforeDuplicate_FieldPaths?: T;
  fieldWithinNestedArray_beforeValidate_FieldPaths?: T;
  fieldWithinNestedArray_beforeChange_FieldPaths?: T;
  fieldWithinNestedArray_afterRead_FieldPaths?: T;
  fieldWithinNestedArray_beforeDuplicate_FieldPaths?: T;
  fieldWithinRowWithinArray_beforeValidate_FieldPaths?: T;
  fieldWithinRowWithinArray_beforeChange_FieldPaths?: T;
  fieldWithinRowWithinArray_afterRead_FieldPaths?: T;
  fieldWithinRowWithinArray_beforeDuplicate_FieldPaths?: T;
  fieldWithinRow_beforeValidate_FieldPaths?: T;
  fieldWithinRow_beforeChange_FieldPaths?: T;
  fieldWithinRow_afterRead_FieldPaths?: T;
  fieldWithinRow_beforeDuplicate_FieldPaths?: T;
  fieldWithinUnnamedTab_beforeValidate_FieldPaths?: T;
  fieldWithinUnnamedTab_beforeChange_FieldPaths?: T;
  fieldWithinUnnamedTab_afterRead_FieldPaths?: T;
  fieldWithinUnnamedTab_beforeDuplicate_FieldPaths?: T;
  fieldWithinNestedUnnamedTab_beforeValidate_FieldPaths?: T;
  fieldWithinNestedUnnamedTab_beforeChange_FieldPaths?: T;
  fieldWithinNestedUnnamedTab_afterRead_FieldPaths?: T;
  fieldWithinNestedUnnamedTab_beforeDuplicate_FieldPaths?: T;
  fieldWithinNamedTab_beforeValidate_FieldPaths?: T;
  fieldWithinNamedTab_beforeChange_FieldPaths?: T;
  fieldWithinNamedTab_afterRead_FieldPaths?: T;
  fieldWithinNamedTab_beforeDuplicate_FieldPaths?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "value-hooks_select".
 */
export interface ValueHooksSelect<T extends boolean = true> {
  slug?: T;
  beforeValidate_value?: T;
  beforeChange_value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-locked-documents_select".
 */
export interface PayloadLockedDocumentsSelect<T extends boolean = true> {
  document?: T;
  globalSlug?: T;
  user?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-preferences_select".
 */
export interface PayloadPreferencesSelect<T extends boolean = true> {
  user?: T;
  key?: T;
  value?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "payload-migrations_select".
 */
export interface PayloadMigrationsSelect<T extends boolean = true> {
  name?: T;
  batch?: T;
  updatedAt?: T;
  createdAt?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "data-hooks-global".
 */
export interface DataHooksGlobal {
  id: string;
  field_globalAndField?: string | null;
  global_beforeChange_global?: string | null;
  global_afterChange_global?: string | null;
  global_beforeRead_global?: string | null;
  global_afterRead_global?: string | null;
  updatedAt?: string | null;
  createdAt?: string | null;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "data-hooks-global_select".
 */
export interface DataHooksGlobalSelect<T extends boolean = true> {
  field_globalAndField?: T;
  global_beforeChange_global?: T;
  global_afterChange_global?: T;
  global_beforeRead_global?: T;
  global_afterRead_global?: T;
  updatedAt?: T;
  createdAt?: T;
  globalType?: T;
}
/**
 * This interface was referenced by `Config`'s JSON-Schema
 * via the `definition` "auth".
 */
export interface Auth {
  [k: string]: unknown;
}


declare module 'payload' {
  // @ts-ignore 
  export interface GeneratedTypes extends Config {}
}