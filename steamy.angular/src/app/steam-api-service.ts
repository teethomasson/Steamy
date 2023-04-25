// src/app/steam-api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteamApiService {
  private apiUrl = 'http://localhost:5140'; 

  constructor(private http: HttpClient) { }

  // Change the parameter type to an array of strings
  getUserProfile(steamIdOrVanityUrl: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/SteamUser/profile/${steamIdOrVanityUrl}`);
  }
  


  resolveVanityUrl(vanityUrl: string): Observable<{ steamId: string }> {
    return this.http.get<{ steamId: string }>(`${this.apiUrl}/SteamUser/vanity/${vanityUrl}`);
  }
  
  
}
