import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Game } from './models';

const SUPABASE_URL = 'https://mlyqzzgvhqhgzivfwchu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_viTu9xTpTjwIYM-qRauUeA_5ot2NDXG';

@Injectable({
  providedIn: 'root',
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
  }

  async getGames(): Promise<Game[]> {
    const { data, error } = await this.supabase.from('games').select('*');
    if (error) throw error;
    return data as Game[];
  }

  async addGame(game: Omit<Game, 'id'>): Promise<Game> {
    const { data, error } = await this.supabase.from('games').insert([game]).select().single();
    if (error) throw error;
    return data as Game;
  }
}