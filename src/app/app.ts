import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SupabaseService } from './supabase.service';
import { GameSearch } from './game-search/game-search';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, GameSearch],
  templateUrl: './app.html',
  styleUrls: ['./app.scss']
})
export class AppComponent implements OnInit {
  games: any[] = [];

  constructor(private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit() {
    this.games = await this.supabaseService.getGames();
    console.log('Games in ngOnInit:', this.games);

    this.cdr.detectChanges();
  }
}