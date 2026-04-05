import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { Game, Platform } from './models';

const SUPABASE_URL = 'https://mlyqzzgvhqhgzivfwchu.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_viTu9xTpTjwIYM-qRauUeA_5ot2NDXG';

/**
 * Facade Pattern — SupabaseService acts as a facade over the Supabase JS client.
 * Hides the complexity of the underlying query builder API (chained .from().select().eq()
 * calls, error tuple destructuring, type casting) behind simple methods
 * like getGames(), addGame(), getOrCreatePlatform(), etc.
 * Components interact only with this service and never touch the Supabase client directly.
 */
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

  async updateGame(id: number, changes: Partial<Game>): Promise<Game> {
    const { data, error } = await this.supabase
      .from('games')
      .update(changes)
      .eq('id', id)
      .select()
      .single();
    if (error) throw error;
    return data as Game;
  }

  async deleteGame(id: number): Promise<void> {
    const { error } = await this.supabase.from('games').delete().eq('id', id);
    if (error) throw error;
  }

  async getPlatforms(): Promise<Platform[]> {
    const { data, error } = await this.supabase
      .from('platforms')
      .select('*');
    if (error) throw error;
    return data as Platform[];
  }

  async getOrCreatePlatform(platform: Omit<Platform, 'id'>): Promise<Platform> {
    const { data: existing, error: fetchError } = await this.supabase
      .from('platforms')
      .select('*')
      .eq('name', platform.name)
      .maybeSingle();
    if (fetchError) throw fetchError;
    if (existing) return existing as Platform;

    const { data: created, error: insertError } = await this.supabase
      .from('platforms')
      .insert([platform])
      .select()
      .single();
    if (insertError) throw insertError;
    return created as Platform;
  }
}