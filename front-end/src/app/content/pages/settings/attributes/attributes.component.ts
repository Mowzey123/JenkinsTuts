import { Component, OnInit, VERSION, ViewEncapsulation, ViewChild, TemplateRef } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { HttpClientModule, HttpClient, HttpRequest, HttpResponse, HttpEventType} from '@angular/common/http';
import { baseurl } from '../../../../../services/config';
import {RulesService} from '../../../../../services/rules.service';
import {NgbModal, NgbModalOptions} from '@ng-bootstrap/ng-bootstrap';
import { AuthenticationService } from '../../../../../services';
import { NotificationService } from '../../../../../services/notification.service';
import { ToastrService } from 'ngx-toastr';
import mydata from '../../rulesengine/data';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-attributes',
  templateUrl: './attributes.component.html',
  styleUrls: ['./attributes.component.css']
})
export class AttributesComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  percentDone: number;
  uploadSuccess: boolean;
  list = [];
  data: {};
  attributes = mydata;
  attributedata: any = {attribute: '', datatype: ''};
  selectedValue = [];
  rule = '';
  attributeid: any;
  idedit = '';
  myattr = [];
  fileToUpload: File = null;
  version = VERSION;
  result: any;
  myfile = 'no';
  // tslint:disable-next-line:max-line-length
  uploadExcel = new FormGroup({
    excel: new FormControl(null, [Validators.required, this.requiredFileType()])
  });
  constructor(
                private router: Router,
                private route: ActivatedRoute,
                private http: HttpClient,
                private rules: RulesService,
                private modalService: NgbModal,
                private auth: AuthenticationService,
                private toastr: ToastrService

              ) {}

  ngOnInit() {
    // this.checktokexpiry();
    this.getUploadedRules();
    this.testobject();
  }

   // tslint:disable-next-line: use-life-cycle-interface
   ngAfterContentInit() {
    this.checktokexpiry();
  }

  testobject() {
    this.myattr = Object.keys(this.attributes);
  }

  upload(files: File[]) {
    // pick from one of the 4 styles of file uploads below
    this.uploadAndProgress(files);
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

  basicUpload(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));
    this.http.post(baseurl + 'uploadRulesFile', formData)
      .subscribe(event => {
      });
    this.getUploadedRules();
  }



  basicUploadSingle(file: File) {
    this.http.post(baseurl + 'uploadRulesFile', file)
      .subscribe(event => {
      });
  }


  uploadAndProgress(files: File[]) {
    const formData = new FormData();
    Array.from(files).forEach(f => formData.append('file', f));

    this.http.post(baseurl + 'uploadRulesFile', formData, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          this.toastr.success('Attributes uploaded');
          this.getUploadedRules();
        }
    });
  }



  uploadAndProgressSingle(file: File) {
    this.checktokexpiry();
    this.http.post(baseurl + 'uploadRulesFile', file, {reportProgress: true, observe: 'events'})
      .subscribe(event => {
        if (event.type === HttpEventType.UploadProgress) {
          this.percentDone = Math.round(100 * event.loaded / event.total);
        } else if (event instanceof HttpResponse) {
          this.uploadSuccess = true;
          this.getUploadedRules();
        }
    });
  }


  navigateRules() {
    const navobbjj = {attributes: this.selectedValue, selectedrule: this.rule};

    if (navobbjj.attributes.length === 0 && navobbjj.selectedrule === '') {
       return ;
    }
    const navextras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(navobbjj),
      }
    };
    this.router.navigate(['/Rac/Rules'], navextras);
  }


  getUploadedRules() {
    this.rules.getAttributes().subscribe((rulesdata) => {
        this.result = rulesdata;
    }, (err) => {
        this.result = {status: false, msg: 'Network Problem'};
    }, () => {
        this.list = this.result.data;
    });
  }

  public get half(): number {
    return Math.ceil(this.list.length / 2);
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  change(e, type) {

    if (e.target.checked) {
      this.selectedValue.push(type);
    }  else {
      this.selectedValue.splice(this.selectedValue.indexOf(type), 1);
    }
  }

  addattribute() {
    const format = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    const result = format.test(this.attributedata.attribute);
    if (result === true) {
       this.toastr.error('Special Characters and Spaces are not allowed ');
     } else {
       this.rules.addAttribute(this.attributedata).subscribe((data) => {
        this.result = data;
      },
      (err) => {
        this.modalService.dismissAll();
        this.result = {status: false, msg: 'Network Problem'};
      },
      () => {
          this.result.status ? this.showsuccess() : this.ShowError() ;
          this.getUploadedRules();
    });
  }



  }

  deleteattribute(id) {

    this.rules.deleteSingleAttribute(id).subscribe((resultdelete) => {
      this.result = resultdelete;
    },
    (error) => {
      this.result = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.toastr.error('Attribute Deleted');
      this.getUploadedRules();
    });
  }


  editMyAttribute() {
    this.rules.editSingleAttribute(
      {
        attributeid: this.attributedata._id,
        attribute: this.attributedata.attribute ,
        datatype: this.attributedata.datatype
      }).subscribe((data) => {
      this.result = data;
    },
    (err) => {
      this.modalService.dismissAll();
      this.result = {status: false, msg: 'Network Problem'};
    },
    () => {
      this.result.status ? this.showsuccess() : this.ShowError() ;
    });
    this.getUploadedRules();
  }


  showsuccess(): void {
    this.toastr.success(this.result.msg);
    this.modalService.dismissAll();
  }

  ShowError(): void {
       this.toastr.error(this.result.msg);
  }

  editAttribute(edit, objj) {
    this.attributedata = objj;
    this.attributeid = objj._id;
    this.modalService.open(edit, { centered: true });
    }



requiredFileType() {
  return function( control: FormControl ) {
    const file = control.value;
    const fileTypes = ['csv', 'xlsx', 'xls'];
    if ( file ) {
      const extension = file.split('.')[1].toLowerCase();
      if (fileTypes.indexOf(extension) == -1  ) {
        // this.myfile = 'yes';
        return {
          requiredFileType: true
        };
      }
      return null;
    }

    return null;
  };
}

  hasError( field: string, error: string ) {
    const control = this.uploadExcel.get(field);
    return control.dirty && control.hasError(error);
  }


  addspaces(x) {
    switch (x) {
      case 'transactionId':
        x = 'Transaction Id';
        break;
      case 'transactionDate':
        x = 'Transaction Date';
        break;
      case 'deviceDetails':
        x = 'Device Details';
        break;
      case 'deviceId':
        x = 'Device Id' ;
        break;
      case 'deviceId':
        x = 'Device Id' ;
        break;
      case 'accountDetails':
        x = 'Account Details' ;
        break;
      case 'paymentMethod':
        x = 'Payment Method' ;
        break;
      case 'productDetails':
        x = 'Product Details' ;
        break;
      case 'amount':
        x = 'Amount' ;
        break;
      case 'time':
        x = 'Time' ;
        break;
      default:
        break;
    }
    return x;
  }

}
