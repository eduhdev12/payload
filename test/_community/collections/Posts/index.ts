import type { CollectionConfig } from 'payload'
export const contentfulDefaultFields: CollectionConfig['fields'] = [
  {
    name: 'isFromContentful',
    type: 'checkbox',
    label: 'Is From Contentful (migration use only)',
    hidden: true,
  },
  {
    name: 'noIndex',
    type: 'checkbox',
    label: 'No Index',
  },
  {
    name: 'originalContentfulId',
    type: 'text',
    label: 'The original contentful ID of this item (migration use only)',
  },
]

export const ChangelogPosts: CollectionConfig = {
  slug: 'changelog-posts',
  admin: {
    useAsTitle: 'title',
  },
  versions: {
    drafts: true,
    maxPerDoc: 0, // Removes the limit on the number of versions we can store
  },
  access: {
    read: () => true,
    create: () => true,
    update: () => true,
    delete: () => true,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      label: 'Title',
      required: true,
      localized: true,
    },
    {
      name: 'slug',
      type: 'text',
      label: 'Slug',
      required: true,
      index: true,
    },
    {
      name: 'publishDate',
      type: 'date',
      label: 'Publish Date',
      required: true,
    },
    {
      name: 'author',
      type: 'relationship',
      label: 'Author',
      required: true,
      relationTo: 'authors',
      hasMany: true,
    },
    {
      name: 'featuredImage',
      type: 'upload',
      label: 'Featured Image',
      required: true,
      relationTo: 'media',
    },
    {
      name: 'content',
      type: 'richText',
      label: 'Content',
      required: true,
      localized: true,
    },
    ...contentfulDefaultFields,
  ],
}
