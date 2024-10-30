import type {
  Data,
  DocumentPreferences,
  Field,
  FormFieldWithoutComponents,
  FormStateWithoutComponents,
  PayloadRequest,
} from 'payload'

import ObjectIdImport from 'bson-objectid'
import {
  fieldAffectsData,
  fieldHasSubFields,
  fieldIsSidebar,
  getFieldPaths,
  tabHasName,
} from 'payload/shared'

// import { renderField } from '../../utilities/renderField.js'
import { getFilterOptionsQuery } from './getFilterOptionsQuery.js'
import { iterateFields } from './iterateFields.js'

const ObjectId = (ObjectIdImport.default ||
  ObjectIdImport) as unknown as typeof ObjectIdImport.default

export type AddFieldStatePromiseArgs = {
  addErrorPathToParent: (fieldPath: (number | string)[]) => void
  /**
   * if all parents are localized, then the field is localized
   */
  anyParentLocalized?: boolean
  collectionSlug?: string
  data: Data
  field: Field
  fieldIndex: number
  /**
   * You can use this to filter down to only `localized` fields that require translation (type: text, textarea, etc.). Another plugin might want to look for only `point` type fields to do some GIS function. With the filter function you can go in like a surgeon.
   */
  filter?: (args: AddFieldStatePromiseArgs) => boolean
  /**
   * Force the value of fields like arrays or blocks to be the full value instead of the length @default false
   */
  forceFullValue?: boolean
  fullData: Data
  id: number | string
  /**
   * Whether the field schema should be included in the state
   */
  includeSchema?: boolean
  /**
   * Whether to omit parent fields in the state. @default false
   */
  omitParents?: boolean
  operation: 'create' | 'update'
  parentPath: (number | string)[]
  parentSchemaPath: string[]
  passesCondition: boolean
  preferences: DocumentPreferences
  /**
   * Req is used for validation and defaultValue calculation. If you don't need validation,
   * just create your own req and pass in the locale and the user
   */
  req: PayloadRequest
  schemaPathsToRender?: string[] | true
  /**
   * Whether to skip checking the field's condition. @default false
   */
  skipConditionChecks?: boolean
  /**
   * Whether to skip validating the field. @default false
   */
  skipValidation?: boolean
  state: FormStateWithoutComponents
}

/**
 * Flattens the fields schema and fields data.
 * The output is the field path (e.g. array.0.name) mapped to a FormField object.
 */
export const addFieldStatePromise = async (args: AddFieldStatePromiseArgs): Promise<void> => {
  const {
    id,
    addErrorPathToParent: addErrorPathToParentArg,
    anyParentLocalized = false,
    collectionSlug,
    data,
    field,
    fieldIndex,
    filter,
    forceFullValue = false,
    fullData,
    includeSchema = false,
    omitParents = false,
    operation,
    parentPath,
    parentSchemaPath,
    passesCondition,
    preferences,
    req,
    schemaPathsToRender,
    skipConditionChecks = false,
    skipValidation = false,
    state,
  } = args

  const { path: fieldPath, schemaPath: fieldSchemaPath } = getFieldPaths({
    field,
    parentPath,
    parentSchemaPath,
    schemaIndex: fieldIndex,
  })

  const requiresRender =
    schemaPathsToRender &&
    (schemaPathsToRender === true || schemaPathsToRender.includes(fieldSchemaPath.join('.')))

  if (fieldAffectsData(field)) {
    const validate = field.validate

    const fieldState: FormFieldWithoutComponents = {
      errorPaths: [],
      fieldSchema: includeSchema ? field : undefined,
      initialValue: undefined,
      isSidebar: fieldIsSidebar(field),
      passesCondition,
      requiresRender,
      schemaPath: fieldSchemaPath,
      valid: true,
      value: undefined,
    }

    let validationResult: string | true = true

    if (typeof validate === 'function' && !skipValidation && passesCondition) {
      let jsonError

      if (field.type === 'json' && typeof data[field.name] === 'string') {
        try {
          JSON.parse(data[field.name])
        } catch (e) {
          jsonError = e
        }
      }

      validationResult = await validate(
        data?.[field.name] as never,
        {
          ...field,
          id,
          collectionSlug,
          data: fullData,
          jsonError,
          operation,
          preferences,
          req,
          siblingData: data,
        } as any,
      )
    }

    const addErrorPathToParent = (errorPath: (number | string)[]) => {
      if (typeof addErrorPathToParentArg === 'function') {
        addErrorPathToParentArg(errorPath)
      }

      const errorPathString = errorPath.join('.')
      if (!fieldState.errorPaths.includes(errorPathString)) {
        fieldState.errorPaths.push(errorPathString)
        fieldState.valid = false
      }
    }

    if (typeof validationResult === 'string') {
      fieldState.errorMessage = validationResult
      fieldState.valid = false
      addErrorPathToParent(fieldPath)
    } else {
      fieldState.valid = true
    }

    switch (field.type) {
      case 'array': {
        const arrayValue = Array.isArray(data[field.name]) ? data[field.name] : []

        const { promises, rows } = arrayValue.reduce(
          (acc, row, i: number) => {
            const parentPath = [...fieldPath, i]
            row.id = row?.id || new ObjectId().toHexString()

            if (!omitParents && (!filter || filter(args))) {
              state[[...parentPath, 'id'].join('.')] = {
                fieldSchema: includeSchema
                  ? field.fields.find((field) => 'name' in field && field.name === 'id')
                  : undefined,
                initialValue: row.id,
                schemaPath: [...fieldSchemaPath, 'id'],
                valid: true,
                value: row.id,
              }
            }

            acc.promises.push(
              iterateFields({
                id,
                addErrorPathToParent,
                anyParentLocalized: field.localized || anyParentLocalized,
                collectionSlug,
                data: row,
                fields: field.fields,
                filter,
                forceFullValue,
                fullData,
                includeSchema,
                omitParents,
                operation,
                parentPassesCondition: passesCondition,
                parentPath,
                parentSchemaPath: fieldSchemaPath,
                preferences,
                req,
                // If parent field requires render, all children should render
                schemaPathsToRender: requiresRender ? true : schemaPathsToRender,
                skipConditionChecks,
                skipValidation,
                state,
              }),
            )

            const collapsedRowIDs = preferences?.fields?.[fieldPath.join('.')]?.collapsed

            acc.rows.push({
              id: row.id,
              collapsed:
                collapsedRowIDs === undefined
                  ? field.admin.initCollapsed
                  : collapsedRowIDs.includes(row.id),
            })

            return acc
          },
          {
            promises: [],
            rows: [],
          },
        )

        // Wait for all promises and update fields with the results
        await Promise.all(promises)

        fieldState.rows = rows

        // Add values to field state
        if (data[field.name] === null) {
          fieldState.value = null
          fieldState.initialValue = null
        } else {
          fieldState.value = forceFullValue ? arrayValue : arrayValue.length
          fieldState.initialValue = forceFullValue ? arrayValue : arrayValue.length

          if (arrayValue.length > 0) {
            fieldState.disableFormData = true
          }
        }

        // Add field to state
        if (!omitParents && (!filter || filter(args))) {
          state[fieldPath.join('.')] = fieldState
        }

        break
      }

      case 'blocks': {
        const blocksValue = Array.isArray(data[field.name]) ? data[field.name] : []

        const { promises, rowMetadata } = blocksValue.reduce(
          (acc, row, i: number) => {
            const block = field.blocks.find((blockType) => blockType.slug === row.blockType)
            if (!block) {
              throw new Error(
                `Block with type "${row.blockType}" was found in block data, but no block with that type is defined in the config.`,
              )
            }

            const rowPath = [...fieldPath, i]
            const rowSchemaPath = [...fieldSchemaPath, block.slug]

            if (block) {
              row.id = row?.id || new ObjectId().toHexString()

              if (!omitParents && (!filter || filter(args))) {
                state[[...rowPath, 'id'].join('.')] = {
                  fieldSchema: includeSchema
                    ? block.fields.find(
                        (blockField) => 'name' in blockField && blockField.name === 'id',
                      )
                    : undefined,
                  initialValue: row.id,
                  schemaPath: [...rowSchemaPath, 'id'],
                  valid: true,
                  value: row.id,
                }

                state[[...rowPath, 'blockType'].join('.')] = {
                  fieldSchema: includeSchema
                    ? block.fields.find(
                        (blockField) => 'name' in blockField && blockField.name === 'blockType',
                      )
                    : undefined,
                  initialValue: row.blockType,
                  schemaPath: [...rowSchemaPath, 'blockType'],
                  valid: true,
                  value: row.blockType,
                }

                state[[...rowPath, 'blockName'].join('.')] = {
                  fieldSchema: includeSchema
                    ? block.fields.find(
                        (blockField) => 'name' in blockField && blockField.name === 'blockName',
                      )
                    : undefined,
                  initialValue: row.blockName,
                  schemaPath: [...rowSchemaPath, 'blockName'],
                  valid: true,
                  value: row.blockName,
                }
              }

              acc.promises.push(
                iterateFields({
                  id,
                  addErrorPathToParent,
                  anyParentLocalized: field.localized || anyParentLocalized,
                  collectionSlug,
                  data: row,
                  fields: block.fields,
                  filter,
                  forceFullValue,
                  fullData,
                  includeSchema,
                  omitParents,
                  operation,
                  parentPassesCondition: passesCondition,
                  parentPath: rowPath,
                  parentSchemaPath: rowSchemaPath,
                  preferences,
                  req,
                  // If parent field requires render, all children should render
                  schemaPathsToRender: requiresRender ? true : schemaPathsToRender,
                  skipConditionChecks,
                  skipValidation,
                  state,
                }),
              )

              const collapsedRowIDs = preferences?.fields?.[fieldPath.join('.')]?.collapsed

              acc.rowMetadata.push({
                id: row.id,
                blockType: row.blockType,
                collapsed:
                  collapsedRowIDs === undefined
                    ? field.admin.initCollapsed
                    : collapsedRowIDs.includes(row.id),
              })
            }

            return acc
          },
          {
            promises: [],
            rowMetadata: [],
          },
        )

        await Promise.all(promises)

        // Add values to field state
        if (data[field.name] === null) {
          fieldState.value = null
          fieldState.initialValue = null
        } else {
          fieldState.value = forceFullValue ? blocksValue : blocksValue.length
          fieldState.initialValue = forceFullValue ? blocksValue : blocksValue.length

          if (blocksValue.length > 0) {
            fieldState.disableFormData = true
          }
        }

        fieldState.rows = rowMetadata

        // Add field to state
        if (!omitParents && (!filter || filter(args))) {
          state[fieldPath.join('.')] = fieldState
        }

        break
      }

      case 'group': {
        if (!filter || filter(args)) {
          fieldState.disableFormData = true
          state[fieldPath.join('.')] = fieldState
        }

        await iterateFields({
          id,
          addErrorPathToParent,
          anyParentLocalized: field.localized || anyParentLocalized,
          collectionSlug,
          data: data?.[field.name] || {},
          fields: field.fields,
          filter,
          forceFullValue,
          fullData,
          includeSchema,
          omitParents,
          operation,
          parentPassesCondition: passesCondition,
          parentPath: fieldPath,
          parentSchemaPath: fieldSchemaPath,
          preferences,
          req,
          // If parent field requires render, all children should render
          schemaPathsToRender: requiresRender ? true : schemaPathsToRender,
          skipConditionChecks,
          skipValidation,
          state,
        })

        break
      }
      case 'upload':
      case 'relationship': {
        if (field.filterOptions) {
          if (typeof field.filterOptions === 'object') {
            if (typeof field.relationTo === 'string') {
              fieldState.filterOptions = {
                [field.relationTo]: field.filterOptions,
              }
            } else {
              fieldState.filterOptions = field.relationTo.reduce((acc, relation) => {
                acc[relation] = field.filterOptions
                return acc
              }, {})
            }
          }

          if (typeof field.filterOptions === 'function') {
            const query = await getFilterOptionsQuery(field.filterOptions, {
              id,
              data: fullData,
              relationTo: field.relationTo,
              siblingData: data,
              user: req.user,
            })

            fieldState.filterOptions = query
          }
        }

        if (field.hasMany) {
          const relationshipValue = Array.isArray(data[field.name])
            ? data[field.name].map((relationship) => {
                if (Array.isArray(field.relationTo)) {
                  return {
                    relationTo: relationship.relationTo,
                    value:
                      relationship.value && typeof relationship.value === 'object'
                        ? relationship.value?.id
                        : relationship.value,
                  }
                }
                if (typeof relationship === 'object' && relationship !== null) {
                  return relationship.id
                }
                return relationship
              })
            : undefined

          fieldState.value = relationshipValue
          fieldState.initialValue = relationshipValue
        } else if (Array.isArray(field.relationTo)) {
          if (
            data[field.name] &&
            typeof data[field.name] === 'object' &&
            'relationTo' in data[field.name] &&
            'value' in data[field.name]
          ) {
            const value =
              typeof data[field.name]?.value === 'object' &&
              data[field.name]?.value &&
              'id' in data[field.name].value
                ? data[field.name].value.id
                : data[field.name].value
            const relationshipValue = {
              relationTo: data[field.name]?.relationTo,
              value,
            }
            fieldState.value = relationshipValue
            fieldState.initialValue = relationshipValue
          }
        } else {
          const relationshipValue =
            data[field.name] && typeof data[field.name] === 'object' && 'id' in data[field.name]
              ? data[field.name].id
              : data[field.name]
          fieldState.value = relationshipValue
          fieldState.initialValue = relationshipValue
        }

        if (!filter || filter(args)) {
          state[fieldPath.join('.')] = fieldState
        }

        break
      }

      default: {
        fieldState.value = data[field.name]
        fieldState.initialValue = data[field.name]

        // Add field to state
        if (!filter || filter(args)) {
          state[fieldPath.join('.')] = fieldState
        }

        break
      }
    }
  } else if (fieldHasSubFields(field)) {
    // Handle field types that do not use names (row, etc)

    if (!filter || filter(args)) {
      state[fieldPath.join('.')] = {
        disableFormData: true,
        errorPaths: [],
        initialValue: undefined,
        passesCondition,
        requiresRender,
        schemaPath: fieldSchemaPath,
        valid: true,
        value: undefined,
      }
    }

    await iterateFields({
      id,
      // passthrough parent functionality
      addErrorPathToParent: addErrorPathToParentArg,
      anyParentLocalized: field.localized || anyParentLocalized,
      collectionSlug,
      data,
      fields: field.fields,
      filter,
      forceFullValue,
      fullData,
      includeSchema,
      omitParents,
      operation,
      parentPassesCondition: passesCondition,
      parentPath: fieldPath,
      parentSchemaPath: fieldSchemaPath,
      preferences,
      req,
      // If parent field requires render, all children should render
      schemaPathsToRender: requiresRender ? true : schemaPathsToRender,
      skipConditionChecks,
      skipValidation,
      state,
    })
  } else if (field.type === 'tabs') {
    const promises = field.tabs.map((tab, tabIndex) => {
      const isNamedTab = tabHasName(tab)

      const tabPaths = getFieldPaths({
        field: {
          ...tab,
          type: 'tab',
        },
        parentPath: fieldPath,
        parentSchemaPath: fieldSchemaPath,
        schemaIndex: tabIndex,
      })

      return iterateFields({
        id,
        // passthrough parent functionality
        addErrorPathToParent: addErrorPathToParentArg,
        anyParentLocalized: tab.localized || anyParentLocalized,
        collectionSlug,
        data: isNamedTab ? data?.[tab.name] || {} : data,
        fields: tab.fields,
        filter,
        forceFullValue,
        fullData,
        includeSchema,
        omitParents,
        operation,
        parentPassesCondition: passesCondition,
        parentPath: tabPaths.path,
        parentSchemaPath: tabPaths.schemaPath,
        preferences,
        req,
        // If parent field requires render, all children should render
        schemaPathsToRender: requiresRender ? true : schemaPathsToRender,
        skipConditionChecks,
        skipValidation,
        state,
      })
    })

    await Promise.all(promises)
  } else if (field.type === 'ui') {
    if (!filter || filter(args)) {
      state[fieldPath.join('.')] = {
        disableFormData: true,
        errorPaths: [],
        fieldSchema: includeSchema ? field : undefined,
        initialValue: undefined,
        isSidebar: fieldIsSidebar(field),
        passesCondition,
        requiresRender,
        schemaPath: fieldSchemaPath,
        valid: true,
        value: undefined,
      }
    }
  }
}
