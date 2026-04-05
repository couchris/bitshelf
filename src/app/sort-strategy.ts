import { Game } from './models';

export interface SortStrategy {
  sort(games: Game[]): Game[];
}

export class SortByTitle implements SortStrategy {
  sort(games: Game[]): Game[] {
    return [...games].sort((a, b) => a.title.localeCompare(b.title));
  }
}

export class SortByReleaseDate implements SortStrategy {
  sort(games: Game[]): Game[] {
    return [...games].sort((a, b) => {
      if (!a.release_date) return 1;
      if (!b.release_date) return -1;
      return a.release_date.localeCompare(b.release_date);
    });
  }
}
