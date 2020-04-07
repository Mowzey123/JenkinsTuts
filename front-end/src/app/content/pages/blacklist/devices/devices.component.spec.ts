import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DevicesComponent } from './devices.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material';
// import { PipesModule } from 'src/app/core/pipes/pipes.module';
import { ModalComponent } from '../../modal/modal.component';
import { ToastrService } from 'ngx-toastr';
import { BlacklistService } from 'src/services/blacklist.service';
import { AuthenticationService } from 'src/services';
import { of } from 'rxjs';

describe('DevicesComponent', () => {
  let component: DevicesComponent;
  let fixture: ComponentFixture<DevicesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DevicesComponent, ModalComponent ],
      imports: [
        ReactiveFormsModule,
        FormsModule,
        MatProgressSpinnerModule,
      ],
      providers: [
        // tslint:disable-next-line: no-use-before-declare
        {provide: ToastrService, useClass: ToastrServiceStub},
        // tslint:disable-next-line: no-use-before-declare
        {provide: BlacklistService, useClass: BlacklistServiceStub},
        // tslint:disable-next-line: no-use-before-declare
        {provide: AuthenticationService, useClass: AuthenticationServiceStub}
      ],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DevicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

class ToastrServiceStub {}
class BlacklistServiceStub {

  getBlackListedDevices () {
    const listdata = [{id: 1}];
    return of( listdata );

  }
}
class AuthenticationServiceStub {}
