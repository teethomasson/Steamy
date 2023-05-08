import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {
  signUpForm: FormGroup;
  errorMessages: string[] = [];

  constructor(
    private http: HttpClient,
    private fb: FormBuilder,
    private router: Router,
    public dialogRef: MatDialogRef<SignUpComponent>
  ) {
    this.signUpForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required], 
      lastName: ['', Validators.required], 
    });
  }

  ngOnInit(): void {}
  
  onSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }
  
    const registerData = {
      Email: this.signUpForm.value.email,
      Password: this.signUpForm.value.password,
      FirstName: this.signUpForm.value.firstName,
      LastName: this.signUpForm.value.lastName,
    };
  
    this.http
      .post('http://localhost:5140/account/register', registerData)
      .subscribe(
        (response) => {
          this.dialogRef.close();
          this.router.navigate(['/verify-email']);
        },
        (error) => {
          // Display error messages
          if (error.error && error.error.errors) {
            this.errorMessages = error.error.errors;
          } else {
            this.errorMessages = ['An unknown error occurred. Please try again.'];
          }
        }
      );
  }
    
  onCancel() {
    this.dialogRef.close();
  }
}
