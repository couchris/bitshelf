import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SupabaseService } from '../supabase.service';
import { Platform } from '../models';
import { SortStrategy, SortByTitle, SortByReleaseDate } from '../sort-strategy';

@Component({
  selector: 'app-filter-sort',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './filter-sort.html',
  styleUrl: './filter-sort.scss',
})
export class FilterSort implements OnInit {
  @Output() sortChanged = new EventEmitter<SortStrategy | null>();
  @Output() platformFilterChanged = new EventEmitter<number | null>();

  platforms: Platform[] = [];
  selectedSort = '';
  selectedPlatformId: number | null = null;

  constructor(
    private supabaseService: SupabaseService,
    private cdr: ChangeDetectorRef
  ) {}

  async ngOnInit(): Promise<void> {
    await this.loadPlatforms();
  }

  async loadPlatforms(): Promise<void> {
    try {
      this.platforms = await this.supabaseService.getPlatforms();
    } catch (err) {
      console.error('Failed to load platforms', err);
    } finally {
      this.cdr.detectChanges();
    }
  }

  onSortChange(): void {
    let strategy: SortStrategy | null = null;
    if (this.selectedSort === 'title') strategy = new SortByTitle();
    if (this.selectedSort === 'release_date') strategy = new SortByReleaseDate();
    this.sortChanged.emit(strategy);
  }

  onPlatformChange(): void {
    this.platformFilterChanged.emit(this.selectedPlatformId);
  }
}
