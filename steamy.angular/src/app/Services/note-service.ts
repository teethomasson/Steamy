import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Note } from 'src/app/Models/Note.model'
import { AuthService } from 'src/app/auth.service'; 

@Injectable({
  providedIn: 'root'
})
export class NoteService {
  private apiUrl = 'http://localhost:5140/api/notes'; 

  constructor(private http: HttpClient, private authService: AuthService) { } 

  getNotes(): Observable<Note[]> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });

    return this.http.get<Note[]>(this.apiUrl, { headers: headers, withCredentials: true });
  }

  createNote(note: Note): Observable<Note> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authService.getToken()}`
    });
    return this.http.post<Note>(`${this.apiUrl}`, note, { headers: headers, withCredentials: true });
  }
}
