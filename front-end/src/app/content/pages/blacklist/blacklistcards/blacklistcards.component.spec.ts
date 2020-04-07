import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistcardsComponent } from './blacklistcards.component';

describe('BlacklistcardsComponent', () => {
  let component: BlacklistcardsComponent;
  let fixture: ComponentFixture<BlacklistcardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistcardsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistcardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});
