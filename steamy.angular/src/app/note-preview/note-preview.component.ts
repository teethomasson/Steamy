import { Component, Input } from '@angular/core';
import { Note } from '../Models/Note.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-note-preview',
  templateUrl: './note-preview.component.html',
  styleUrls: ['./note-preview.component.css']
})


export class NotePreviewComponent {
  constructor(private router: Router) { }
  @Input()
  note!: Note;

  editNote() {
    this.router.navigate(['/note-editor', this.note.id]);
  }

}

