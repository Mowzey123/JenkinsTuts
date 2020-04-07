import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionprofileComponent } from './transactionprofile.component';

describe('TransactionprofileComponent', () => {
  let component: TransactionprofileComponent;
  let fixture: ComponentFixture<TransactionprofileComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TransactionprofileComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
