import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app/app';
import { SupabaseService } from './app/supabase.service';

bootstrapApplication(AppComponent, {
  providers: [SupabaseService]
}).catch(err => console.error(err));