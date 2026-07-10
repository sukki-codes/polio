export type ProjectContent = {
  title: string;
  tagline: string;
  challenge: string[];
  action: string[];
  result: string[];
};

export type Project = {
  slug: string;
  ko: ProjectContent;
  en: ProjectContent;
};
