import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnChanges {
  @Input() sum = 0;

  checkoutForm: FormGroup;
  minOutput = 1;
  extraFieldTitle = '';
  paymentSystems = [
    {
      tag: 'bitcoin', name: 'bitcoin',
      extraField: { name: 'walletNumber', title: 'BTC Address' } },
    {
      tag: 'privat24', name: 'privat24',
      extraField: { name: 'walletNumber', title: 'Card Number' } },
    {
      tag: 'visa', name: 'visa',
      extraField: { name: 'walletNumber', title: 'Card Number' } },
    {
      tag: 'paypal', name: 'paypal',
      extraField: { name: '', title: '' } },
    {
      tag: 'webmoney', name: 'webmoney',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
    {
      tag: 'qiwi', name: 'qiwi',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
    {
      tag: 'yandex', name: 'yandex',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
    {
      tag: 'cell', name: 'cell',
      extraField: { name: 'walletNumber', title: 'Phone Number' } },
    {
      tag: 'pm', name: 'perfectmoney',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
    {
      tag: 'pe', name: 'payeer',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
    {
      tag: 'okp', name: 'okpay',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
  ];

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createCheckoutForm();
  }
  ngOnChanges(): void {
    if ( typeof this.checkoutForm !== 'undefined' && this.sum === 0 ) {
      this.checkoutForm.get('paymentSystem').setValue('');
      console.log(this.checkoutForm.value);
    }
  }

  createCheckoutForm(): void {
    this.checkoutForm = this.formBuilder.group({
      paymentSystem: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  extraField(): void {
    if ( this.checkoutForm.get('paymentSystem').value === 'paypal' ) {
      this.extraFieldTitle = '';
      this.checkoutForm.removeControl('walletNumber');
    } else {
      this.extraFieldTitle = this.paymentSystems.filter( (ps) => {
        if ( !!ps.extraField.title ) {
          return ps.tag === this.checkoutForm.controls.paymentSystem.value;
        } else {
          return false;
        }
      })[0].extraField.title;
      this.checkoutForm.addControl('walletNumber', new FormControl('', [Validators.required]));
    }
  }

}
