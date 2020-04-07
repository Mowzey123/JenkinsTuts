import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionreportsComponent } from './transactionreports.component';

describe('TransactionreportsComponent', () => {
  let component: TransactionreportsComponent;
  let fixture: ComponentFixture<TransactionreportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionreportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionreportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
