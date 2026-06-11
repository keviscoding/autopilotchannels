import type { ComponentType } from 'react';
import Module01 from './Module01';

export interface ModuleEntry {
  id: string;          // url slug
  number: number;
  title: string;
  component?: ComponentType;  // present = written & available
}

export const modules: ModuleEntry[] = [
  { id: 'introduction', number: 1, title: 'How the game is actually shaped', component: Module01 },
  { id: 'profitable-niches', number: 2, title: 'Discovering profitable niches' },
  { id: 'evaluating-niches', number: 3, title: 'Evaluating and starting niches' },
  { id: 'testing', number: 4, title: 'Testing channels and niches' },
  { id: 'content-formats', number: 5, title: 'Leveraging content formats' },
  { id: 'goals-research', number: 6, title: 'Goal setting and research' },
  { id: 'channel-setup', number: 7, title: 'Setting up your channel' },
  { id: 'team', number: 8, title: 'Building and managing your team' },
  { id: 'team-automation', number: 9, title: 'Team automation and communication' },
  { id: 'topic-selection', number: 10, title: 'Mastering topic selection' },
  { id: 'scripts', number: 11, title: 'Crafting effective scripts' },
  { id: 'voice-overs', number: 12, title: 'Perfecting voice overs' },
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
