import { Component, OnInit } from '@angular/core';
import { NoteService } from '../Services/note-service';
import { Note } from '../Models/Note.model';

@Component({
  selector: 'app-notes-bar',
  templateUrl: './notes-bar.component.html',
  styleUrls: ['./notes-bar.component.css']
})
export class NotesBarComponent {
  notes: Note[] = [];

  constructor(private noteService: NoteService) { }

  ngOnInit(): void {
    this.noteService.getNotes().subscribe(
      data => this.notes = data,
      error => console.error(error)
    );
  }
}
