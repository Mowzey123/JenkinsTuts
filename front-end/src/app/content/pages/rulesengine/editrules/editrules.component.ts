import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { NotificationService } from './../../../../../services/notification.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RulesService } from '../../../../../services/rules.service';
import mydata from '../../../pages/transactions/data';
import { AuthenticationService } from '../../../../../services';
import { NgbModalOptions, NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-editrules',
  templateUrl: './editrules.component.html',
  styleUrls: ['./editrules.component.css']
})
export class EditrulesComponent implements OnInit {
  @ViewChild('LoginModal') LogiModal: TemplateRef<any>;
  selectedOption: any = '';
  secondOption: any = '';
  thirdoption: any = '';
  printedOption = '';
  attributeselected = ' ';
  combinedrule: any;
  result: any;
  timebasedobb: any;
  selectedrule: any;
  selectedname: any;
  combinedobjj: any;
  combinednamenew: any;
  operater: any;
  operater1: any;
  conditionobjj1: any;
  conditionobjj2: any;
  attribute = [];
  dayselected = [7];
  monthselected = [13];
  attributeobjj = mydata;
  selectedTime: any;
  ruletodisplay: any;
  showthird = false;
  specificdate: any;
  options = [
    { name: 'basic' },
    { name: 'weighted', },
    { name: 'time' },
    { name: 'pattern' }
  ];

 second = [
    { name: 'basic'},
    { name: 'weight' },
    { name: 'time'},
    { name: 'pattern'}
  ];

  third =  [
    { name: 'basic'},
    { name: 'weighted' },
    { name: 'time', },
    { name: 'pattern', value: 4 }
  ];

  basicdata = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', value: '', rule: ''};
  weighteddata = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', from: '', to: '', rule: ''};
  timedata = {attribute: {key: '', keylevel: ''}, datatype: '', condition: '', from: '', to: '', rule: ''};
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


  rules = [ {rule: 'Pass', value: 'pass'},
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
  editedobject: any;
  toggleMeridian() {
    this.meridian = !this.meridian;
  }

  constructor(
              private route: ActivatedRoute,
              private router: Router,
              private modalService: NgbModal,
              private notification: NotificationService,
              private rulesservice: RulesService,
              private toastservice: ToastrService,
              private auth: AuthenticationService,
             ) {
                this.rulesservice.currentdata.subscribe(data => this.result = data);
                this.getobjectmethod();
                }

  ngOnInit() {
    // this.checktokexpiry();
    this.attribute.push(this.result.conditions[0].key);
    // console.log(this.result);
    if (Object.entries(this.result).length < 1 ) {
      this.router.navigate(['/Rac/SetRules']);
    }
  }

   // tslint:disable-next-line: use-life-cycle-interface
   ngAfterContentInit() {
    this.checktokexpiry();
  }

 getobjectmethod() {
  if (this.result.type === 'basic') {
    this.basicdata.attribute.key = this.result.conditions[0].key;
    this.basicdata.attribute.keylevel = this.result.conditions[0].keylevel;
    this.basicdata.condition = this.result.conditions[0].operator;
    this.basicdata.value = this.result.conditions[0].value;
    this.basicdata.rule  = this.result.rule;
    this.ruletodisplay  = this.result.rule;
    this.selectedrule  = this.result.type;
    this.selectedname  = this.result.name;
  }

  if (this.result.type === 'weight') {
    this.weighteddata.attribute.key = this.result.conditions[0].key;
    this.weighteddata.attribute.keylevel = this.result.conditions[0].keylevel;
    this.weighteddata.from  = this.result.conditions[0].from;
    this.weighteddata.to  = this.result.conditions[0].to;
    this.weighteddata.rule = this.result.rule;
    this.ruletodisplay  = this.result.rule;
    this.selectedrule  = this.result.type;
    this.selectedname  = this.result.name;
  }

  if (this.result.type === 'time') {
    this.timedata.attribute.key = this.result.conditions[0].key;
    this.timedata.attribute.keylevel = this.result.conditions[0].keylevel;
    this.timedata.from  = this.result.conditions[0].from;
    this.timedata.to  = this.result.conditions[0].to;
    this.timedata.rule = this.result.rule;
    this.ruletodisplay  = this.result.rule;
    this.selectedrule  = this.result.type;
    this.selectedname  = this.result.name;
    this.time.hour = this.result.conditions[0].from;
    this.time2.hour = this.result.conditions[0].to;

    if (this.result.conditions[0].occurance === 'specific') {
       this.dayselected = this.result.days;
       this.monthselected = this.result.months;
    }
  }
  this.getobjectforcombined();
 }

 getobjectforcombined() {
  if (this.result.type === 'combined') {
    this.selectedrule  = this.result.type;
    this.selectedname  = this.result.name;
    if (this.result.conditions[0].type === 'basic') {
         this.selectedOption = this.result.conditions[0].type;
         this.basicdata.attribute.key = this.result.conditions[0].conditions.key;
         this.basicdata.attribute.keylevel = this.result.conditions[0].conditions.keylevel;
         this.basicdata.condition = this.result.conditions[0].conditions.operator;
         this.basicdata.value = this.result.conditions[0].conditions.value;
      }

    if (this.result.conditions[0].type === 'weight') {
        this.selectedOption = this.result.conditions[0].type;
        this.weighteddata.attribute.key = this.result.conditions[0].conditions.key;
        this.weighteddata.attribute.keylevel = this.result.conditions[0].conditions.keylevel;
        this.weighteddata.from  = this.result.conditions[0].conditions.from;
        this.weighteddata.to  = this.result.conditions[0].conditions.to;
      }

    if (this.result.conditions[0].type === 'time') {
        this.selectedOption = this.result.conditions[0].type;
        this.timedata.attribute.key = this.result.conditions[0].conditions.key;
        this.timedata.attribute.keylevel = this.result.conditions[0].conditions.keylevel;
        this.timedata.from  = this.result.conditions[0].conditions.from;
        this.timedata.to  = this.result.conditions[0].conditions.to;
        this.timedata.rule = this.result.rule;
        this.selectedrule  = this.result.type;
        this.time1.hour = this.result.conditions[0].conditions.from;
        this.time3.hour = this.result.conditions[0].conditions.to;
        this.dayselected.push( this.result.days);
        this.monthselected.push(this.result.months);
      }
    this.operater = this.result.conditions[1];
// second edit
    if (this.result.conditions[2].type === 'basic') {
         this.secondOption = this.result.conditions[2].type;
         this.basicdatacombined.attribute.key = this.result.conditions[2].conditions.key;
         this.basicdatacombined.attribute.keylevel = this.result.conditions[2].conditions.keylevel;
         this.basicdatacombined.condition = this.result.conditions[2].conditions.operator;
         this.basicdatacombined.value = this.result.conditions[2].conditions.value;
      }

    if (this.result.conditions[2].type === 'weight') {
        this.secondOption = this.result.conditions[2].type;
        this.weighteddatacombined.attribute.key = this.result.conditions[2].conditions.key;
        this.weighteddatacombined.attribute.keylevel = this.result.conditions[2].conditions.keylevel;
        this.weighteddatacombined.from  = this.result.conditions[2].conditions.from;
        this.weighteddatacombined.to  = this.result.conditions[2].conditions.to;
      }

    if (this.result.conditions[2].type === 'time') {
        this.secondOption = 'time';
        this.timedatacombined.attribute.key = this.result.conditions[2].conditions.key;
        this.timedatacombined.attribute.keylevel = this.result.conditions[2].conditions.keylevel;
        this.timedatacombined.from  = this.result.conditions[2].conditions.from;
        this.timedatacombined.to  = this.result.conditions[2].conditions.to;
        this.timedatacombined.rule = this.result.rule;
        this.selectedrule  = this.result.type;
        this.time.hour = this.result.conditions[2].conditions.from;
        this.time2.hour = this.result.conditions[2].conditions.to;
        this.dayselected.push(this.result.conditions[2].conditions.days);
        this.monthselected.push( this.result.conditions[2].conditions.months);
      }
    this.operater1 = this.result.conditions[3];
 // third
    if (this.result.conditions.length > 3 && this.result.conditions[3] != null  ) {
       if (this.result.conditions[4].type === 'basic') {
        this.thirdoption = 'basic';
        this.basicdatacombined1.attribute.key = this.result.conditions[4].conditions.key;
        this.basicdatacombined1.attribute.keylevel = this.result.conditions[4].conditions.keylevel;
        this.basicdatacombined1.condition = this.result.conditions[4].conditions.operator;
        this.basicdatacombined1.value = this.result.conditions[4].conditions.value;
      }

       if (this.result.conditions[4].type === 'weight') {
           this.thirdoption = 'weight';
           this.weighteddatacombined1.attribute.key = this.result.conditions[4].conditions.key;
           this.weighteddatacombined1.attribute.keylevel = this.result.conditions[4].conditions.keylevel;
           this.weighteddatacombined1.from  = this.result.conditions[4].conditions.from;
           this.weighteddatacombined1.to  = this.result.conditions[4].conditions.to;
      }

       if (this.result.conditions[4].type === 'time') {
           this.thirdoption =  'time';
           this.timedatacombined1.attribute.key = this.result.conditions[4].conditions.key;
           this.timedatacombined1.attribute.keylevel = this.result.conditions[4].conditions.keylevel;
           this.timedatacombined1.from  = this.result.conditions[4].conditions.from;
           this.timedatacombined1.to  = this.result.conditions[4].conditions.to;
           this.timedatacombined1.rule = this.result.rule;
           this.selectedrule  = this.result.type;
           this.time4.hour = this.result.conditions[4].conditions.from;
           this.time5.hour = this.result.conditions[4].conditions.to;
           this.dayselected.push(this.result.conditions[4].conditions.days);
           this.monthselected.push(this.result.conditions[4].conditions.months);
      }
     }
     }
  this.combinedrule = this.result.rule;
    }



  savemethod(type) {
    this.checktokexpiry();
    if (this.basicdata.attribute.key !== '') {
      this.basicmethod(type);
    }

    if (this.weighteddata.attribute.key !== '') {
      this.weightbasedmethod(type);
    }

    if (this.timedata.attribute.key !== '') {
      this.timebasedmethod(type);
    }

    if ( this.patternerdata.attribute.key !== '') {
      this.patternerbasedmthod();
    }
    if (
        this.basicdatacombined.attribute.key !== '' ||
        this.basicdatacombined1.attribute.key !== '' ||
        this.weighteddatacombined.attribute.key !== '' ||
        this.weighteddatacombined1.attribute.key !== '' ||
        this.patternerdatacombined.attribute.key !== '' ||
        this.patternerdatacombined1.attribute.key !== '' ||
        this.timedatacombined.attribute.key !== '' ||
        this.timedatacombined1.attribute.key !== ''
    ) {
       this.combinedmethod(type);
     }
  }


  EditRulerulesmethod(data) {
      this.rulesservice.editrulesmethod(data).subscribe((data) => {
        this.result = data;
      }, (err) => {
      }, () => {
        this.router.navigate(['Rac/SetRules']);
      });
  }

  saveasmethod(data) {
    // tslint:disable-next-line:no-shadowed-variable
    this.rulesservice.createARulesmethod(data).subscribe( (data) => {
      this.result = data;
    }, (err) => {
      this.result = {status: false, msg: 'Network Problem'};
    }, () => {
      this.modalService.dismissAll();
      this.router.navigate(['Rac/SetRules']);
      this.notification.setSessionfordata({});
    });

}

  basicmethod(type) {

    if (
          this.basicdata.attribute.key !== ''
          && this.basicdata.condition !== ''
          && this.basicdata.attribute.keylevel !== ''
          && this.basicdata.rule !== ''
          && this.basicdata.value !== ''
        ) {
            const basicobjj = {
                                type: 'basic',
                                conditions: {
                                  key: this.basicdata.attribute.key,
                                  keylevel: this.basicdata.attribute.keylevel,
                                  operator: this.basicdata.condition,
                                  value: this.basicdata.value
                                },
                                name: this.selectedname,
                                rule: this.basicdata.rule,
                                ruleid: this.result._id,
                              };

            if (type === 'save') {
              this.EditRulerulesmethod(basicobjj);
            } else {
               this.saveasmethod(basicobjj);
            }

           } else {
            //  this.toastservice.error('One field is missing');
           }



  }


  weightbasedmethod(type) {

    if ( this.weighteddata.attribute.key !== ''
          && this.weighteddata.attribute.key !== ''
         && this.weighteddata.rule !== ''
         && this.weighteddata.from !== ''
         && this.weighteddata.to !== ''

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
                                  name: this.selectedname,
                                  ruleid: this.result._id
                               };

            if (type === 'save') {
                                this.EditRulerulesmethod(weightedobjj);
                              } else {
                                 this.saveasmethod(weightedobjj);
                              }
         } else {

         }


  }


  timebasedmethod(type) {

            this.timedata.from = JSON.stringify(this.time.hour);
            this.timedata.to = JSON.stringify(this.time2.hour);
            if (this.timedata.attribute.key !== ''
                && this.timedata.rule !== ''
                && this.timedata.from !== ''
                && this.timedata.to !== ''
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
                                        name: this.selectedname,
                                        ruleid: this.result._id
                                      };
                  if ( this.dayselected.length > 1 || this.monthselected.length > 1) {
                      this.timebasedobb = {
                                            type: 'time',
                                            conditions: [
                                                          {key: this.timedata.attribute.key,
                                                          keylevel: this.timedata.attribute.keylevel,
                                                          from: this.timedata.from,
                                                          to: this.timedata.to,
                                                          occurance: 'specific'}
                                                        ],
                                            days: this.dayselected[1],
                                            months: this.monthselected[1],
                                            rule: this.timedata.rule,
                                            ruleid: this.result._id
                                          };
                    }
                  if (type === 'save') {
                      this.EditRulerulesmethod(this.timebasedobb);
                    } else {
                       this.saveasmethod(this.timebasedobb);
                    }
              } else {
              this.toastservice.error('Selected attribute is not applied here');
            }
  }


  patternerbasedmthod() {
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
                                  ruleid: this.result._id
                               };
           this.EditRulerulesmethod(patternerobjj);
          }

  }

  combinedmethod(type) {
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
                                   rule: this.combinedrule,
                                   name: this.selectedname,
                                   ruleid: this.result._id
                                  };
            }

     if (this.basicdatacombined1.attribute.key !== '') {
          this.objjectfinal = {type: 'combined',
                               conditions: [ this.conditionobjj1,
                                            this.operater,
                                            this.conditionobjj2,
                                            this.operater1,
                                            this.conditionobjj3
                                          ],
                               rule: this.combinedrule,
                               name: this.selectedname,
                               ruleid: this.result._id
                              };

        }

     if (type === 'save') {
          this.EditRulerulesmethod(this.objjectfinal);
        } else {
           this.saveasmethod(this.objjectfinal);
        }
  }


  objectonemethod() {
          this.timedata.from = JSON.stringify(this.time.hour);
          this.timedata.to = JSON.stringify(this.time2.hour);

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

          if (this.selectedOption === 'weight'
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
                    if ( this.dayselected.length > 1 || this.monthselected.length > 1) {
                        this.conditionobjj1 = {
                                                type: 'time',
                                                conditions: {
                                                              key: this.timedata.attribute.key,
                                                              keylevel: this.timedata.attribute.keylevel,
                                                              to: this.timedata.to,
                                                              occurance: 'specific',
                                                              days: this.dayselected[1],
                                                              months: this.monthselected[1]
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

          if (this.secondOption === 'weight'
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
                  if ( this.dayselected.length > 1 || this.monthselected.length > 1) {
                      this.conditionobjj2 = {
                                              type: 'time',
                                              conditions: {
                                                            key: this.timedatacombined.attribute.key,
                                                            keylevel: this.timedatacombined.attribute.keylevel,
                                                            from: this.timedatacombined.from,
                                                            to: this.timedatacombined.to,
                                                            occurance: 'specific',
                                                            days: this.dayselected[1],
                                                            months: this.monthselected[1]
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
        this.timedatacombined.from = JSON.stringify(this.time4.hour);
        this.timedatacombined.to = JSON.stringify(this.time5.hour);

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
                if ( this.dayselected.length > 1 || this.monthselected.length > 1) {
                    this.conditionobjj3 = {
                                            type: 'time',
                                            conditions: {
                                                          key: this.timedatacombined1.attribute.key,
                                                          keylevel: this.timedatacombined1.attribute.keylevel,
                                                          from: this.timedatacombined1.from,
                                                          to: this.timedatacombined1.to,
                                                          occurance: 'specific',
                                                          days: this.dayselected[1],
                                                          months: this.monthselected[1]
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

  testchechmethod(item) {
    if (this.dayselected.length > 0) {
      // tslint:disable-next-line:prefer-for-of
      for (let i = 0; i < this.dayselected.length; i++) {
        if (this.dayselected[i] === item) {
          return true;
        }
      }
   } else {
      return true;
   }
  }

  testchechmethod1(item) {
    if (this.monthselected.length > 0) {
        // tslint:disable-next-line:prefer-for-of
        for (let i = 0; i < this.monthselected.length; i++) {
          if (this.monthselected[i] === item) {
            return true;
          }
        }
    } else {
      return false;
    }
  }

  specific(e) {
    if (e.target.checked) {
     this.specificdate = 'show';
   }  else {
     this.specificdate = 'end';
   }
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
  openBackDropCustomClass(SaveAs) {
    this.modalService.open(SaveAs, {backdropClass: 'light-blue-backdrop'});
  }


  addspaces(x){
    switch(x){
      case 'isequalto':
        x= 'is equal to';
      break;
      case 'isnotequal':
        x = 'is not equal';
      break;
      case 'islessthan':
        x = 'is less than';
      break;
      case 'isgreaterthan':
        x = 'is greater than' ;
      break;
      default:
        break;
    }
    return x;
  }

}
