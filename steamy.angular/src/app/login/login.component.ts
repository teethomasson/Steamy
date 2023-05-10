import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
  ngOnInit(): void {}

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
  
    const loginData = {
      Email: this.loginForm.value.email,
      Password: this.loginForm.value.password,
    };
  
    this.authService.login(loginData).subscribe(
      (response: any) => {
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        // Show an error message if the authentication fails
        console.error('Authentication failed');
      }
    );
  }
}
