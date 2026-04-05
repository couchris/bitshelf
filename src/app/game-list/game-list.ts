import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from '../supabase.service';
import { Game } from '../models';

@Component({
  selector: 'app-game-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './game-list.html',
  styleUrl: './game-list.scss'
})
export class GameList implements OnInit {
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

  onEdit(game: Game): void {
    this.editGame.emit(game);
  }
}
