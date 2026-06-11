import type { ComponentType } from 'react';
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

export interface ModuleEntry {
  id: string;          // url slug
  number: number;
  title: string;
  component?: ComponentType;  // present = written & available
}

export const modules: ModuleEntry[] = [
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
  { id: 'editing', number: 13, title: 'Mastering video editing' },
  { id: 'storytelling', number: 14, title: 'The art of storytelling' },
  { id: 'thumbnails', number: 15, title: 'Designing thumbnails that get clicked' },
  { id: 'titles', number: 16, title: 'Crafting compelling titles' },
  { id: 'optimizing', number: 17, title: 'Optimizing and testing videos' },
  { id: 'algorithm', number: 18, title: 'Understanding the algorithm' },
  { id: 'shorts', number: 19, title: 'Shorts and community posts' },
  { id: 'finances', number: 20, title: 'Managing finances and admin' },
  { id: 'copyright', number: 21, title: "Navigating YouTube's copyright system" },
  { id: 'self-learning', number: 22, title: 'Teaching yourself from here' },
];
