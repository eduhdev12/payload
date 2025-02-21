import type { Config } from '../config/types.js'
import type { Field } from '../fields/config/types.js'

import { fieldAffectsData } from '../fields/config/types.js'

const operations = ['delete', 'read', 'update'] as const

export const getConstraints = (config: Config): Field => ({
  name: 'access',
  type: 'group',
  fields: operations.map((operation) => ({
    name: operation,
    type: 'group',
    fields: [
      {
        name: 'constraint',
        type: 'select',
        options: [
          {
            label: 'Everyone',
            value: 'everyone',
          },
          {
            label: 'Only Me',
            value: 'onlyMe',
          },
          {
            label: 'Specific Users',
            value: 'specificUsers',
          },
          ...(config?.admin?.sharedListFilters?.accessOptions?.[operation]?.map((option) => ({
            label: option.label,
            value: option.value,
          })) || []),
        ],
      },
      {
        name: 'users',
        type: 'relationship',
        admin: {
          condition: (data) => Boolean(data?.access?.[operation]?.constraint === 'specificUsers'),
        },
        hasMany: true,
        hooks: {
          beforeChange: [
            ({ data, req }) => {
              if (data?.access?.[operation]?.constraint === 'onlyMe') {
                if (req.user) {
                  return [req.user.id]
                }
              }

              return data?.access?.[operation]?.users
            },
          ],
        },
        relationTo: 'users',
      },
      ...(config.admin?.sharedListFilters?.accessOptions?.[operation]?.reduce((acc, option) => {
        option.fields.forEach((field, index) => {
          acc.push({ ...field })

          if (fieldAffectsData(field)) {
            acc[index].admin = {
              ...(acc[index]?.admin || {}),
              condition: (data) => Boolean(data?.access?.[operation]?.constraint === option.value),
            }
          }
        })

        return acc
      }, [] as Field[]) || []),
    ],
  })),
})
