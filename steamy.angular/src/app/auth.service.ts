import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = new BehaviorSubject<boolean>(false);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {} // Add HttpClient injection

  login(loginData: any): Observable<any> { // Accept loginData as a parameter
    return this.http.post('http://localhost:5140/account/login', loginData).pipe(
      tap((response: any) => {
        // Save the authentication token
        localStorage.setItem('token', response.token);
        this.loggedIn.next(true); // Update loggedIn status
      })
    );
  }

  logout() {
    sessionStorage.removeItem('token'); 
    this.loggedIn.next(false);
  }

  getToken(): string {
    const token = localStorage.getItem('token') || '';
    return token;
  }
}
