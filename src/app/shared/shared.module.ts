import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { CheckoutComponent } from './components/checkout/checkout.component';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
    ],
    exports: [
        ReactiveFormsModule,
        CheckoutComponent,
        TextMaskModule,
    ],
    declarations: [CheckoutComponent],
    providers: [],
})
export class SharedModule { }
