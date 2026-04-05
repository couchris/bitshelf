import { Game } from './models';

/**
 * Builder Pattern — GameBuilder constructs a Game object by using method chaining.
 * Each setter method sets one field and returns `this`, allowing calls to be chained.
 * The final build() call returns the fully constructed Game object.
 * This avoids large constructors with many optional parameters and prevents incomplete
 * objects from being created, fields not explicitly set will default to safe values.
 */
export class GameBuilder {
  private game: Partial<Omit<Game, 'id'>> = { played: false };

  setTitle(title: string): this {
    this.game.title = title;
    return this;
  }

  setPlatformId(id: number): this {
    this.game.platform_id = id;
    return this;
  }

  setGenre(genre: string): this {
    this.game.genre = genre;
    return this;
  }

  setReleaseDate(timestamp?: number): this {
    this.game.release_date = timestamp
      ? new Date(timestamp * 1000).toISOString().split('T')[0]
      : '';
    return this;
  }

  setPlayed(played: boolean): this {
    this.game.played = played;
    return this;
  }

  setCondition(condition: string): this {
    this.game.condition = condition;
    return this;
  }

  setImageUrl(url?: string): this {
    this.game.image_url = url
      ? 'https:' + url.replace('t_thumb', 't_cover_big')
      : '';
    return this;
  }

  setIgdbId(id: number): this {
    this.game.igdb_id = id;
    return this;
  }

  setSummary(summary: string): this {
    this.game.summary = summary;
    return this;
  }

  build(): Omit<Game, 'id'> {
    return this.game as Omit<Game, 'id'>;
  }
}
