import { ToastrService } from 'ngx-toastr';
import { NotificationService } from './../../../../../services/notification.service';
import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RulesService } from '../../../../../services/rules.service';
import mydata from '../../../pages/transactions/data';
import { AuthenticationService } from 'src/services';
import { NgbModal, NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-rules',
  templateUrl: './rules.component.html',
  styleUrls: ['./rules.component.css']

})
export class RulesComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  selectedOption: any = '';
  objectselected0: any = '';
  objectselected1: any = '';
  objectselected2: any = '';
  objectselected3: any = '';
  secondOption: any ;
  thirdoption: any;
  printedOption = '';
  attributeselected = ' ';
  combinedrule: any;
  combinedname: any = '';
  result: any;
  timebasedobb: any;
  selectedrule: any;
  combinedobjj: any;
  operater: any;
  operater1: any;
  conditionobjj1: any;
  conditionobjj2: any;
  attribute = [];
  dayselected = [];
  monthselected = [];
  attributeobjj = mydata;
  selectedTime: any;
  datatype: any;
  options = [
    { name: 'basic' },
    { name: 'weighted'},
    { name: 'time' }
  ];


  basicdata = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', value: '', rule: '', name: ''};
  weighteddata = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', from: '', to: '', rule: '', name: ''};
  timedata = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', from: '', to: '', rule: '', name: ''};
  patternerdata = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', value: '', from: '', to: '', rule: ''};

  basicdatacombined = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', value: '', rule: ''};
  weighteddatacombined = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', from: '', to: '', rule: ''};
  timedatacombined = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', from: '', to: '', rule: ''};
  patternerdatacombined = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', value: '', from: '', to: '', rule: ''};

  basicdatacombined1 = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', value: '', rule: ''};
  weighteddatacombined1 = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', from: '', to: '', rule: ''};
  timedatacombined1 = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', from: '', to: '', rule: ''};
  patternerdatacombined1 = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', value: '', from: '', to: '', rule: ''};

  days = [
          {name: 'Monday', number: 1},
          {name: 'Tuesday', number : 2},
          {name: 'Wednesday', number: 3},
          {name: 'Thursday', number: 4},
          {name: 'Friday', number: 5},
          {name: 'Saturday', number: 6},
          {name: 'Sunday', number: 0}
         ];

  months = [
             {name: 'January', number: 1},
             {name: 'February', number: 2},
             {name: 'March', number: 3},
             {name: 'April', number: 4},
             {name: 'May', number: 5},
             {name: 'June', number: 6},
             {name: 'July', number: 7},
             {name: 'August', number: 8},
             {name: 'September', number: 9},
             {name: 'October', number: 10},
             {name: 'November', number: 11},
             {name: 'December', number: 12}
             ];

  combineddata = { };


  condtions = [
                {name: 'equal to', value: 'isequalto'},
                {name: 'not equal', value: 'isnotequal'},
                {name: 'greater than', value: 'isgreaterthan'},
                {name: 'less than', value: 'islessthan'}
              ];


  rules = [
            {rule: 'Block', value: 'block'},
            {rule: 'Hold', value: 'hold'}
          ];
  conditionobjj3: any;

  time = {hour: 13, minute: 30};
  time2 = {hour: 13, minute: 30};
  daysopt = {name: 'daily'};
  time1 = {hour: 13, minute: 30};
  time3 = {hour: 13, minute: 30};
  time4 = {hour: 13, minute: 30};
  time5 = {hour: 13, minute: 30};
  meridian = true;
  spinners = true;
  objjectfinal: any;
  specificdate: any;
  errormesg: any;
  addcondition: any;


  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private notification: NotificationService,
              private rulesservice: RulesService,
              private toastservice: ToastrService,
              private auth: AuthenticationService,
              private modalService: NgbModal,
             ) { }

  ngOnInit() {
    this.notification.currentdata.subscribe(data => this.result = data);
    this.attribute = this.result.attributes;
    this.selectedrule = this.result.selectedrule;
    if (Object.entries(this.result).length < 1 ) {
      this.router.navigate(['/Rac/Rulesengine']);
    }
  }

  // tslint:disable-next-line: use-life-cycle-interface
  ngAfterContentInit() {
    this.checktokexpiry();
  }

  savemethod() {
    // this.checktokexpiry();
    if (this.basicdata.attribute.keylevel !== '') {
      this.basicmethod();
    }

    if (this.weighteddata.attribute.key !== '') {
      this.weightbasedmethod();
    }
    // console.log(this.timedata.attribute.key);

    if (this.timedata.attribute.key !== '') {
      this.timebasedmethod();
    }

    // if ( this.patternerdata.attribute.key !== '') {
    //   this.patternerbasedmthod();
    // }

    if (
        this.basicdatacombined.attribute.keylevel !== '' ||
        this.basicdatacombined1.attribute.keylevel !== '' ||
        this.weighteddatacombined.attribute.key !== '' ||
        this.weighteddatacombined1.attribute.key !== '' ||
        this.patternerdatacombined.attribute.key !== '' ||
        this.patternerdatacombined1.attribute.key !== '' ||
        this.timedatacombined.attribute.key !== '' ||
        this.timedatacombined1.attribute.key !== ''
    ) {
     this.combinedmethod();
    }
  }

  createARulerulesmethod(data) {
      // tslint:disable-next-line:no-shadowed-variable
      this.rulesservice.createARulesmethod(data).subscribe( (data) => {
        this.result = data;
      }, (err) => {
        this.result = {status: false, msg: 'Network Problem'};
      }, () => {
        this.result.status ? this.donavigation() : this.ShowError() ;
        });
  }

  donavigation(): void {
    this.notification.setSessionfordata({});
    this .router.navigate(['Rac/SetRules']);
  }
  ShowError(): void {
    this.toastservice.error('Rule name is required');
  }

  basicmethod() {
     // tslint:disable-next-line:prefer-for-of
      for (let i = 0 ; i < this.attribute.length; i++) {
         if (this.attribute[i].keylevel === this.basicdata.attribute.keylevel ) {
             this.basicdata.attribute.key = this.attribute[i].key;
             this.basicdata.datatype = this.attribute[i].datatype;
         }
     }

      if (
          this.basicdata.attribute.key !== ''
          && this.basicdata.condition !== ''
          && this.basicdata.rule !== ''
          && this.basicdata.value !== ''
          && this.basicdata.datatype !== ''
          // && this.basicdata.attribute.keylevel !== 'time'

        ) {
            const basicobjj = {
                                type: 'basic',
                                conditions: {
                                  key: this.basicdata.attribute.key,
                                  keylevel: this.basicdata.attribute.keylevel,
                                  operator: this.basicdata.condition,
                                  value: this.basicdata.value

                              },
                              rule: this.basicdata.rule,
                              name: this.basicdata.name
                              };
            this.createARulerulesmethod(basicobjj);
           } else {
            // this.toastservice.error('Please fill all the necessary fields');
          }


  }


  weightbasedmethod() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.attribute.length; i++) {
      if (this.attribute[i].keylevel === this.weighteddata.attribute.keylevel ) {
          this.weighteddata.attribute.key = this.attribute[i].key;
          this.weighteddata.datatype = this.attribute[i].datatype;
        }
    }
    if ( this.weighteddata.attribute.key !== ''
         && this.weighteddata.rule !== ''
         && this.weighteddata.from !== ''
         && this.weighteddata.to !== ''
        //  && this.weighteddata.datatype === 'number'
        ) {
            const weightedobjj = {
                                  type: 'weight',
                                  conditions: {
                                                key: this.weighteddata.attribute.key,
                                                keylevel: this.weighteddata.attribute.keylevel,
                                                from: this.weighteddata.from,
                                                to: this.weighteddata.to,
                                              },
                                  rule: this.weighteddata.rule,
                                  name: this.weighteddata.name
                               };
            this.createARulerulesmethod(weightedobjj);

         } else {
          // this.toastservice.error('Please fill all the necessary fields');
        }

  }


  timebasedmethod() {
            // tslint:disable-next-line:prefer-for-of
            for (let i = 0 ; i < this.attribute.length; i++) {
              if (this.attribute[i].key === this.timedata.attribute.key) {
                  this.timedata.attribute.keylevel = this.attribute[i].keylevel;
                  this.timedata.datatype = this.attribute[i].datatype;
              }
            }

            this.timedata.from = JSON.stringify(this.time.hour);
            this.timedata.to = JSON.stringify(this.time2.hour);
            if (this.timedata.attribute.key !== ''
                && this.timedata.rule !== ''
                && this.timedata.from !== ''
                && this.timedata.to !== ''
                && this.timedata.datatype === 'string'
            ) {
                  this.timebasedobb = {
                                        type: 'time',
                                        conditions: [
                                                      {
                                                      key: this.timedata.attribute.key,
                                                      keylevel: this.timedata.attribute.keylevel,
                                                      from: this.timedata.from,
                                                      to: this.timedata.to,
                                                      occurance: 'daily'}
                                                    ],
                                        rule: this.timedata.rule,
                                        name: this.timedata.name
                                      };
                  if ( this.dayselected.length > 0 || this.monthselected.length > 0) {
                      this.timebasedobb = {
                                            type: 'time',
                                            conditions: [
                                                          {key: this.timedata.attribute.key,
                                                          keylevel: this.timedata.attribute.keylevel,
                                                          from: this.timedata.from,
                                                          to: this.timedata.to,
                                                          occurance: 'specific'}
                                                        ],
                                            days: this.dayselected,
                                            months: this.monthselected,
                                            name: this.timedata.name,
                                            rule: this.timedata.rule,

                                          };
                    }
                  this.createARulerulesmethod(this.timebasedobb);
                } else {
                  // this.toastservice.error('Please fill all the necessary fields');
                }
  }


  patternerbasedmthod() {
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0 ; i < this.attribute.length; i++) {
      if (this.attribute[i].key === this.patternerdata.attribute.key ) {
          this.patternerdata.attribute.keylevel = this.attribute[i].keylevel;
      }
    }

    if (this.patternerdata.attribute.key !== ''
        && this.patternerdata.condition !== ''
        && this.patternerdata.rule !== ''
        && this.patternerdata.from !== ''
        &&  this.patternerdata.to !== ''
       ) {
           const patternerobjj = {
                                  type: 'patterner',
                                  conditions: {
                                                key: this.patternerdata.attribute.key,
                                                keylevel: this.patternerdata.attribute.keylevel,
                                                operator: this.patternerdata.condition,
                                                from: this.patternerdata.from,
                                                to: this.patternerdata.to,
                                              },
                                  rule: this.timedata.rule,
                               };
           this.createARulerulesmethod(patternerobjj);
          }

  }

  combinedmethod() {
     this.objectonemethod();
     this.objecttwomethod();
     this.objectthreemethod();
     if (this.combinedrule !== ''
         && this.operater !== ''
         ) {
              this.objjectfinal = {type: 'combined',
                                    conditions: [ this.conditionobjj1,
                                                this.operater,
                                                this.conditionobjj2,
                                              ],
                                   name: this.combinedname,
                                   rule: this.combinedrule
                                  };
            }

     if (this.operater1 !== '') {
                this.objjectfinal = {type: 'combined',
                                    conditions: [ this.conditionobjj1,
                                                  this.operater,
                                                  this.conditionobjj2,
                                                  this.operater1,
                                                  this.conditionobjj3
                                                ],
                                    name: this.combinedname,
                                    rule: this.combinedrule
                                    };

              }
      // console.log(this.objjectfinal);

     this.createARulerulesmethod(this.objjectfinal);



  }


  objectonemethod() {
          this.timedata.from = JSON.stringify(this.time.hour);
          this.timedata.to = JSON.stringify(this.time2.hour);
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.attribute.length; i++) {
            if (this.attribute[i].keylevel === this.basicdata.attribute.keylevel ) {
                this.basicdata.attribute.key = this.attribute[i].key;
            }
          }

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.attribute.length; i++) {
            if (this.attribute[i].key === this.weighteddata.attribute.key ) {
                this.weighteddata.attribute.keylevel = this.attribute[i].keylevel;
            }
          }

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.attribute.length; i++) {
            if (this.attribute[i].key === this.timedata.attribute.key ) {
                this.timedata.attribute.keylevel = this.attribute[i].keylevel;
            }
          }

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.attribute.length; i++) {
            if (this.attribute[i].key === this.patternerdata.attribute.key ) {
                this.patternerdata.attribute.keylevel = this.attribute[i].keylevel;
            }
          }

          if (this.selectedOption === 'basic'
            && this.basicdata.attribute.key !== ''
            && this.basicdata.condition !== ''
            && this.basicdata.value !== ''
            ) {
                this.conditionobjj1 = {
                                          type: 'basic',
                                          conditions: {
                                            key: this.basicdata.attribute.key,
                                            keylevel: this.basicdata.attribute.keylevel,
                                            operator: this.basicdata.condition,
                                            value: this.basicdata.value
                                          },
                                        };
              }

          if (this.selectedOption === 'weighted'
                && this.weighteddata.attribute.key !== ''
                && this.weighteddata.attribute.key !== ''
                && this.weighteddata.from !== ''
                && this.weighteddata.to !== ''
                ) {
                    this.conditionobjj1   =  {
                                              type: 'weight',
                                              conditions: {
                                                            key: this.weighteddata.attribute.key,
                                                            keylevel: this.weighteddata.attribute.keylevel,
                                                            operator: this.weighteddata.condition,
                                                            from: this.weighteddata.from,
                                                            to: this.weighteddata.to,
                                                          },
                                              };
                  }

          if (this.selectedOption === 'time'
                && this.timedata.attribute.key !== ''
                && this.timedata.from !== ''
                && this.timedata.to !== ''
                  ) {
                    this.conditionobjj1 = {
                                              type: 'time',
                                              conditions: {
                                                            key: this.timedata.attribute.key,
                                                            keylevel: this.timedata.attribute.keylevel,
                                                            from: this.timedata.from,
                                                            operator: this.timedata.condition,
                                                            to: this.timedata.to,
                                                            occurance: 'daily'
                                                          },
                                            };
                    if ( this.dayselected.length > 0 || this.monthselected.length > 0) {
                        this.conditionobjj1 = {
                                                type: 'time',
                                                conditions: {
                                                              key: this.timedata.attribute.key,
                                                              keylevel: this.timedata.attribute.keylevel,
                                                              from: this.timedata.from,
                                                              to: this.timedata.to,
                                                              occurance: 'specific',
                                                              days: this.dayselected,
                                                              months: this.monthselected
                                                },
                                              };
                    }
                }

          if (this.selectedOption === 'pattern'
                  && this.patternerdata.attribute.key !== ''
                  && this.patternerdata.from !== ''
                  &&  this.patternerdata.to !== ''
                ) {
                      this.conditionobjj1 = {
                        type: 'patterner',
                        conditions: {
                                      key: this.patternerdata.attribute.key,
                                      keylevel: this.patternerdata.attribute.keylevel,
                                      operator: this.patternerdata.condition,
                                      from: this.patternerdata.from,
                                      to: this.patternerdata.to,
                                    },
                    };
                }
  }

  objecttwomethod() {
          this.timedatacombined.from = JSON.stringify(this.time1.hour);
          this.timedatacombined.to = JSON.stringify(this.time3.hour);
          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.attribute.length; i++) {
            if (this.attribute[i].keylevel === this.basicdatacombined.attribute.keylevel ) {
                this.basicdatacombined.attribute.key = this.attribute[i].key;
            }
          }

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.attribute.length; i++) {
            if (this.attribute[i].key === this.weighteddatacombined.attribute.key ) {
                this.weighteddatacombined.attribute.keylevel = this.attribute[i].keylevel;
            }
          }

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.attribute.length; i++) {
            if (this.attribute[i].key === this.timedatacombined.attribute.key ) {
                this.timedatacombined.attribute.keylevel = this.attribute[i].keylevel;
            }
          }

          // tslint:disable-next-line:prefer-for-of
          for (let i = 0 ; i < this.attribute.length; i++) {
            if (this.attribute[i].key === this.patternerdatacombined.attribute.key ) {
                this.patternerdatacombined.attribute.keylevel = this.attribute[i].keylevel;
            }
          }

          if (this.secondOption === 'basic'
              && this.basicdatacombined.attribute.key !== ''
              && this.basicdatacombined.value !== ''
          ) {
                  this.conditionobjj2 = {
                                          type: 'basic',
                                          conditions: {
                                            key: this.basicdatacombined.attribute.key,
                                            keylevel: this.basicdatacombined.attribute.keylevel,
                                            operator: this.basicdatacombined.condition,
                                            value: this.basicdatacombined.value
                                          },
                                        };
              }

          if (this.secondOption === 'weighted'
            && this.weighteddatacombined.attribute.key !== ''
            && this.weighteddatacombined.from !== ''
            && this.weighteddatacombined.to !== ''
          ) {
          this.conditionobjj2   =  {
                                      type: 'weight',
                                      conditions: {
                                                    key: this.weighteddatacombined.attribute.key,
                                                    keylevel: this.weighteddatacombined.attribute.keylevel,
                                                    from: this.weighteddatacombined.from,
                                                    to: this.weighteddatacombined.to,
                                                  },
                                    };
          }

          if (this.secondOption === 'time'
          && this.timedatacombined.attribute.key !== ''
          && this.timedatacombined.from !== ''
          && this.timedatacombined.to !== ''
              ) {
                  this.conditionobjj2 = {
                                            type: 'time',
                                            conditions: {
                                                          key: this.timedatacombined.attribute.key,
                                                          keylevel: this.timedatacombined.attribute.keylevel,
                                                          from: this.timedatacombined.from,
                                                          operator: this.timedata.condition,
                                                          to: this.timedatacombined.to,
                                                          occurance: 'daily'
                                                        },
                                          };
                  if ( this.dayselected.length > 0 || this.monthselected.length > 0) {
                      this.conditionobjj2 = {
                                              type: 'time',
                                              conditions: {
                                                            key: this.timedatacombined.attribute.key,
                                                            keylevel: this.timedatacombined.attribute.keylevel,
                                                            from: this.timedatacombined.from,
                                                            to: this.timedatacombined.to,
                                                            occurance: 'specific',
                                                            days: this.dayselected,
                                                            months: this.monthselected
                                              },
                                            };
                  }
              }


          if (this.secondOption === 'pattern'
          && this.patternerdatacombined.attribute.key !== ''
          && this.patternerdatacombined.from !== ''
          &&  this.patternerdatacombined.to !== ''
          ) {
              this.conditionobjj2 = {
                type: 'patterner',
                conditions: {
                              key: this.patternerdatacombined.attribute.key,
                              keylevel: this.patternerdatacombined.attribute.keylevel,
                              operator: this.patternerdatacombined.condition,
                              from: this.patternerdatacombined.from,
                              to: this.patternerdatacombined.to,
                            },
              };
          }
  }

  objectthreemethod() {
        // this.timedatacombined.from = JSON.stringify(this.time1.hour);
        // this.timedatacombined.to = JSON.stringify(this.time3.hour);
        this.timedatacombined1.from = JSON.stringify(this.time4.hour);
        this.timedatacombined1.to = JSON.stringify(this.time5.hour);
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < this.attribute.length; i++) {
          if (this.attribute[i].keylevel === this.basicdatacombined1.attribute.keylevel ) {
              this.basicdatacombined1.attribute.key = this.attribute[i].key;
          }
        }

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < this.attribute.length; i++) {
          if (this.attribute[i].key === this.weighteddatacombined1.attribute.key ) {
              this.weighteddatacombined1.attribute.keylevel = this.attribute[i].keylevel;
          }
        }

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < this.attribute.length; i++) {
          if (this.attribute[i].key === this.timedatacombined1.attribute.key ) {
              this.timedatacombined1.attribute.keylevel = this.attribute[i].keylevel;
          }
        }

        // tslint:disable-next-line:prefer-for-of
        for (let i = 0 ; i < this.attribute.length; i++) {
          if (this.attribute[i].key === this.patternerdatacombined1.attribute.key ) {
              this.patternerdatacombined1.attribute.keylevel = this.attribute[i].keylevel;
          }
        }


        if (this.thirdoption === 'basic'
            && this.basicdatacombined1.attribute.key !== ''
            && this.basicdatacombined1.value !== ''
        ) {
                this.conditionobjj3 = {
                                        type: 'basic',
                                        conditions: {
                                          key: this.basicdatacombined1.attribute.key,
                                          keylevel: this.basicdatacombined1.attribute.keylevel,
                                          operator: this.basicdatacombined1.condition,
                                          value: this.basicdatacombined1.value
                                        },
                                      };
            }

        if (this.thirdoption === 'weighted'
          && this.weighteddatacombined1.attribute.key !== ''
          && this.weighteddatacombined1.from !== ''
          && this.weighteddatacombined1.to !== ''
        ) {
        this.conditionobjj3   =  {
                                    type: 'weight',
                                    conditions: {
                                                  key: this.weighteddatacombined1.attribute.key,
                                                  keylevel: this.weighteddatacombined1.attribute.keylevel,
                                                  from: this.weighteddatacombined1.from,
                                                  operator: this.patternerdatacombined.condition,
                                                  to: this.weighteddatacombined1.to,
                                                },
                                  };
        }

        if (this.thirdoption === 'time'
        && this.timedatacombined1.attribute.key !== ''
        && this.timedatacombined1.from !== ''
        && this.timedatacombined1.to !== ''
            ) {
                this.conditionobjj3 = {
                                          type: 'time',
                                          conditions: {
                                                        key: this.timedatacombined1.attribute.key,
                                                        keylevel: this.timedatacombined1.attribute.keylevel,
                                                        from: this.timedatacombined1.from,
                                                        to: this.timedatacombined1.to,
                                                        occurance: 'daily'
                                                      },
                                        };
                if ( this.dayselected.length > 0 || this.monthselected.length > 0) {
                    this.conditionobjj3 = {
                                            type: 'time',
                                            conditions: {
                                                          key: this.timedatacombined1.attribute.key,
                                                          keylevel: this.timedatacombined1.attribute.keylevel,
                                                          from: this.timedatacombined1.from,
                                                          to: this.timedatacombined1.to,
                                                          occurance: 'specific',
                                                          days: this.dayselected,
                                                          months: this.monthselected
                                            },
                                          };
                }
            }


        if (this.thirdoption === 'pattern'
        && this.patternerdatacombined1.attribute.key !== ''
        && this.patternerdatacombined1.from !== ''
        &&  this.patternerdatacombined1.to !== ''
        ) {
            this.conditionobjj3 = {
              type: 'patterner',
              conditions: {
                            key: this.patternerdatacombined1.attribute.key,
                            keylevel: this.patternerdatacombined1.attribute.keylevel,
                            operator: this.patternerdatacombined1.condition,
                            from: this.patternerdatacombined1.from,
                            to: this.patternerdatacombined1.to,
                          },
            };
        }


  }



  changemonths(e, type) {
    if (e.target.checked) {
      this.monthselected.push(type);

    }  else {
      this.monthselected.splice(this.dayselected.indexOf(type), 1);
    }
  }

  changedays(e, key ) {
    if (e.target.checked) {
        this.dayselected.push(key);
    }  else {
      this.dayselected.splice(this.dayselected.indexOf(key), 1);
    }
  }

  specific(e) {
    if (e.target.checked) {
     this.specificdate = 'show';
   }  else {
     this.specificdate = 'end';
   }
 }

 addCondition() {
   this.addcondition = 'yes';
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

  onChange(e, index) {
    if (e.target.value === 'paymentMethod') {
          switch (index) {
            case 0:
              this.objectselected0 = e.target.value + index;
              break;
            case 1:
              this.objectselected1 = e.target.value + index;
              break;
            case 2:
              this.objectselected2 = e.target.value + index;
              break;
            case 3:
              this.objectselected3 = e.target.value + index;
              break;
            default:
              break;
          }
      } else if (e.target.value !== 'paymentMethod') {
        switch (index) {
          case 0:
            this.objectselected0 = '';
            break;
          case 1:
            this.objectselected1 = '';
            break;
          case 2:
            this.objectselected2 = '';
            break;
          case 3:
            this.objectselected3 = '';
            break;
          default:
            break;
        }
    }
  }

  back() {
    this.notification.setSessionfordata({});
    this.router.navigate(['Rac/Rulesengine']);
  }
}
