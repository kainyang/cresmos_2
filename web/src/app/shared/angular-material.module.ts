import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatNativeDateModule, MAT_DATE_LOCALE, MAT_DATE_FORMATS, DateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatTreeModule } from '@angular/material/tree';
import { MatSidenavModule } from '@angular/material/sidenav';

@NgModule({
    imports: [
        MatFormFieldModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatTreeModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatRadioModule,
        MatListModule,
        MatMenuModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatStepperModule,
        MatSidenavModule,
    ],
    exports: [
        MatFormFieldModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatTabsModule,
        MatTableModule,
        MatDialogModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatCheckboxModule,
        MatTreeModule,
        MatInputModule,
        MatSelectModule,
        MatIconModule,
        MatCardModule,
        MatDividerModule,
        MatRadioModule,
        MatListModule,
        MatMenuModule,
        MatExpansionModule,
        MatSlideToggleModule,
        MatProgressBarModule,
        MatStepperModule,
        MatSidenavModule,
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'en-GB' }
    ],
})
export class AngularMaterialModule { }
