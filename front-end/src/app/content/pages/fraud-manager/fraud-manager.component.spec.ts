import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FraudManagerComponent } from './fraud-manager.component';

describe('FraudManagerComponent', () => {
  let component: FraudManagerComponent;
  let fixture: ComponentFixture<FraudManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FraudManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FraudManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
