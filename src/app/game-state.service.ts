import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { IgdbGame } from './igdb.service';
import { Game } from './models';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private selectedGame: IgdbGame | null = null;
  private gameToEdit: Game | null = null;

  // Emits when a game is selected from search or edit, allowing AppComponent to open the form
  readonly gameSelected$ = new Subject<void>();

  selectGame(game: IgdbGame): void {
    this.selectedGame = game;
    this.gameToEdit = null;
    this.gameSelected$.next();
  }

  editGame(game: Game): void {
    this.gameToEdit = game;
    this.selectedGame = null;
    this.gameSelected$.next();
  }

  getSelectedGame(): IgdbGame | null {
    return this.selectedGame;
  }

  getGameToEdit(): Game | null {
    return this.gameToEdit;
  }

  clearSelectedGame(): void {
    this.selectedGame = null;
    this.gameToEdit = null;
  }
}
