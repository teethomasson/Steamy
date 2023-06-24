import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/Models/Note.model'
import { AuthService } from 'src/app/auth.service'; 
import jwt_decode from 'jwt-decode';
import { JwtPayload } from '../Interfaces/JwtPayload';

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:5140/api/notes'; 

  constructor(private http: HttpClient, private authService: AuthService) { } 

  getNotes(): Observable<Note[]> {
    const token = this.authService.getToken();
    const decodedToken = jwt_decode<JwtPayload>(token);
    const userId = decodedToken.nameid;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    console.log("Getting Notes for user: ${userId}");
    return this.http.get<Note[]>(`${this.apiUrl}?userId=${userId}`, {headers: headers, withCredentials: true});
  }

  createNote(note: Note): Observable<Note> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<Note>(`${this.apiUrl}`, note, { headers: headers, withCredentials: true });
  }

  getNoteById(id: number): Observable<Note> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.get<Note>(`${this.apiUrl}/${id}`, { headers: headers, withCredentials: true });
  }
}
