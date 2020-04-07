import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesengineComponent } from './rulesengine.component';
import { SubheaderModule } from '../../rac/components/subheader/subheader.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ModalComponent } from '../modal/modal.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { APP_BASE_HREF } from '@angular/common';
import { RouterModule } from '@angular/router';

describe('RulesengineComponent', () => {
  let component: RulesengineComponent;
  let fixture: ComponentFixture<RulesengineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RulesengineComponent, ModalComponent ],
      imports: [
        RouterModule.forRoot([]),
        SubheaderModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
      ],
      providers: [
        // tslint:disable-next-line: no-use-before-declare
        {provide: ToastrService, useClass: ToastrServiceStub},
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesengineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class ToastrServiceStub {}
