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
  isTextboxMode = false;
  currentTextbox: fabric.Textbox | null = null;
  
  private tempRect: fabric.Rect | null = null; // Temporary rectangle for drawing
  
  activateTextboxMode(): void {
    this.isTextboxMode = true;
  }

  constructor(private noteService: NoteService, private route: ActivatedRoute) { }

  @ViewChild('canvasElement')
  canvasElement!: ElementRef;
  
  ngOnInit(): void {
    const noteId = this.route.snapshot.paramMap.get('id');
    this.noteService.getNoteById(Number(noteId)).subscribe(note => {
      this.note = note;
  
      // Initialize Fabric.js canvas
      this.canvas = new fabric.Canvas(this.canvasElement.nativeElement);
      this.canvas.setWidth(800);  
      this.canvas.setHeight(600);

      // Hook up the Fabric.js canvas events to the methods
      this.canvas.on('mouse:down', (options) => this.onMouseDown(options));
      this.canvas.on('mouse:move', (options) => this.onMouseMove(options));
      this.canvas.on('mouse:up', (options) => this.onMouseUp(options));
    });
  }

  onMouseDown(event: fabric.IEvent): void {
    if (this.isTextboxMode && event.target === null) {
      const pointer = this.canvas.getPointer(event.e);
      this.tempRect = new fabric.Rect({
        left: pointer.x,
        top: pointer.y,
        fill: 'transparent',
        stroke: 'black',
        strokeWidth: 5,
        selectable: false,
      });
      this.canvas.add(this.tempRect);
    }
  }
  
  onMouseMove(event: fabric.IEvent): void {
    if (this.isTextboxMode && this.tempRect) {
      const pointer = this.canvas.getPointer(event.e);
      console.log('Pointer:', pointer); // Log the pointer values
    console.log('TempRect:', this.tempRect); // Log the tempRect values
      this.tempRect!.width = pointer.x - (this.tempRect!.left || 0);
      this.tempRect!.height = pointer.y - (this.tempRect!.top || 0);
      this.tempRect!.setCoords();
      this.canvas.renderAll();
    }
  }
  
  
  
  
  onMouseUp(event: fabric.IEvent): void {
    if (this.isTextboxMode && this.tempRect) {
      // Create the textbox at the position and size of the temporary rectangle
      const textbox = new fabric.Textbox('', {
        left: this.tempRect.left,
        top: this.tempRect.top,
        width: this.tempRect.width,
        height: this.tempRect.height,
      });
      this.canvas.add(textbox);
      this.canvas.remove(this.tempRect);
      this.tempRect = null;
    }
  }
  
  

  ngOnDestroy() {
    // Dispose the canvas when the component is destroyed
    this.canvas.dispose();
  }
}

