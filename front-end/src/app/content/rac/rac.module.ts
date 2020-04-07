import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { RacComponent } from './rac.component';
import { HeaderModule } from './components/header/header.module';
import { SidebarModule } from './components/sidebar/sidebar.module';
import { FooterModule } from './components/footer/footer.module';
import { SubheaderModule } from './components/subheader/subheader.module';
import { QuickSidebarModule } from './components/quick-sidebar/quick-sidebar.module';
import { ReactiveFormsModule } from '@angular/forms';
// import { ModalComponent } from '../pages/modal/modal.component';


@NgModule({
    imports: [
        CommonModule,
        RouterModule,
        ReactiveFormsModule,
        HeaderModule,
        FooterModule,
        SidebarModule,
        QuickSidebarModule,
        SubheaderModule,
    ],
    declarations: [
        RacComponent,
        // ModalComponent
    ]
})

export class RacModule {
}
