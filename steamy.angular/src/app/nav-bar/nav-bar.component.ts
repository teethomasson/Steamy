import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(public dialog: MatDialog, private router: Router) {}

  openSignUpDialog(): void {
    this.dialog.open(SignUpComponent, {
      width: '400px'
    });
  }

  navigateToLogin() {
    this.router.navigate(['/login']);
  }
}
