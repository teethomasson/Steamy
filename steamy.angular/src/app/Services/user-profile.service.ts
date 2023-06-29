import  jwt_decode  from 'jwt-decode';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { JwtPayload } from '../Interfaces/JwtPayload';
import { User } from '../Models/User.model';


@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  private apiUrl = 'http://localhost:5140/api/userprofile'

  constructor(private http: HttpClient, private authSerivce: AuthService) { }

  getProfile(): Observable<User> {
    const token = this.authSerivce.getToken();
    const decodedToken = jwt_decode<JwtPayload>(token);
    const userId = decodedToken.nameid;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authSerivce.getToken()}`
    });
    return this.http.get<User>(`${this.apiUrl}?userId=${userId}`,{headers: headers, withCredentials: true});
  }

  putProfile(user: User): Observable<User> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${this.authSerivce.getToken()}`
    });
    return this.http.get<User>(`${this.apiUrl}/${user}`,{ headers: headers, withCredentials: true } )
  }
}
