import { Game } from './models';

/**
 * Strategy Pattern — SortStrategy defines a common interface for sorting algorithms.
 * Concrete strategies (SortByTitle, SortByReleaseDate) each implement the sort() method
 * with different logic. FilterSort instantiates the desired strategy at runtime based on
 * the user's selection, and passes it to GameList which calls strategy.sort(games).
 * This allows the sorting algorithm to be swapped without modifying GameList.
 */
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
