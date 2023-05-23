import { MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Component, OnInit } from '@angular/core';
import { Note } from '../Models/Note.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GameService } from '../Services/game-service';
import { NoteService } from '../Services/note-service';


@Component({
  selector: 'app-notes-dialog',
  templateUrl: './notes-dialog.component.html',
  styleUrls: ['./notes-dialog.component.css']
})
export class NoteDialogComponent implements OnInit {
  noteForm!: FormGroup;
  games: any;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<NoteDialogComponent>,
    private gameService: GameService,
    private noteService: NoteService
  ) {}

  ngOnInit(): void {
    this.noteForm = this.formBuilder.group({
      noteTitle: ['', Validators.required],
      gameQuery: [''],
      selectedGame: ['']
    });
  }

  searchGames(event: any): void {
    const keyboardEvent = event as KeyboardEvent;
    keyboardEvent.preventDefault();
    const query = this.noteForm.value.gameQuery;
    this.gameService.searchGames(query).subscribe(results => {
      this.games = results;
    });
  }
  
  
  selectGame(game: any): void {
    this.noteForm.controls['selectedGame'].setValue(game);
  }

  saveNote() {
    if (this.noteForm.valid) {
      const newNote: Note = {
        title: this.noteForm.get('noteTitle')?.value,
        gameId: this.noteForm.get('selectedGame')?.value.id, 
        lastModified: new Date()
      }; 
      this.dialogRef.close(newNote);
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  deselectGame(): void {
    this.noteForm.controls['selectedGame'].setValue(null);
    this.noteForm.controls['gameQuery'].setValue('');
  }
  
  
}
