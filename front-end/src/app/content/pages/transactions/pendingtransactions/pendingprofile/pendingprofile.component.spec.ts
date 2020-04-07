import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingprofileComponent } from './pendingprofile.component';

describe('PendingprofileComponent', () => {
  let component: PendingprofileComponent;
  let fixture: ComponentFixture<PendingprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PendingprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
