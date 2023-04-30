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
    this.steamApiService.getUserProfile(this.searchQuery).subscribe(
      (data) => {
        this.userProfile = data;
        this.errorMessage = null;
        console.log(data);
      },
      (error) => {
        console.error('Error fetching user profile:', error);
        this.errorMessage = 'The entered value for the Vanity URL or Steam ID could not be resolved to a Steam profile.';
      }
    );
  }
  
  

  
  
}
