import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import { NoteService } from '../Services/note-service';
import { ActivatedRoute } from '@angular/router';
import { fabric } from 'fabric';
import { Note } from '../Models/Note.model';

@Component({
  selector: 'app-note-editor',
  templateUrl: './note-editor.component.html',
  styleUrls: ['./note-editor.component.css']
})

export class NoteEditorComponent implements OnInit {

  note!: Note;
  canvas!: fabric.Canvas;

  constructor(private noteService: NoteService, private route: ActivatedRoute) { }

  @ViewChild('canvasElement')
  canvasElement!: ElementRef;
  
  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    this.noteService.getNoteById(Number(noteId)).subscribe(note => {
      this.note = note;
  
      // Initialize Fabric.js canvas
      this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);
      this.canvas.setWidth(800);  // Set the width to 800 pixels
      this.canvas.setHeight(600);

    });
  }

  ngOnDestroy() {
    // Dispose the canvas when the component is destroyed
    this.canvas.dispose();
  }
}
