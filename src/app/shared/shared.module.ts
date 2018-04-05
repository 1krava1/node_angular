import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TextMaskModule } from 'angular2-text-mask';

import { CheckoutComponent } from './components/checkout/checkout.component';
import { SanitizedHTML } from './pipes/sanitized-html.pipe';

@NgModule({
    imports: [
        CommonModule,
        ReactiveFormsModule,
        TextMaskModule,
    ],
    exports: [
        ReactiveFormsModule,
        TextMaskModule,
        CheckoutComponent,
        SanitizedHTML,
    ],
    declarations: [
        CheckoutComponent,
        SanitizedHTML,
    ],
    providers: [],
})
export class SharedModule { }
