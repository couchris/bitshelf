import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game, Platform } from '../models';
import { IgdbGame } from '../igdb.service';
import { GameStateService } from '../game-state.service';
import { SupabaseService } from '../supabase.service';
import { GameBuilder } from '../game-builder';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.scss'
})
export class GameForm implements OnInit, OnChanges {
  @Input() gameToEdit: Game | null = null;
  @Output() formSubmitted = new EventEmitter<void>();
  @Output() formCancelled = new EventEmitter<void>();

  platforms: Platform[] = [];
  isSubmitting = false;
  errorMessage = '';

  title = '';
  platformId: number | null = null;
  genre = '';
  releaseDate = '';
  played = false;
  condition = '';
  imageUrl = '';

  constructor(
    private gameStateService: GameStateService,
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    try {
      this.platforms = await this.supabaseService.getPlatforms();
    } catch (err) {
      console.error('Failed to load platforms', err);
    }

    const selectedIgdbGame = this.gameStateService.getSelectedGame();
    if (selectedIgdbGame) {
      this.prefillFromIgdb(selectedIgdbGame);
      this.gameStateService.clearSelectedGame();
    }

    this.cdr.detectChanges();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gameToEdit'] && this.gameToEdit) {
      this.populateFromGame(this.gameToEdit);
    }
  }

  private prefillFromIgdb(igdbGame: IgdbGame): void {
    
    const built = new GameBuilder()
      .setTitle(igdbGame.name)
      .setReleaseDate(igdbGame.first_release_date)
      .setImageUrl(igdbGame.cover?.url)
      .setIgdbId(igdbGame.id)
      .setSummary(igdbGame.summary ?? '')
      .build();

    this.title = built.title;
    this.genre = built.genre ?? '';
    this.releaseDate = built.release_date ?? '';
    this.imageUrl = built.image_url ?? '';
    this.played = built.played;
    this.condition = built.condition ?? '';
  }

  private populateFromGame(game: Game): void {
    this.title = game.title;
    this.platformId = game.platform_id;
    this.genre = game.genre ?? '';
    this.releaseDate = game.release_date ?? '';
    this.played = game.played;
    this.condition = game.condition ?? '';
    this.imageUrl = game.image_url ?? '';
  }

  async onSubmit(): Promise<void> {
    if (!this.title || this.platformId === null) {
      this.errorMessage = 'Title and platform are required.';
      this.cdr.detectChanges();
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = '';

    const game: Omit<Game, 'id'> = {
      title: this.title,
      platform_id: this.platformId,
      genre: this.genre,
      release_date: this.releaseDate,
      played: this.played,
      condition: this.condition,
      image_url: this.imageUrl
    };

    try {
      if (this.gameToEdit?.id) {
        await this.supabaseService.updateGame(this.gameToEdit.id, game);
      } else {
        await this.supabaseService.addGame(game);
      }

      this.formSubmitted.emit();
      this.resetForm();
    } catch (err) {
      this.errorMessage = 'Failed to save game. Please try again.';
      console.error(err);
    } finally {
      this.isSubmitting = false;
      this.cdr.detectChanges();
    }
  }

  onCancel(): void {
    this.formCancelled.emit();
  }

  private resetForm(): void {
    this.title = '';
    this.platformId = null;
    this.genre = '';
    this.releaseDate = '';
    this.played = false;
    this.condition = '';
    this.imageUrl = '';
  }
}
