import { auravue } from './auravue';
import { checkpoint } from './checkpoint';
import { cloud } from './cloud';

export type { Project } from './types';

export const PROJECTS = [auravue, checkpoint, cloud];

export function getProject(slug: string) {
  return PROJECTS.find((project) => project.slug === slug);
}
