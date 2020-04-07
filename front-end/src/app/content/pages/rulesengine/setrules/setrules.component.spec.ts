import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetrulesComponent } from './setrules.component';
import { ModalComponent } from '../../modal/modal.component';
import { SubheaderModule } from 'src/app/content/rac/components/subheader/subheader.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { MatProgressSpinnerModule } from '@angular/material';
import { TimeformatterPipe } from './timeformatter.pipe';
import { ToastrService } from 'ngx-toastr';
import { APP_BASE_HREF } from '@angular/common';
import { AuthenticationService } from 'src/services/authentication.service';

describe('SetrulesComponent', () => {
  let component: SetrulesComponent;
  let fixture: ComponentFixture<SetrulesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetrulesComponent, ModalComponent, TimeformatterPipe ],
      imports: [
        SubheaderModule,
        ReactiveFormsModule,
        FormsModule,
        RouterTestingModule,
        HttpClientTestingModule,
        MatProgressSpinnerModule
      ],
      providers: [
        // tslint:disable-next-line: no-use-before-declare
        {provide: ToastrService, useClass: ToastrServiceStub},
        {provide: APP_BASE_HREF, useValue : '/' },
        // tslint:disable-next-line: no-use-before-declare
        {provide: AuthenticationService, useClass: AuthenticationServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetrulesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

});

class ToastrServiceStub {}
class AuthenticationServiceStub {}
