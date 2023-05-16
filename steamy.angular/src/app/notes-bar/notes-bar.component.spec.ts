import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NotesBarComponent } from './notes-bar.component';

describe('NotesBarComponent', () => {
  let component: NotesBarComponent;
  let fixture: ComponentFixture<NotesBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NotesBarComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NotesBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
