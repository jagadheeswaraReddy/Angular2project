import {Component, OnInit}            from '@angular/core';

import {User, Employee}                 from '../_models/index';
import {EmployeeService, TitleService, AlertService}          from '../_services/index';
import {Router} from "@angular/router";
import {YearlyEntitlement} from "../_models/yearly-entitlement";
import {YearlyEntitlementService} from "../_services/yearly-entitlement.service";
import {LeaveType} from "../_models/leave-type";

@Component({
    selector: 'dashboard',
    templateUrl: 'app/dashboard/dashboard.component.html'
})

export class DashboardComponent implements OnInit{
    currentUser: User;
    mobileScreen: any;
    mobileTitles: any[] = ['Your leave summary', 'Your leave schedule'];
    yearlyEntitlements: YearlyEntitlement[];

    constructor(private router: Router, private yeService: YearlyEntitlementService, private employeeService: EmployeeService, private titleService: TitleService, private alertService: AlertService) {
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.mobileScreen = 0;
        this.titleService.setTitle('Home');
        this.titleService.setMobileTitle(this.mobileTitles[this.mobileScreen]);
        this.yearlyEntitlements = [];
    }

    ngOnInit(){
        this.yeService.getByUserId(JSON.parse(localStorage.getItem('currentUser')).id).subscribe(
            data => {
                if(data){
                    for(let d of data){
                        this.yearlyEntitlements.push(new YearlyEntitlement(
                            d.id,d.isDeleted,d.createdBy,d.creationTime,d.lastModifiedBy,d.lastModifiedTime,d.entitlement,d.currentLeaveBalance,d.yearlyLeaveBalance,d.employeeId,
                            new LeaveType(d.leaveType.id, d.leaveType.isDeleted, d.leaveType.createdBy, d.leaveType.creationTime, d.leaveType.lastModifiedBy, d.leaveType.lastModifiedTime,
                            d.leaveType.name, d.leaveType.description, d.leaveType.entitlement, d.leaveType.isAccountable, d.leaveType.employeeType)
                        ));
                        this.yearlyEntitlements = this.yearlyEntitlements.sort((a,b)=> a.leaveType.id - b.leaveType.id);
                    }
                }
            }
        )
    }


    reveal(screen: number) {
        this.mobileScreen = screen;
        this.titleService.setMobileTitle(this.mobileTitles[screen]);
    }
}