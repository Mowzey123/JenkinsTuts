import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PostRecordComponent } from './post-record.component';

describe('PostRecordComponent', () => {
  let component: PostRecordComponent;
  let fixture: ComponentFixture<PostRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PostRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PostRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
