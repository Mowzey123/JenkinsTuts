import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessTransactionsComponent } from './success-transactions.component';

describe('SuccessTransactionsComponent', () => {
  let component: SuccessTransactionsComponent;
  let fixture: ComponentFixture<SuccessTransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuccessTransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuccessTransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
