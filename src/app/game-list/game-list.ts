import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';
import { Game } from '../models';
import { SortStrategy } from '../sort-strategy';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss'
})
export class GameList implements OnInit {
  @Input() sortStrategy: SortStrategy | null = null;
  @Input() platformFilter: number | null = null;
  @Output() editGame = new EventEmitter<Game>();

  games: Game[] = [];
  isLoading = false;
  errorMessage = '';

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadGames();
  }

  get displayedGames(): Game[] {
    let result = this.platformFilter
      ? this.games.filter(g => g.platform_id === this.platformFilter)
      : this.games;

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
    this.editGame.emit(game);
  }
}
