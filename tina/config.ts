import { defineConfig } from 'tinacms';

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD ?? process.env.VERCEL_GIT_COMMIT_REF ?? 'main';
const clientId = process.env.TINA_CLIENT_ID;
const token = process.env.TINA_TOKEN;
const searchToken = process.env.TINA_SEARCH_TOKEN;

export default defineConfig({
  branch,
  clientId,
  token,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: '',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        name: 'post',
        label: 'Articles',
        path: 'content/blog',
        fields: [
          {
            type: 'string',
            name: 'title',
            label: 'Title',
            isTitle: true,
            required: true,
          },
          {
            type: 'datetime',
            name: 'date',
            label: 'Article date',
            required: true,
          },
          {
            type: 'boolean',
            name: 'draft',
            label: 'Is this a draft?',
          },
          {
            type: 'boolean',
            name: 'featured',
            label: 'Feature article?',
          },
          {
            type: 'string',
            name: 'description',
            label: 'Description',
            required: true,
            ui: {
              component: 'textarea',
            },
          },
          {
            label: 'Tags',
            name: 'tags',
            type: 'string',
            list: true,
          },
          {
            type: 'image',
            name: 'featuredimage',
            label: 'Featured image',
          },
          {
            type: 'rich-text',
            name: 'body',
            label: 'Body',
            isBody: true,
          },
        ],
      },
    ],
  },
  search: {
    tina: {
      indexerToken: searchToken,
      stopwordLanguages: ['eng'],
    },
    indexBatchSize: 100,
    maxSearchIndexFieldLength: 100,
  },
});
