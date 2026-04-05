import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';
import { GameStateService } from '../game-state.service';
import { Game } from '../models';
import { SortStrategy } from '../sort-strategy';
import { FilterSort } from '../filter-sort/filter-sort';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule, FilterSort],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss'
})
export class GameList implements OnInit {
  @ViewChild(FilterSort) filterSort!: FilterSort;

  games: Game[] = [];
  isLoading = false;
  errorMessage = '';

  private sortStrategy: SortStrategy | null = null;
  private platformFilter: number | null = null;
  private playedFilter: boolean | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private gameStateService: GameStateService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadGames();
  }

  get displayedGames(): Game[] {
    let result = this.platformFilter
      ? this.games.filter(g => g.platform_id === this.platformFilter)
      : this.games;

    if (this.playedFilter !== null) {
      result = result.filter(g => g.played === this.playedFilter);
    }

    return this.sortStrategy ? this.sortStrategy.sort(result) : result;
  }

  async loadGames(): Promise<void> {
    this.isLoading = true;
    this.errorMessage = '';
    try {
      this.games = await this.supabaseService.getGames();
    } catch (err) {
      this.errorMessage = 'Failed to load collection.';
      console.error(err);
    } finally {
      this.isLoading = false;
      this.cdr.detectChanges();
    }
    this.filterSort?.loadPlatforms();
  }

  async onDelete(id: number): Promise<void> {
    try {
      await this.supabaseService.deleteGame(id);
      this.games = this.games.filter(g => g.id !== id);
      this.cdr.detectChanges();
    } catch (err) {
      this.errorMessage = 'Failed to delete game.';
      console.error(err);
      this.cdr.detectChanges();
    }
  }

  onEdit(game: Game): void {
    this.gameStateService.editGame(game);
  }

  onSortChanged(strategy: SortStrategy | null): void {
    this.sortStrategy = strategy;
  }

  onPlatformFilterChanged(platformId: number | null): void {
    this.platformFilter = platformId;
  }

  onPlayedFilterChanged(played: boolean | null): void {
    this.playedFilter = played;
  }
}
