import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './search/search.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { SignUpComponent } from './sign-up/sign-up.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { ConfirmEmailComponent } from './confirm-email/confirm-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MatCardModule } from '@angular/material/card';
import { NotesBarComponent } from './notes-bar/notes-bar.component';
import { NoteDialogComponent } from './notes-dialog/notes-dialog.component';
import { MatIconModule } from '@angular/material/icon';
<<<<<<< HEAD
import { NotePreviewComponent } from './note-preview/note-preview.component';
import { NoteEditorComponent } from './note-editor/note-editor.component';
import {MatSidenavModule} from '@angular/material/sidenav';



import { AuthService } from './auth.service';
import { NoteService } from '../app/Services/note-service';
import { ToolBarComponent } from './tool-bar/tool-bar.component';
=======
import { UserProfileComponent } from './user-profile/user-profile.component';
>>>>>>> 6a6cef3775fb4d60d2b1646ad6bac80530b01e84

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    NavBarComponent,
    SignUpComponent,
    VerifyEmailComponent,
    ConfirmEmailComponent,
    ConfirmEmailComponent,
    DashboardComponent,
    LoginComponent,
    LandingPageComponent,
    NotesBarComponent,
    NoteDialogComponent,
<<<<<<< HEAD
    NotePreviewComponent,
    NoteEditorComponent,
    ToolBarComponent
=======
    UserProfileComponent
>>>>>>> 6a6cef3775fb4d60d2b1646ad6bac80530b01e84
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatCardModule,
    MatIconModule,
    MatSidenavModule
  ],
  providers: [AuthService, NoteService],
  bootstrap: [AppComponent]
})
export class AppModule { }
