import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TareaNewComponent } from './tarea-new.component';

describe('TareaNewComponent', () => {
  let component: TareaNewComponent;
  let fixture: ComponentFixture<TareaNewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TareaNewComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TareaNewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
