import { Routes } from '@angular/router';
import { GameSearch } from './game-search/game-search';
import { GameList } from './game-list/game-list';

export const routes: Routes = [
  { path: '', redirectTo: 'collection', pathMatch: 'full' },
  { path: 'search', component: GameSearch },
  { path: 'collection', component: GameList },
];
