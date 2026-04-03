import { Injectable } from '@angular/core';

const EDGE_FUNCTION_URL = 'https://mlyqzzgvhqhgzivfwchu.supabase.co/functions/v1/igdb-proxy';

export interface IgdbGame {
  id: number;
  name: string;
  summary?: string;
  cover?: { id: number; url: string };
  platforms?: { id: number; name: string }[];
  first_release_date?: number;
}

@Injectable({
  providedIn: 'root'
})
export class IgdbService {

  private async query<T>(endpoint: string, queryString: string): Promise<T> {
    const res = await fetch(EDGE_FUNCTION_URL, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1seXF6emd2aHFoZ3ppdmZ3Y2h1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI0MTM3MjIsImV4cCI6MjA4Nzk4OTcyMn0.qJk7MRnlnFGICOUHjIPozqN1l89oplWM3836ZgnZLjM'
     },
      body: JSON.stringify({ endpoint, query: queryString }),
    });

    if (!res.ok) {
      throw new Error(`IGDB proxy error: ${res.statusText}`);
    }

    return res.json();
  }

  /**
   * Search for games by name.
   * Returns basic info + cover art URL.
   */
  async searchGames(searchTerm: string): Promise<IgdbGame[]> {
    const q = `
      fields id, name, summary, cover.url, platforms.name, first_release_date;
      search "${searchTerm}";
      limit 10;
    `;
    return this.query<IgdbGame[]>('games', q);
  }

  /**
   * Get a single game by IGDB ID with full details.
   */
  async getGameById(id: number): Promise<IgdbGame | null> {
    const q = `
      fields id, name, summary, cover.url, platforms.name, first_release_date;
      where id = ${id};
      limit 1;
    `;
    const results = await this.query<IgdbGame[]>('games', q);
    return results[0] ?? null;
  }

  getCoverUrl(url: string | undefined): string {
    if (!url) return 'no-cover.jpg';
    return 'https:' + url.replace('t_thumb', 't_cover_big');
  }
}