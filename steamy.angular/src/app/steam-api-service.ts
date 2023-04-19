// src/app/steam-api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SteamApiService {
  private apiUrl = 'http://localhost:5140'; // Replace with your .NET Web API base URL

  constructor(private http: HttpClient) { }

  getUserProfile(searchQuery: string): Observable<any> {
    const url = `${this.apiUrl}/SteamUser/profile/${searchQuery}`;
    return this.http.get<any>(url);
  }
}
