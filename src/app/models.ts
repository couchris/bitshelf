export interface Platform {
  id?: number;
  name: string;
  manufacturer?: string;
  release_year?: number;
  image_url?: string;
}

export interface Game {
  id?: number;
  title: string;
  platform_id: number;
  genre?: string;
  release_date?: string;
  played: boolean;
  condition?: string;
  image_url?: string;
  igdb_id?: number;
  summary?: string;
}
