type Project = {
  projName: string;
  tags: string[];
  description: string;
  imgSrc?: string;
  link?: string;
  isWorking?: boolean;
  isPrivate?: boolean;
};

export type Information = {
  name: string;
  label: string;
  headImg: string;
  headBgImg: string;
  githubHome: string;
  email: string;
  skillTags: string[];
  selfDescription: string;
  projects: Project[];
  experiments: Project[];
};
