import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSearch } from './game-search/game-search';
import { GameList } from './game-list/game-list';
import { GameForm } from './game-form/game-form';
import { FilterSort } from './filter-sort/filter-sort';
import { Game } from './models';
import { SortStrategy } from './sort-strategy';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameSearch, GameList, GameForm, FilterSort],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  @ViewChild(GameList) gameList!: GameList;

  showForm = false;
  gameToEdit: Game | null = null;
  activeSortStrategy: SortStrategy | null = null;
  activePlatformFilter: number | null = null;

  onGameSelected(): void {
    this.gameToEdit = null;
    this.showForm = true;
  }

  onEditGame(game: Game): void {
    this.gameToEdit = game;
    this.showForm = true;
  }

  onFormSubmitted(): void {
    this.showForm = false;
    this.gameToEdit = null;
    this.gameList.loadGames();
  }

  onFormClosed(): void {
    this.showForm = false;
    this.gameToEdit = null;
  }

  onSortChanged(strategy: SortStrategy | null): void {
    this.activeSortStrategy = strategy;
  }

  onPlatformFilterChanged(platformId: number | null): void {
    this.activePlatformFilter = platformId;
  }
}
