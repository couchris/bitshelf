import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

@Injectable({
  providedIn: 'root'
})
export class SupabaseService {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      'https://mlyqzzgvhqhgzivfwchu.supabase.co',
      'sb_publishable_viTu9xTpTjwIYM-qRauUeA_5ot2NDXG'
    );
  }

  async getGames() {
    const { data, error } = await this.supabase.from('games').select('*');
    if (error) {
      console.error('Error fetching games:', error);
      return [];
    }
    return data;
  }

  async addGame(game: any) {
    const { data, error } = await this.supabase.from('games').insert([game]);
    if (error) {
      console.error('Error inserting game:', error);
    }
    return data;
  }
}