import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResolvedtransactionsComponent } from './resolvedtransactions.component';

describe('ResolvedtransactionsComponent', () => {
  let component: ResolvedtransactionsComponent;
  let fixture: ComponentFixture<ResolvedtransactionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResolvedtransactionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResolvedtransactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
