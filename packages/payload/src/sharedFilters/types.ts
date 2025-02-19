import type { Field } from '../fields/config/types.js'
import type { ListPreferences } from '../preferences/types.js'
import type { Where } from '../types/index.js'

// TODO: this should just exist in `GeneratedTypes` instead
export type SharedListFilter = {
  columns: ListPreferences['columns']
  id: number | string
  title: string
  where: Where
}

export type ListFilterAccessOptions = {
  fields: Field[]
  label: string
  value: string
}[]
