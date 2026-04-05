import { Game } from './models';

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
