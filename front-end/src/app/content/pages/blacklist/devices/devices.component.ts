import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { BlacklistService } from '../../../../../services/blacklist.service';
import { AuthenticationService } from '../../../../../services';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-devices',
  templateUrl: './devices.component.html',
  styleUrls: ['./devices.component.css']
})
export class DevicesComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  color = 'primary';
  mode = 'indeterminate';
  values = 50;
  spinnerDiameter = 1;
  show: boolean;
  showSpinner: boolean;
  listdata: any;
  list = [];
  // data = {};
  result: any;
  errormesg = '';
  resultdata: any;
  term;


  constructor(
               private modalService: NgbModal,
               private toastr: ToastrService,
               private blacklist: BlacklistService,
               private auth: AuthenticationService,
               ) { }


  form = new FormGroup({
    deviceid: new FormControl(''),
    devicemodel: new FormControl(''),
    imei: new FormControl('')
  });

  ngOnInit() {
    this.getblacklisteDevice();
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  addmethod() {
    // this.checktokexpiry();
    const device = {deviceid: this.form.value.deviceid, devicemodel: this.form.value.devicemodel, imei: this.form.value.imei};
    this.form.reset();

    this.blacklist.addBlackListedDevice(device).subscribe((data) => {
        this.result = data;
      },
      (err) => {
        this.modalService.dismissAll();
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
          this.result.status ? this.showsuccess() : this.ShowError() ;
          this.getblacklisteDevice();
    });
  }

  getblacklisteDevice() {
       this.showSpinner = true;
      // this.checktokexpiry();
      this.blacklist.getBlackListedDevices().subscribe((blacklist) => {
        this.listdata = blacklist;
      },
      (err) => {
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
        this.list = this.listdata.data;
        this.showSpinner = false;
        if (!Array.isArray(this.list) || !this.list.length) {
          this.show = true;
        } else {
          this.show = false;
        }
      });
  }

  deleteDevice(id) {
    this.checktokexpiry();
    this.blacklist.deleteFromBlackListedDevice(id).subscribe((resultdelete) => {
      this.result = resultdelete;
    },
    (error) => {
      this.result = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.toastr.success('Device Deleted');
      this.getblacklisteDevice();
    });
  }


  showsuccess(): void {
      this.modalService.dismissAll();
      this.toastr.success(this.result.msg);
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
    // this.modalService.dismissAll();
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
}
