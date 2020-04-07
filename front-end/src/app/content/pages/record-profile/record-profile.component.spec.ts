import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RecordProfileComponent } from './record-profile.component';

describe('RecordProfileComponent', () => {
  let component: RecordProfileComponent;
  let fixture: ComponentFixture<RecordProfileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RecordProfileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RecordProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
