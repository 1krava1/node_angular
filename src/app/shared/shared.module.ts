import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
    ],
    exports: [
        ReactiveFormsModule,
        CheckoutComponent
    ],
    declarations: [CheckoutComponent],
    providers: [],
})
export class SharedModule { }
