import { ChangeDetectorRef, Component } from '@angular/core';
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
      this.isSearching = false;
      this.cdr.detectChanges();
    } catch (err) {
      this.isSearching = false;
      this.errorMessage = 'Search failed. Please try again.';
      console.error(err);
      this.cdr.detectChanges();
    }
  }

  addToCollection(game: IgdbGame): void {
    this.gameStateService.selectGame(game);
  }

  getCoverUrl(url: string | undefined): string {
    return this.igdbService.getCoverUrl(url);
  }
}