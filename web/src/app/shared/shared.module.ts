import { ModuleWithProviders, NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PortalModule } from '@angular/cdk/portal';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

const importedSharedModules = [
    RouterModule,
    PortalModule,
];

import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from './angular-material.module';
import { OverlayModule } from './component/overlay/overlay.module';

const importedAndExportedSharedModules = [
    AngularMaterialModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    OverlayModule,
];

import { FooterComponent } from './component/footer/footer.component';
import { ValidationErrorComponent } from './component/validation-error/validation-error.component';
import { ValidationMessageComponent } from './component/validation-message/validation-message.component';
import { CarouselComponent } from './component/carousel/carousel.component';
import { NavListComponent } from './component/nav-list/nav-list.component';
import { TertiaryNavComponent } from './component/tertiary-nav/tertiary-nav.component';
import { TabNavComponent } from './component/tab-nav/tab-nav.component';
import { FullWidthComponent } from './component/template/full-width/full-width.component';
import { TwoColumnMenuComponent } from './component/template/two-column-menu/two-column-menu.component';
import { CheckoutComponent } from './component/checkout/checkout.component';
import { AdminTwoColumnMenuComponent } from './component/template/admin-two-column-menu/admin-two-column-menu.component';
import { FileUploadComponent } from './component/file-upload/file-upload.component';
import { TableComponent } from './component/table/table.component';
import { SpinnerComponent } from './component/spinner/spinner.component';

const sharedComponents = [
    FooterComponent,
    ValidationErrorComponent,
    ValidationMessageComponent,
    CarouselComponent,
    NavListComponent,
    TertiaryNavComponent,
    TabNavComponent,
    FullWidthComponent,
    TwoColumnMenuComponent,
    CheckoutComponent,
    AdminTwoColumnMenuComponent,
    FileUploadComponent,
    TableComponent,
    SpinnerComponent,
];

import { AppTextDirective } from './directives/appText.directive';

const sharedDirectives = [
    AppTextDirective,
];

import { AppTextPipe } from './pipes/app-text.pipe';

const sharedPipes = [
    AppTextPipe
];

@NgModule({
    imports: [
        importedSharedModules,
        importedAndExportedSharedModules,
        MDBBootstrapModule.forRoot(),
    ],
    declarations: [
        sharedComponents,
        sharedDirectives,
        sharedPipes,
    ],
    exports: [
        importedAndExportedSharedModules,
        sharedComponents,
        sharedDirectives,
        sharedPipes,
    ],
    providers: [
        CurrencyPipe
    ]
})
export class SharedModule {
    static forRoot(): ModuleWithProviders<SharedModule> {
        return {
            ngModule: SharedModule,
            providers: [OverlayModule.rootProviders()]
        };
    }
}
