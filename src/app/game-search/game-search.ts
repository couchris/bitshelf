import { ChangeDetectorRef, Component, Output, EventEmitter } from '@angular/core';
import { CommonModule, SlicePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IgdbService, IgdbGame } from '../igdb.service';
import { GameStateService } from '../game-state.service';

@Component({
  selector: 'app-game-search',
  imports: [CommonModule, FormsModule, SlicePipe],
  templateUrl: './game-search.html',
  styleUrl: './game-search.scss',
})
export class GameSearch {
  @Output() gameSelected = new EventEmitter<void>();

  searchTerm = '';
  results: IgdbGame[] = [];
  isSearching = false;
  errorMessage = '';

  constructor(
    private igdbService: IgdbService,
    private gameStateService: GameStateService,
    private cdr: ChangeDetectorRef
  ) {}

  async onSearch() {
    if (!this.searchTerm.trim()) return;
  
    this.isSearching = true;
    this.results = [];
    this.errorMessage = '';
  
    try {
      this.results = await this.igdbService.searchGames(this.searchTerm);
      console.log('Results:', this.results);
      this.isSearching = false;  // set false BEFORE detectChanges
      this.cdr.detectChanges();
    } catch (err) {
      this.isSearching = false;
      this.errorMessage = 'Search failed. Please try again.';
      console.error(err);
      this.cdr.detectChanges();
    }
  }

  addToCollection(game: IgdbGame): void {
    this.gameStateService.setSelectedGame(game);
    this.gameSelected.emit();
  }

  getCoverUrl(url: string | undefined): string {
    return this.igdbService.getCoverUrl(url);
  }
}