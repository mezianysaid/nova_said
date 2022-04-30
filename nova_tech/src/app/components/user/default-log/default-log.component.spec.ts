import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DefaultLogComponent } from './default-log.component';

describe('DefaultLogComponent', () => {
  let component: DefaultLogComponent;
  let fixture: ComponentFixture<DefaultLogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultLogComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultLogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
