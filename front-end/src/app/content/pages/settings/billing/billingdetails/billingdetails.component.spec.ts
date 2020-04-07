import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingdetailsComponent } from './billingdetails.component';

describe('BillingdetailsComponent', () => {
  let component: BillingdetailsComponent;
  let fixture: ComponentFixture<BillingdetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingdetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
