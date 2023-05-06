import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpComponent } from '../sign-up/sign-up.component';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(public dialog: MatDialog) {}

  openSignUpDialog(): void {
    this.dialog.open(SignUpComponent, {
      width: '400px'
    });
}
}
