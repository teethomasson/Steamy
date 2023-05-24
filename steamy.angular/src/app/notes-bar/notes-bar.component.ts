import { NoteDialogComponent } from './../notes-dialog/notes-dialog.component';
import { Component, OnInit } from '@angular/core';
import { NoteService } from '../Services/note-service';
import { Note } from '../Models/Note.model';
import { MatDialog } from '@angular/material/dialog';


@Component({
  selector: 'app-notes-bar',
  templateUrl: './notes-bar.component.html',
  styleUrls: ['./notes-bar.component.css']
})
export class NotesBarComponent {
  notes: Note[] = [];

  constructor(private noteService: NoteService, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(
      data => this.notes = data,
      error => console.error(error)
    );
  }
  openDialog(): void {
    const dialogRef = this.dialog.open(NoteDialogComponent);

    dialogRef.afterClosed().subscribe(result => 
    {
      if (result) 
      {
        console.log(result);
        this.noteService.createNote(result).subscribe(newNote => {
          this.notes.push(newNote);
        });
      }
    });
  }

}
