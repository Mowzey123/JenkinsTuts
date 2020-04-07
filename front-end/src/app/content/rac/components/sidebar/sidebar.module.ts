import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { NavigationModule } from '../navigation/navigation.module';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';

import { SidebarComponent } from './sidebar.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        NavigationModule,
        PerfectScrollbarModule,
    ],
    declarations: [SidebarComponent],
    exports: [SidebarComponent]
})

export class SidebarModule { }
