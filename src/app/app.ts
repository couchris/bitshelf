import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameSearch } from './game-search/game-search';
import { GameList } from './game-list/game-list';
import { GameForm } from './game-form/game-form';
import { Game } from './models';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameSearch, GameList, GameForm],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent {
  showForm = false;
  gameToEdit: Game | null = null;

  onGameSelected(): void {
    this.gameToEdit = null;
    this.showForm = true;
  }

  onEditGame(game: Game): void {
    this.gameToEdit = game;
    this.showForm = true;
  }

  onFormClosed(): void {
    this.showForm = false;
    this.gameToEdit = null;
  }
}