import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';
import { GameForm } from './game-form/game-form';
import { GameStateService } from './game-state.service';
import { Game } from './models';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, RouterLinkActive, GameForm],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  showForm = false;
  gameToEdit: Game | null = null;

  private sub!: Subscription;

  constructor(private gameStateService: GameStateService) {}

  ngOnInit(): void {
    this.sub = this.gameStateService.gameSelected$.subscribe(() => {
      this.gameToEdit = this.gameStateService.getGameToEdit();
      this.showForm = true;
    });
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }

  onFormSubmitted(): void {
    this.showForm = false;
    this.gameToEdit = null;
  }

  onFormClosed(): void {
    this.showForm = false;
    this.gameToEdit = null;
  }
}
