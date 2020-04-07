import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BlockedaccountsComponent } from './blockedaccounts.component';

describe('BlockedaccountsComponent', () => {
  let component: BlockedaccountsComponent;
  let fixture: ComponentFixture<BlockedaccountsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BlockedaccountsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BlockedaccountsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
