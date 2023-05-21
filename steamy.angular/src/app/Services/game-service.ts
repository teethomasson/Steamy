import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameService {
  private apiUrl = 'http://localhost:5140/api/games'; 

  constructor(private http: HttpClient) { }

  searchGames(query: string): Observable<any> {
    return this.http.get(`${this.apiUrl}?search=${query}`);
  }
}
