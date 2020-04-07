import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { DatatableComponent } from '@swimlane/ngx-datatable';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { UserService } from '../../../../../services/user.service';
import { ToastrService } from 'ngx-toastr';
import { AuthenticationService } from '../../../../../services';
import { JwtHelperService } from '@auth0/angular-jwt';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  // encapsulation: ViewEncapsulation.None,
  styleUrls: ['./users.component.scss']
})

export class UsersComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  data = { firstname: '', lastname: '', email: '', role: '', phone: '', userid: ''};
  roles = ['developer', 'rac manager'];
  list = [];
  result: any;
  errormesg = '';
  editdata: any;
  resultedit: any;
  userid: any;
  testrole: any = '';
  term;
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  show: boolean;
  showSpinner: boolean;
  theCheckbox = false;
  constructor(private modalService: NgbModal,
              private userservice: UserService,
              private auth: AuthenticationService,
              private toastr: ToastrService) { }

  ngOnInit() {
    const token = this.auth.getAuthToken();
    const helper = new JwtHelperService();
    const decodedToken = helper.decodeToken(token);
    this.testrole = decodedToken.role;
    // this.checktokexpiry();
    this.getusersdata();
  }

    // tslint:disable-next-line: use-life-cycle-interface
    ngAfterContentInit() {
      this.checktokexpiry();
    }

  addmethod() {
     this.checktokexpiry();
     this.userservice.addUserprofile({firstname: this.data.firstname,
                                      lastname: this.data.lastname,
                                      email: this.data.email,
                                      role: this.data.role,
                                      phone: this.data.phone})
        .subscribe((datadded) => {
                this.result = datadded;
              },
              (err) => {
                this.result = {status: false, msg: 'Network Problem'};
              },
              () => {
                this.result.status ? this.showsuccess() : this.ShowError() ;
                this.getusersdata();
      });

  }


  change(event, id) {
    if (event.target.checked) {
      this.enableUser(id);
    }  else {
      this.deleteUser(id);
    }

  }

  deleteUser(id) {
    this.userservice.deleteUserProfile({memberid: id}).subscribe((resultdelete) => {
      this.result = resultdelete;
    },
    (error) => {
      this.result = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.toastr.error('Account Disabled');
      this.getusersdata();
    });
  }

  enableUser(id) {
    this.userservice.enableUserProfile({memberid: id}).subscribe((resultdelete) => {
      this.result = resultdelete;
    },
    (error) => {
      this.result = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.toastr.success('Account Enabled');
      this.getusersdata();
    });
  }

  getusersdata() {
    this.showSpinner = true;
    // this.checktokexpiry();
    this.userservice.getusers().subscribe((userdata) => {
        this.result = userdata;
      }, (err) => {
          this.result = {statsu: false, msg: 'Network Problem'};
      }, () => {
          this.list = this.result.data;
          setTimeout(() => {
            this.showSpinner = false;
           }, 0);
          if (!Array.isArray(this.list) || !this.list.length) {
            this.show = true;
          } else {
            this.show = false;
          }
     });
  }

  edituser() {
    this.checktokexpiry();
    this.userservice.adminedituserinfo(this.data).subscribe((data) => {
      this.result = data;
    },
    () => {
      this.result = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.result.status ? this.showsuccess() : this.ShowError() ;
    });
    this.getusersdata();
  }

  showsuccess(): void {
    this.toastr.success(this.result.msg);
    this.modalService.dismissAll();
  }

  ShowError(): void {
    if (this.result.msg === 'Service request failed') {
      this.toastr.error(this.result.error[0].val);
    } else {
      this.toastr.error(this.result.msg);
    }
  }
  openBackDropCustomClass(content) {
    this.modalService.open(content, {backdropClass: 'light-blue-backdrop'});
  }

  openLg(content) {
    this.modalService.open(content);
  }

   openModal(edit, objj) {
    this.data = objj;
    this.userid = objj._id;
    this.data.userid = objj._id;
    this.modalService.open(edit, { size: 'lg' });
  }

  checktokexpiry() {
    setTimeout(() => {
      if (this.auth.checkiftokenisabouttoexpire() === 'true') {
        const ngbModalOptions: NgbModalOptions = {
          backdrop : 'static',
          keyboard : false
      };
        this.modalService.open(this.LogiModal, ngbModalOptions);
      } else {}
    }, 0);
  }

  checkout(item) {
    if (item.active === true) {
        return true;
    } else {
      return false;
    }
  }

}
