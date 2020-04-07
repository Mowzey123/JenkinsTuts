import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RulesComponent } from './rules.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ModalComponent } from '../../modal/modal.component';
import { APP_BASE_HREF } from '@angular/common';
import { ToastrService } from 'ngx-toastr';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';

describe('RulesComponent', () => {
  let component: RulesComponent;
  let fixture: ComponentFixture<RulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        FormsModule,
        SubheaderModule,
        NgbModule,
        RouterTestingModule
      ],
      declarations: [ RulesComponent, ModalComponent ],
      providers: [
        // tslint:disable-next-line: no-use-before-declare
        {provide: ToastrService, useClass: ToastrServiceStub},
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class ToastrServiceStub {}