'use client'

import type { Column } from 'payload'

import React from 'react'

import './index.scss'
import { ORDER_FIELD_NAME } from '../../utilities/renderTable.js'
import { DraggableSortableItem } from '../DraggableSortable/DraggableSortableItem/index.js'
import { DraggableSortable } from '../DraggableSortable/index.js'

const baseClass = 'table'

export type Props = {
  readonly appearance?: 'condensed' | 'default'
  readonly columns?: Column[]
  readonly data: Record<string, unknown>[]
}

export const Table: React.FC<Props> = ({ appearance, columns, data: initialData }) => {
  // Convert data to state to handle optimistic updates
  const [data, setData] = React.useState(initialData)

  const activeColumns = columns?.filter((col) => col?.active)

  if (!activeColumns || activeColumns.length === 0) {
    return <div>No columns selected</div>
  }

  const handleDragEnd = async ({ moveFromIndex, moveToIndex }) => {
    if (moveFromIndex === moveToIndex) {
      return
    }

    const movedId = data[moveFromIndex].id as string
    const beforeId = moveToIndex > 0 ? (data[moveToIndex - 1]?.id as string) : undefined
    const afterId = moveToIndex < data.length - 1 ? (data[moveToIndex]?.id as string) : undefined

    // Store the original data for rollback
    const previousData = [...data]

    // Optimistically update the UI
    setData((currentData) => {
      const newData = [...currentData]
      const beforeOrder = newData[moveToIndex - 1][ORDER_FIELD_NAME]
      console.log('beforeOrder', beforeOrder)
      newData[moveFromIndex] = {
        ...newData[moveFromIndex],
        [ORDER_FIELD_NAME]: `${beforeOrder}_pending`,
      }
      return newData
    })

    try {
      // Assuming we're in the context of a collection
      const collectionSlug = window.location.pathname.split('/').filter(Boolean)[2]
      const response = await fetch(`/api/${collectionSlug}/reorder`, {
        body: JSON.stringify({
          betweenIds: [beforeId, afterId],
          docIds: [movedId],
        }),
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'POST',
      })

      if (!response.ok) {
        throw new Error('Failed to reorder')
      }
    } catch (error) {
      console.error('Error reordering:', error)
      // Rollback to previous state if the request fails
      setData(previousData)
      // Optionally show an error notification
    }
  }

  const rowIds = data.map((row) => row.id || String(Math.random())) as string[]

  return (
    <div
      className={[baseClass, appearance && `${baseClass}--appearance-${appearance}`]
        .filter(Boolean)
        .join(' ')}
    >
      <DraggableSortable ids={rowIds} onDragEnd={handleDragEnd}>
        <table cellPadding="0" cellSpacing="0">
          <thead>
            <tr>
              {activeColumns.map((col, i) => (
                <th id={`heading-${col.accessor}`} key={i}>
                  {col.Heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, rowIndex) => (
              <DraggableSortableItem id={rowIds[rowIndex]} key={rowIds[rowIndex]}>
                {({ attributes, listeners, setNodeRef, transform, transition }) => (
                  <tr
                    className={`row-${rowIndex + 1}`}
                    ref={setNodeRef}
                    style={{
                      transform,
                      transition,
                    }}
                  >
                    {activeColumns.map((col, colIndex) => {
                      const { accessor } = col
                      if (accessor === '_dragHandle') {
                        return (
                          <td className={`cell-${accessor}`} key={colIndex}>
                            <div {...attributes} {...listeners}>
                              {col.renderedCells[rowIndex]}
                            </div>
                          </td>
                        )
                      }
                      return (
                        <td className={`cell-${accessor}`} key={colIndex}>
                          {col.renderedCells[rowIndex]}
                        </td>
                      )
                    })}
                  </tr>
                )}
              </DraggableSortableItem>
            ))}
          </tbody>
        </table>
      </DraggableSortable>
    </div>
  )
}
