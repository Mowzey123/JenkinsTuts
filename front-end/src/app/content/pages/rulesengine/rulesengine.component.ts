// import { Options } from './../../../../../dist/assets/vendors/perfect-scrollbar/types/perfect-scrollbar.d';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit, VERSION, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationStart, NavigationExtras } from '@angular/router';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { baseurl } from '../../../../services/config';
import {RulesService} from '../../../../services/rules.service';
import { NotificationService } from '../../../../services/notification.service';
import { Observable } from 'rxjs';
import data from '../../pages/transactions/data';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../services';

@Component({
  selector: 'app-rulesengine',
  templateUrl: './rulesengine.component.html',
  styleUrls: ['./rulesengine.component.css']
})
export class RulesengineComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  percentDone: number;
  uploadSuccess: boolean;
  result: any;
  list = [];
  listold = [];
  data: {};
  selectedValue = [];
  rule = {options: '' };

  options = [
    { name: 'Basic'},
    { name: 'Weight Based'},
    { name: 'Time Based'},
    { name: 'Pattern Based'},
    {name: 'Combined Rule'}
  ];

  fileToUpload: File = null;
  version = VERSION;
  model = {options: 'Basic' };
  state$: Observable<object>;
  attributeobjj = data;

  constructor(
            private router: Router,
            private notification: NotificationService,
            private route: ActivatedRoute,
            private http: HttpClient,
            private rules: RulesService,
            private modalService: NgbModal,
            private toastService: ToastrService,
            private auth: AuthenticationService,
           ) {    this.getUploadedRules();
           }

  ngOnInit() {
    this.notification.setSessionfordata({});
    this.getattributes();
  }

    // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
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

  getattributes() {
    this.listold = Object.keys(this.attributeobjj);
  }

  getUploadedRules() {
    // this.checktokexpiry();
    this.rules.getAttributes().subscribe((rulesdata) => {
        this.result = rulesdata;
    }, (err) => {
        this.result = {status: false, msg: 'Network Problem'};
    }, () => {
        this.list = this.result.data;
    });
  }

  upload(files: File[]) {
   this.uploadAndProgress(files);
  }


  basicUpload(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('sampleFile', f));
    this.http.post(baseurl + 'uploadRulesFile', formData)
      .subscribe(event => {
      });
  }



  basicUploadSingle(file: File) {
    // this.checktokexpiry();
    this.http.post(baseurl + 'uploadRulesFile', file)
      .subscribe(event => {
      });
  }


  uploadAndProgress(files: File[]) {
    // this.checktokexpiry();
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));

    this.http.post(baseurl + 'uploadRulesFile', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }



  uploadAndProgressSingle(file: File) {
    this.http.post(baseurl + 'uploadRulesFile', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
        }
    });
  }



  navigateRules() {
     const navobbjj = {attributes: this.selectedValue, selectedrule: this.rule.options};
     if (navobbjj.selectedrule === '') {
      this.toastService.error('please select a rule ');
     }

    //  if ( this.selectedValue.length === 0) {
    //   this.toastService.error('please select an attribute');
    //  }

     if (this.rule.options === 'Basic' ||  this.rule.options === 'Weight Based' || this.rule.options === 'Time Based') {
        if (this.selectedValue.length !== 0 && this.selectedValue.length === 1) {
          // console.log(this.selectedValue);
          this.notification.setSessionfordata(navobbjj);
          this.router.navigate(['/Rac/Rules']);
        } else {
          this.toastService.error('Selected rule takes one attribute');
        }
     } else if ( this.rule.options === 'Combined Rule') {
       if (this.selectedValue.length > 1) {
         this.notification.setSessionfordata(navobbjj);
         this.router.navigate(['/Rac/Rules']);
       } else {
        this.toastService.error('Combined rules take atleast two attributes');
       }
     }
  }


  public get half(): number {
    return Math.ceil(this.list.length / 2);
  }



  change(e, type, keylevel, datatyp) {
    const objj = {key: type, datatype: datatyp, keylevel: 'custom'};
    if (e.target.checked) {
      this.selectedValue.push(objj);
    }  else {
      this.selectedValue.splice(this.selectedValue.indexOf(objj), 1);
    }
  }

  change1(e, key, keylevel, typ) {
     const objj = {key, keylevel, datatype: typ};

     if (e.target.checked) {
      this.selectedValue.push(objj);
    }  else {
      this.selectedValue.splice(this.selectedValue.indexOf(objj), 1);
    }
  }



}
