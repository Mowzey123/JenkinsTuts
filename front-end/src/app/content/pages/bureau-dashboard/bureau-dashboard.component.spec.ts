import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauDashboardComponent } from './bureau-dashboard.component';

describe('BureauDashboardComponent', () => {
  let component: BureauDashboardComponent;
  let fixture: ComponentFixture<BureauDashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BureauDashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BureauDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
