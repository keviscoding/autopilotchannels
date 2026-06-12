import type { ComponentType } from 'react';
import Welcome from './Welcome';
import Module01 from './Module01';
import Module02 from './Module02';
import Module03 from './Module03';
import Module04 from './Module04';
import Module05 from './Module05';
import Module06 from './Module06';
import Module07 from './Module07';
import Module08 from './Module08';
import Module09 from './Module09';
import Module10 from './Module10';
import Module11 from './Module11';
import Module12 from './Module12';
import Module13 from './Module13';
import Module14 from './Module14';
import Module15 from './Module15';
import Module16 from './Module16';
import Module17 from './Module17';
import Module18 from './Module18';
import Module19 from './Module19';
import Module20 from './Module20';
import Module21 from './Module21';
import Module22 from './Module22';

export interface ModuleEntry {
  id: string;          // url slug
  number: number;
  title: string;
  component?: ComponentType;  // present = written & available
}

export const modules: ModuleEntry[] = [
  { id: 'start-here', number: 0, title: 'Read this first', component: Welcome },
  { id: 'introduction', number: 1, title: 'How the game is actually shaped', component: Module01 },
  { id: 'profitable-niches', number: 2, title: 'Reading the market', component: Module02 },
  { id: 'evaluating-niches', number: 3, title: 'Protecting the asset, and committing', component: Module03 },
  { id: 'testing', number: 4, title: 'Testing without fooling yourself', component: Module04 },
  { id: 'content-formats', number: 5, title: 'Formats are how you beat saturation', component: Module05 },
  { id: 'goals-research', number: 6, title: 'Goals, the why, and reconnaissance', component: Module06 },
  { id: 'channel-setup', number: 7, title: 'Setting up the channel', component: Module07 },
  { id: 'team', number: 8, title: 'Building and managing your team', component: Module08 },
  { id: 'team-automation', number: 9, title: 'Running the team', component: Module09 },
  { id: 'topic-selection', number: 10, title: 'Choosing topics that are already proven', component: Module10 },
  { id: 'scripts', number: 11, title: 'Scripts: structure, hook, and re-hook', component: Module11 },
  { id: 'voice-overs', number: 12, title: 'Voice overs: directing attention with sound', component: Module12 },
  { id: 'editing', number: 13, title: 'Editing: where attention is won or lost', component: Module13 },
  { id: 'storytelling', number: 14, title: 'The art of storytelling', component: Module14 },
  { id: 'thumbnails', number: 15, title: 'Designing thumbnails that get clicked', component: Module15 },
  { id: 'titles', number: 16, title: 'Crafting compelling titles', component: Module16 },
  { id: 'optimizing', number: 17, title: 'Optimizing and publishing', component: Module17 },
  { id: 'algorithm', number: 18, title: 'Understanding the algorithm', component: Module18 },
  { id: 'shorts', number: 19, title: 'Shorts and community posts', component: Module19 },
  { id: 'finances', number: 20, title: 'Managing finances and admin', component: Module20 },
  { id: 'copyright', number: 21, title: "Navigating YouTube's copyright system", component: Module21 },
  { id: 'self-learning', number: 22, title: 'Teaching yourself from here', component: Module22 },
];
