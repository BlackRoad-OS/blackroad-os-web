import { defineDocumentType, makeSource, type ComputedFields } from 'contentlayer/source-files';

const computedFields = {
  slug: { type: 'string', resolve: (doc: any) => doc._raw.flattenedPath },
  slugAsParams: {
    type: 'string',
    resolve: (doc: any) => doc._raw.flattenedPath.replace(/^docs\//, ''),
  },
  url: {
    type: 'string',
    resolve: (doc: any) => `/docs/${doc._raw.flattenedPath.replace(/^docs\//, '')}`,
  },
} satisfies ComputedFields;

export const Doc = defineDocumentType(() => ({
  name: 'Doc',
  filePathPattern: `docs/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields,
}));

export const BlogPost = defineDocumentType(() => ({
  name: 'BlogPost',
  filePathPattern: `blog/**/*.mdx`,
  contentType: 'mdx',
  fields: {
    title: { type: 'string', required: true },
    description: { type: 'string', required: true },
  },
  computedFields,
}));

export default makeSource({
  contentDirPath: 'content',
  documentTypes: [Doc, BlogPost],
});
