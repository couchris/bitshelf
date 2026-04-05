import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Game, Platform } from '../models';

@Component({
  selector: 'app-game-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './game-form.html',
  styleUrl: './game-form.scss'
})
export class GameForm implements OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['gameToEdit'] && this.gameToEdit) {
      this.populateFromGame(this.gameToEdit);
    }
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

  onCancel(): void {
    this.formCancelled.emit();
  }
}
