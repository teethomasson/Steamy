import { Component } from '@angular/core';
import { SteamApiService } from '../Services/steam-api-service';
import { filter, switchMap, tap } from 'rxjs';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery = '';
  userProfile: any;
  errorMessage: string | null;
  flagEmoji : SafeHtml | undefined;
  flagCountryCode: string = '';

  constructor(private steamApiService: SteamApiService, private sanitizer: DomSanitizer) { 
    this.searchQuery = '';
    this.errorMessage = null;
  } 

  onSearch(): void {
    this.steamApiService.getUserProfile(this.searchQuery).subscribe(
      (data) => {
        this.userProfile = data;
        this.errorMessage = null;
        console.log(data);
  
        if (this.userProfile.countryCode) {
          this.flagCountryCode = this.steamApiService.getFlagEmoji(this.userProfile.countryCode);
          console.log('Flag country code in component:', this.flagCountryCode);
        }
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        this.errorMessage = 'The entered value for the Vanity URL or Steam ID could not be resolved to a Steam profile.';
      }
    );
  }
  
  
  getFlagEmoji(countryCode: string): string {
    if (countryCode) {
      const codePoints = countryCode
        .toUpperCase()
        .split('')
        .map((char) => 'U+' + char.charCodeAt(0).toString(16).toUpperCase());
      return codePoints.join(' ');
    }
    return '';
  }
  
  
}
  
  

  


