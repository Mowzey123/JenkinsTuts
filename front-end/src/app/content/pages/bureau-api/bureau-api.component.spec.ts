import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BureauApiComponent } from './bureau-api.component';

describe('BureauApiComponent', () => {
  let component: BureauApiComponent;
  let fixture: ComponentFixture<BureauApiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BureauApiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BureauApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
