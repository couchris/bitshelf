import { Injectable } from '@angular/core';
import { IgdbGame } from './igdb.service';

@Injectable({
  providedIn: 'root'
})
export class GameStateService {
  private selectedGame: IgdbGame | null = null;

  setSelectedGame(game: IgdbGame): void {
    this.selectedGame = game;
  }

  getSelectedGame(): IgdbGame | null {
    return this.selectedGame;
  }

  clearSelectedGame(): void {
    this.selectedGame = null;
  }
}
