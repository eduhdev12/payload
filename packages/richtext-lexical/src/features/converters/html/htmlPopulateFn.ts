import { createLocalReq, type Payload, type PayloadRequest } from 'payload'

import type { HTMLPopulateFn } from './types.js'

import { populate } from '../../../populateGraphQL/populate.js'

export const getHTMLPopulateFn: (
  args: {
    currentDepth: number
    depth: number
    draft: boolean
    overrideAccess: boolean

    showHiddenFields: boolean
  } & (
    | {
        /**
         * This payload property will only be used if req is undefined.
         */
        payload: Payload
        /**
         * When the converter is called, req CAN be passed in depending on where it's run.
         * If this is undefined and config is passed through, lexical will create a new req object for you.
         */
        req?: never
      }
    | {
        /**
         * This payload property will only be used if req is undefined.
         */
        payload?: never
        /**
         * When the converter is called, req CAN be passed in depending on where it's run.
         * If this is undefined and config is passed through, lexical will create a new req object for you.
         */
        req: PayloadRequest
      }
  ),
) => Promise<HTMLPopulateFn> = async ({
  currentDepth,
  depth,
  draft,
  overrideAccess,
  payload,
  req,
  showHiddenFields,
}) => {
  let reqToUse: PayloadRequest | undefined = req
  if (req === undefined && payload) {
    reqToUse = await createLocalReq({}, payload)
  }

  if (!reqToUse) {
    throw new Error('No req or payload provided')
  }

  const populateFn: HTMLPopulateFn = async ({ id, collectionSlug, select }) => {
    const dataContainer: {
      value?: any
    } = {}

    await populate({
      id,
      collectionSlug,
      currentDepth,
      data: dataContainer,
      depth,
      draft,
      key: 'value',
      overrideAccess,
      req: reqToUse,
      select,
      showHiddenFields,
    })

    return dataContainer.value
  }

  return populateFn
}
