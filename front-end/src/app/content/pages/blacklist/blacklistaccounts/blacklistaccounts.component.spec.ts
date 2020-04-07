

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlacklistaccountsComponent } from './blacklistaccounts.component';

describe('BlacklistaccountsComponent', () => {
  let component: BlacklistaccountsComponent;
  let fixture: ComponentFixture<BlacklistaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlacklistaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlacklistaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });
});


