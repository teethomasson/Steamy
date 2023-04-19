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
  
  constructor(private steamApiService: SteamApiService) { } 

  onSearch() {
    this.steamApiService.getUserProfile(this.searchQuery).subscribe(
      (data) => {
        this.userProfile = data;
      },
      (error) => {
        console.error('Error fetching user profile:', error);
      }
    );
  }
}
