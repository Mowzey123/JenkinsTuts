import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudSearchComponent } from './fraud-search.component';

describe('FraudSearchComponent', () => {
  let component: FraudSearchComponent;
  let fixture: ComponentFixture<FraudSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraudSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
