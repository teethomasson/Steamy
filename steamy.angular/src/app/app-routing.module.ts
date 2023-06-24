import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerifyEmailComponent } from './verify-email/verify-email.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthGuard } from './auth.guard';
import { LoginComponent } from './login/login.component';
<<<<<<< HEAD
import { NoteEditorComponent } from './note-editor/note-editor.component';
=======
import { UserProfileComponent } from './user-profile/user-profile.component';
>>>>>>> 6a6cef3775fb4d60d2b1646ad6bac80530b01e84


const routes: Routes = [
  { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
<<<<<<< HEAD
  { path: 'note-editor/:id', component: NoteEditorComponent },
  { path: 'verify-email', component: VerifyEmailComponent }
=======
  { path: 'verify-email', component: VerifyEmailComponent },
  { path: 'user-profile', component: UserProfileComponent}
>>>>>>> 6a6cef3775fb4d60d2b1646ad6bac80530b01e84
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
