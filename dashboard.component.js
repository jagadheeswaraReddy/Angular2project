"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var index_1 = require('../_services/index');
var router_1 = require("@angular/router");
var yearly_entitlement_1 = require("../_models/yearly-entitlement");
var yearly_entitlement_service_1 = require("../_services/yearly-entitlement.service");
var leave_type_1 = require("../_models/leave-type");
var DashboardComponent = (function () {
    function DashboardComponent(router, yeService, employeeService, titleService, alertService) {
        this.router = router;
        this.yeService = yeService;
        this.employeeService = employeeService;
        this.titleService = titleService;
        this.alertService = alertService;
        this.mobileTitles = ['Your leave summary', 'Your leave schedule'];
        this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
        this.mobileScreen = 0;
        this.titleService.setTitle('Home');
        this.titleService.setMobileTitle(this.mobileTitles[this.mobileScreen]);
        this.yearlyEntitlements = [];
    }
    DashboardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.yeService.getByUserId(JSON.parse(localStorage.getItem('currentUser')).id).subscribe(function (data) {
            if (data) {
                for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
                    var d = data_1[_i];
                    _this.yearlyEntitlements.push(new yearly_entitlement_1.YearlyEntitlement(d.id, d.isDeleted, d.createdBy, d.creationTime, d.lastModifiedBy, d.lastModifiedTime, d.entitlement, d.currentLeaveBalance, d.yearlyLeaveBalance, d.employeeId, new leave_type_1.LeaveType(d.leaveType.id, d.leaveType.isDeleted, d.leaveType.createdBy, d.leaveType.creationTime, d.leaveType.lastModifiedBy, d.leaveType.lastModifiedTime, d.leaveType.name, d.leaveType.description, d.leaveType.entitlement, d.leaveType.isAccountable, d.leaveType.employeeType)));
                    _this.yearlyEntitlements = _this.yearlyEntitlements.sort(function (a, b) { return a.leaveType.id - b.leaveType.id; });
                }
            }
        });
    };
    DashboardComponent.prototype.reveal = function (screen) {
        this.mobileScreen = screen;
        this.titleService.setMobileTitle(this.mobileTitles[screen]);
    };
    DashboardComponent = __decorate([
        core_1.Component({
            selector: 'dashboard',
            templateUrl: 'app/dashboard/dashboard.component.html'
        }), 
        __metadata('design:paramtypes', [router_1.Router, yearly_entitlement_service_1.YearlyEntitlementService, index_1.EmployeeService, index_1.TitleService, index_1.AlertService])
    ], DashboardComponent);
    return DashboardComponent;
}());
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map