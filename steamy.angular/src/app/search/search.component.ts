import { Component } from '@angular/core';
import { SteamApiService } from '../steam-api-service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  searchQuery = '';
  userProfile: any;
  errorMessage: string | null;
  
  constructor(private steamApiService: SteamApiService) { 
    this.searchQuery = '';
    this.errorMessage = null;
  } 

  onSearch(): void {
    this.steamApiService.resolveVanityUrl(this.searchQuery).subscribe(
      (response: { steamId: string }) => {
        this.steamApiService.getUserProfile(response.steamId).subscribe(
          (data) => {
            this.userProfile = data;
            this.errorMessage = null;
          },
          (error) => {
            console.error('Error fetching user profile:', error);
            this.errorMessage = 'The entered value for the Vanity URL could not be resolved to a Steam ID.';
          }
        );
      },
      (error) => {
        console.error('Error resolving vanity URL:', error);
        this.errorMessage = 'The entered value for the Vanity URL could not be resolved to a Steam ID.';
      }
    );
  }
  
  
}
