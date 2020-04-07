/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditrulesComponent } from './editrules.component';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ModalComponent } from '../../modal/modal.component';
import { RouterModule } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import {APP_BASE_HREF} from '@angular/common';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ToastrService } from 'ngx-toastr';
import { RulesService, AuthenticationService } from 'src/services';
import { NotificationService } from 'src/services/notification.service';
import { of } from 'rxjs';

describe('EditrulesComponent', () => {
  let component: EditrulesComponent;
  let fixture: ComponentFixture<EditrulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditrulesComponent, ModalComponent ],
      imports: [
        HttpClientTestingModule,
        RouterModule.forRoot([]),
        ReactiveFormsModule,
        FormsModule,
        SubheaderModule,
        NgbModule,
        RouterTestingModule
      ],
      providers: [
        // tslint:disable-next-line: no-use-before-declare
        {provide: ToastrService, useClass: ToastrServiceStub},
        // tslint:disable-next-line: no-use-before-declare
        {provide: RulesService, useClass: RulesServiceStub},
        // tslint:disable-next-line: no-use-before-declare
        {provide: NotificationService, useClass: NotificationServiceStub},
        // tslint:disable-next-line: no-use-before-declare
        {provide: AuthenticationService, useClass: AuthenticationServiceStub},
        {provide: APP_BASE_HREF, useValue : '/' }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });



  // it('should create', () => {
  //   expect(component).toBeTruthy();
  // });

});

class ToastrServiceStub {}
class RulesServiceStub {
  EditRulerulesmethod() {
    const result = [{id: 1}];
    return of( result );
  }
}
class NotificationServiceStub {}
class AuthenticationServiceStub {}
