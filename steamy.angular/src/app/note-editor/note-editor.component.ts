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
      this.canvas.on('object:selected', (options) => this.onObjectSelected(options));
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
        strokeWidth: 1,
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
        const textbox = new fabric.IText('', {
            left: this.tempRect.left,
            top: this.tempRect.top,
            width: this.tempRect.width,
            height: this.tempRect.height,
            fontSize: 16,
            borderColor: 'black',
            borderScaleFactor: 1,
            hasBorders: true,
            editable: false,
            lockMovementX: true,
            lockMovementY: true,
            lockScalingX: true,
            lockScalingY: true,
            lockRotation: true,
            padding: 10,
        });

        this.canvas.add(textbox);
        this.canvas.remove(this.tempRect);
        this.tempRect = null;

        this.canvas.on('mouse:up', (options) => {
          if (options.target && options.target.type === 'i-text') {
              let textbox = options.target as fabric.IText;
              textbox.set({
                  borderColor: 'red',
              });
              textbox.enterEditing();
              this.canvas.renderAll();
          }
      });
    }
}



onObjectSelected(event: fabric.IEvent): void {
  const activeObject = this.canvas.getActiveObject();

  if (activeObject && activeObject.type === 'textbox') {
    const textbox = activeObject as fabric.Textbox;

    textbox.set({
      editable: true, // Make textbox editable on selection
    });
    textbox.enterEditing();
    this.canvas.renderAll();
  }
}



  
  

  ngOnDestroy() {
    // Dispose the canvas when the component is destroyed
    this.canvas.dispose();
  }
}

