import type { Information } from './types';

export const basename = import.meta.env.BASE_URL;

export const InformationPlaceholder: Information = {
  name: 'NAME',
  label: 'LABEL',
  headImg: '',
  headBgImg: '',
  githubHome: '',
  email: '',
  skillTags: ['tag1', 'tag2', 'tag3'],
  selfDescription: 'description...',
  projects: [],
  experiments: [],
};

export const DetailFinished = false;
