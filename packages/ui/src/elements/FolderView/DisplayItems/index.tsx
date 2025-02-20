'use client'

import type { GetFolderDataResult } from 'payload/shared'

import { useRouter } from 'next/navigation.js'
import React from 'react'

import type { FolderContextValue } from '../../../providers/Folders/index.js'

import { useConfig } from '../../../providers/Config/index.js'
import { FolderFileCard } from '../FolderFileCard/index.js'
import { FolderFileGrid } from '../FolderFileGrid/index.js'
import { FolderFileRow } from '../FolderFileRow/index.js'
import { SimpleTable, TableHeader } from '../SimpleTable/index.js'

const baseClass = 'displayed-items'

const getShiftSelection = ({
  selectFromIndex,
  selectToIndex,
}: {
  selectFromIndex: number
  selectToIndex: number
}): Set<number> => {
  if (selectFromIndex === null || selectFromIndex === undefined) {
    return new Set([selectToIndex])
  }

  const start = Math.min(selectToIndex, selectFromIndex)
  const end = Math.max(selectToIndex, selectFromIndex)
  const rangeSelection = new Set(
    Array.from({ length: Math.max(start, end) + 1 }, (_, i) => i).filter((index) => {
      return index >= start && index <= end
    }),
  )
  return rangeSelection
}

const getMetaSelection = ({
  selectedIndexes,
  toggleIndex,
}: {
  selectedIndexes: Set<number>
  toggleIndex: number
}): Set<number> => {
  if (selectedIndexes.has(toggleIndex)) {
    selectedIndexes.delete(toggleIndex)
  } else {
    selectedIndexes.add(toggleIndex)
  }
  return selectedIndexes
}

type RowItemEventData = { id: number | string; index: number; relationTo: string }
type Props = {
  readonly allowMultiSelection?: boolean
  readonly disabledFolderIDs?: (number | string)[]
  readonly isMovingItems: boolean
  readonly RenderDocumentActionGroup?: (args: {
    document: GetFolderDataResult['items'][number]
    index: number
  }) => React.ReactNode
  readonly RenderSubfolderActionGroup?: (args: {
    index: number
    subfolder: GetFolderDataResult['items'][number]
  }) => React.ReactNode
  readonly viewType: 'grid' | 'list'
} & Pick<
  FolderContextValue,
  | 'collectionUseAsTitles'
  | 'documents'
  | 'folderCollectionSlug'
  | 'lastSelectedIndex'
  | 'selectedIndexes'
  | 'setFolderID'
  | 'setLastSelectedIndex'
  | 'setSelectedIndexes'
  | 'subfolders'
>
export function DisplayItems(props: Props) {
  const {
    allowMultiSelection = true,
    collectionUseAsTitles,
    disabledFolderIDs = [],
    documents = [],
    folderCollectionSlug,
    isMovingItems,
    lastSelectedIndex,
    RenderDocumentActionGroup,
    RenderSubfolderActionGroup,
    selectedIndexes,
    setFolderID,
    setLastSelectedIndex,
    setSelectedIndexes,
    subfolders = [],
    viewType,
  } = props
  // move all of these to props
  const router = useRouter()
  const { config } = useConfig()

  const [focusedRowIndex, setFocusedRowIndex] = React.useState<number>()

  const totalCount = subfolders.length + documents.length || 0

  const lastClickTime = React.useRef(0)

  const navigateAfterClick = React.useCallback(
    async ({ collectionSlug, docID }: { collectionSlug: string; docID: number | string }) => {
      if (collectionSlug === folderCollectionSlug) {
        await setFolderID({ folderID: docID })
      } else if (collectionSlug) {
        router.push(`${config.routes.admin}/collections/${collectionSlug}/${docID}`)
      }
    },
    [setFolderID, folderCollectionSlug, router, config.routes.admin],
  )

  const onItemKeyPress = React.useCallback(
    async ({
      event: e,
      item,
    }: {
      event: React.KeyboardEvent
      item: RowItemEventData
    }): Promise<void> => {
      const { id, index: itemIndex, relationTo } = item
      const isShiftPressed = e.shiftKey
      const isCtrlPressed = e.ctrlKey || e.metaKey
      let newSelectedIndexes: Set<number> = selectedIndexes
      let shouldNavigateAfterClick: boolean = false

      switch (e.code) {
        case 'ArrowDown': {
          e.preventDefault()
          const nextIndex = Math.min(itemIndex + 1, totalCount - 1)
          setFocusedRowIndex(nextIndex)

          if (isCtrlPressed) {
            break
          }

          if (allowMultiSelection && isShiftPressed) {
            newSelectedIndexes = getShiftSelection({
              selectFromIndex: Math.min(lastSelectedIndex, totalCount),
              selectToIndex: Math.min(nextIndex, totalCount),
            })
          } else {
            setLastSelectedIndex(nextIndex)
            newSelectedIndexes = new Set([nextIndex])
          }
          break
        }
        case 'ArrowUp': {
          e.preventDefault()
          const prevIndex = Math.max(itemIndex - 1, 0)
          setFocusedRowIndex(prevIndex)

          if (isCtrlPressed) {
            break
          }

          if (allowMultiSelection && isShiftPressed) {
            newSelectedIndexes = getShiftSelection({
              selectFromIndex: lastSelectedIndex,
              selectToIndex: prevIndex,
            })
          } else {
            setLastSelectedIndex(prevIndex)
            newSelectedIndexes = new Set([prevIndex])
          }
          break
        }
        case 'Enter': {
          if (selectedIndexes.size === 1) {
            newSelectedIndexes = new Set([])
            setFocusedRowIndex(undefined)
            shouldNavigateAfterClick = true
          }
          break
        }
        case 'Escape': {
          setFocusedRowIndex(undefined)
          setSelectedIndexes(new Set([]))
          newSelectedIndexes = new Set([])
          break
        }
        case 'KeyA': {
          if (allowMultiSelection && isCtrlPressed) {
            e.preventDefault()
            setFocusedRowIndex(totalCount - 1)
            newSelectedIndexes = new Set(Array.from({ length: totalCount }, (_, i) => i))
          }
          break
        }
        case 'Space': {
          if (allowMultiSelection && isShiftPressed) {
            e.preventDefault()
            newSelectedIndexes = getMetaSelection({
              selectedIndexes: newSelectedIndexes,
              toggleIndex: itemIndex,
            })
            setLastSelectedIndex(itemIndex)
          }
          break
        }
        case 'Tab': {
          if (allowMultiSelection && isShiftPressed) {
            const prevIndex = itemIndex - 1
            if (prevIndex < 0 && newSelectedIndexes.size > 0) {
              setFocusedRowIndex(prevIndex)
            }
          } else {
            const nextIndex = itemIndex + 1
            if (nextIndex === totalCount && newSelectedIndexes.size > 0) {
              setFocusedRowIndex(totalCount - 1)
            }
          }
          break
        }
      }

      setSelectedIndexes(newSelectedIndexes)

      if (shouldNavigateAfterClick) {
        await navigateAfterClick({ collectionSlug: relationTo, docID: id })
      }
    },
    [
      lastSelectedIndex,
      totalCount,
      setSelectedIndexes,
      setLastSelectedIndex,
      selectedIndexes,
      navigateAfterClick,
      allowMultiSelection,
    ],
  )

  const onItemClick = React.useCallback(
    async ({ event, item }: { event: React.MouseEvent; item: RowItemEventData }): Promise<void> => {
      event.preventDefault()
      let shouldNavigateAfterClick: boolean = false

      const { id, index: itemIndex, relationTo } = item
      const isCtrlPressed = event.ctrlKey || event.metaKey
      const isShiftPressed = event.shiftKey
      let newSelectedIndexes = new Set(selectedIndexes)

      if (allowMultiSelection && isCtrlPressed) {
        newSelectedIndexes = getMetaSelection({
          selectedIndexes: newSelectedIndexes,
          toggleIndex: itemIndex,
        })
      } else if (allowMultiSelection && isShiftPressed && lastSelectedIndex !== undefined) {
        newSelectedIndexes = getShiftSelection({
          selectFromIndex: lastSelectedIndex,
          selectToIndex: itemIndex,
        })
      } else if (allowMultiSelection && event.type === 'pointermove') {
        // on drag start of an unselected item
        if (!selectedIndexes.has(itemIndex)) {
          newSelectedIndexes = new Set([itemIndex])
        }
        setLastSelectedIndex(itemIndex)
      } else {
        // Normal click - select single item
        newSelectedIndexes = new Set([itemIndex])
        const now = Date.now()
        const doubleClicked = now - lastClickTime.current < 400 && lastSelectedIndex === itemIndex
        if (doubleClicked) {
          shouldNavigateAfterClick = true
        }
        lastClickTime.current = now
        setLastSelectedIndex(itemIndex)
      }

      if (newSelectedIndexes.size === 0) {
        setFocusedRowIndex(undefined)
      } else {
        setFocusedRowIndex(itemIndex)
      }
      setSelectedIndexes(newSelectedIndexes)

      if (shouldNavigateAfterClick) {
        await navigateAfterClick({ collectionSlug: relationTo, docID: id })
      }
    },
    [
      lastSelectedIndex,
      selectedIndexes,
      setSelectedIndexes,
      setFocusedRowIndex,
      setLastSelectedIndex,
      navigateAfterClick,
      allowMultiSelection,
    ],
  )

  return (
    <>
      {viewType === 'grid' ? (
        <>
          <FolderFileGrid className={`${baseClass}__subfolders`}>
            {!subfolders || subfolders?.length === 0
              ? null
              : subfolders.map((subfolder, subfolderIndex) => {
                  const { relationTo, value } = subfolder
                  const useAsTitle = collectionUseAsTitles.has(relationTo)
                    ? collectionUseAsTitles.get(relationTo)
                    : 'id'
                  const subfolderID = typeof value === 'object' ? value?.id : value
                  const title =
                    typeof value === 'object' ? value?.[useAsTitle] || subfolderID : subfolderID
                  return (
                    <FolderFileCard
                      disabled={isMovingItems && disabledFolderIDs.includes(subfolderID)}
                      id={subfolderID}
                      isFocused={focusedRowIndex === subfolderIndex}
                      isSelected={selectedIndexes.has(subfolderIndex)}
                      isSelecting={selectedIndexes.size > 0}
                      key={subfolderID}
                      onClick={(event) => {
                        void onItemClick({
                          event,
                          item: { id: subfolderID, index: subfolderIndex, relationTo },
                        })
                      }}
                      onKeyDown={(event) => {
                        void onItemKeyPress({
                          event,
                          item: { id: subfolderID, index: subfolderIndex, relationTo },
                        })
                      }}
                      PopupActions={
                        RenderSubfolderActionGroup
                          ? RenderSubfolderActionGroup({
                              index: subfolderIndex,
                              subfolder,
                            })
                          : null
                      }
                      title={title}
                      type="folder"
                    />
                  )
                })}
          </FolderFileGrid>

          <div>
            <FolderFileGrid className={`${baseClass}__documents`}>
              {!documents || documents?.length === 0
                ? null
                : documents.map((document, documentIndex) => {
                    const { relationTo, value } = document
                    const documentID = typeof value === 'object' ? value?.id : value
                    const useAsTitle = collectionUseAsTitles.has(relationTo)
                      ? collectionUseAsTitles.get(relationTo)
                      : 'id'
                    const title =
                      typeof value === 'object' ? value[useAsTitle] || documentID : documentID
                    const previewUrl =
                      typeof value === 'object' &&
                      'mimeType' in value &&
                      'url' in value &&
                      typeof value.url === 'string'
                        ? value.url
                        : undefined
                    const adjustedIndex = documentIndex + subfolders.length
                    return (
                      <FolderFileCard
                        id={documentID}
                        isFocused={focusedRowIndex === adjustedIndex}
                        isSelected={selectedIndexes.has(adjustedIndex)}
                        isSelecting={selectedIndexes.size > 0}
                        key={documentID}
                        onClick={(event) => {
                          void onItemClick({
                            event,
                            item: { id: documentID, index: adjustedIndex, relationTo },
                          })
                        }}
                        onKeyDown={(event) => {
                          void onItemKeyPress({
                            event,
                            item: { id: documentID, index: adjustedIndex, relationTo },
                          })
                        }}
                        PopupActions={
                          RenderDocumentActionGroup
                            ? RenderDocumentActionGroup({
                                document,
                                index: adjustedIndex,
                              })
                            : null
                        }
                        previewUrl={previewUrl}
                        title={title}
                        type="file"
                      />
                    )
                  })}
            </FolderFileGrid>
          </div>
        </>
      ) : (
        <SimpleTable
          headerCells={[
            <TableHeader key={'name'}>Title</TableHeader>,
            <TableHeader key={'createdAt'}>Created At</TableHeader>,
            <TableHeader key={'updatedAt'}>Updated At</TableHeader>,
          ]}
          tableRows={[
            ...subfolders.map((subfolder, subfolderIndex) => {
              const { relationTo, value } = subfolder
              const subfolderID = typeof value === 'object' ? value?.id : value
              const useAsTitle = collectionUseAsTitles.has(relationTo)
                ? collectionUseAsTitles.get(relationTo)
                : 'id'
              const title =
                typeof value === 'object' ? value?.[useAsTitle] || subfolderID : subfolderID
              return (
                <FolderFileRow
                  // @ts-expect-error
                  columns={[title, value?.createdAt, value?.updatedAt]}
                  id={subfolderID}
                  isDragging={isMovingItems}
                  isDroppable
                  isFocused={focusedRowIndex === subfolderIndex}
                  isSelected={selectedIndexes.has(subfolderIndex)}
                  isSelecting={selectedIndexes.size > 0}
                  key={subfolderID}
                  onClick={(event) => {
                    void onItemClick({
                      event,
                      item: { id: subfolderID, index: subfolderIndex, relationTo },
                    })
                  }}
                  onKeyDown={(event) => {
                    void onItemKeyPress({
                      event,
                      item: { id: subfolderID, index: subfolderIndex, relationTo },
                    })
                  }}
                  type="folder"
                />
              )
            }),

            ...documents.map((document, documentIndex) => {
              const { relationTo, value } = document
              const documentID = typeof value === 'object' ? value?.id : value
              const useAsTitle = collectionUseAsTitles.has(relationTo)
                ? collectionUseAsTitles.get(relationTo)
                : 'id'
              const title = (
                typeof value === 'object' ? value?.[useAsTitle] || documentID : documentID
              ) as string
              const adjustedIndex = documentIndex + subfolders.length
              return (
                <FolderFileRow
                  // @ts-expect-error
                  columns={[title, value.createdAt, value.updatedAt]}
                  id={documentID}
                  isDragging={isMovingItems}
                  isFocused={focusedRowIndex === adjustedIndex}
                  isSelected={selectedIndexes.has(adjustedIndex)}
                  isSelecting={selectedIndexes.size > 0}
                  key={documentID}
                  onClick={(event) => {
                    void onItemClick({
                      event,
                      item: { id: documentID, index: adjustedIndex, relationTo },
                    })
                  }}
                  onKeyDown={(event) => {
                    void onItemKeyPress({
                      event,
                      item: { id: documentID, index: adjustedIndex, relationTo },
                    })
                  }}
                  type="file"
                />
              )
            }),
          ]}
        />
      )}
    </>
  )
}
