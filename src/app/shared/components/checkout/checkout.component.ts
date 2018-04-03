import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl, ValidatorFn, AbstractControl } from '@angular/forms';
import * as ps from './ps.json';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit, OnChanges {
  @Input() sum = 0;

  checkoutForm: FormGroup;
  minOutput = 1;
  extraField = {
    title: '',
    mask: '',
  };
  paymentSystems = ps;
  masks = {
    phone: ['(', /\d/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
    ccNumber: [/\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/],
    wmw: Array(12).fill(/\d/),
    yandex: Array(16).fill(/\d/),
    btc: Array(42).fill(/./),
    pm: Array(9).fill(/\d/),
    pe: Array(9).fill(/\d/),
    okp: Array(10).fill(/\d/),
  };
  prefix = {
    pm: 'U',
    pe: 'P',
    okp: 'OK'
  };
  prependField = {
    cell: ['+38', '+7'],
    qiwi: [
      '+370',
      '+371',
      '+372',
      '+373',
      '+374',
      '+38',
      '+44',
      '+507',
      '+7',
      '+66',
      '+77',
      '+82',
      '+90',
      '+91',
      '+972',
      '+992',
      '+994',
      '+9955',
      '+996',
      '+998',
    ],
    webmoney: [
      'wmz',
      'wmr',
      'wmu'
    ]
  };

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createCheckoutForm();
  }
  ngOnChanges(): void {
    if ( typeof this.checkoutForm !== 'undefined' && this.sum === 0 ) {
      this.checkoutForm.get('paymentSystem').setValue('');
    }
  }

  createCheckoutForm(): void {
    this.checkoutForm = this.formBuilder.group({
      paymentSystem: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  setExtraField(): void {
    this.checkoutForm.removeControl('walletNumber');
    this.checkoutForm.removeControl('cellOperator');
    if ( this.checkoutForm.get('paymentSystem').value === 'paypal' ) {
      this.extraField = {
        title: '',
        mask: ''
      };
    } else {
      const currentPaymentSystem = this.paymentSystems.filter( (ps) => {
        if ( !!ps.extraField.title ) {
          return ps.tag === this.checkoutForm.controls.paymentSystem.value;
        } else {
          return false;
        }
      })[0];
      this.extraField = {
        title: currentPaymentSystem.extraField.title,
        mask: this.masks[currentPaymentSystem.extraField.mask]
      };
      let fc;
      switch (currentPaymentSystem.tag) {
        case 'yandex':
          fc = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(16)]);
          break;
        case 'bitcoin':
          fc = new FormControl('', [Validators.required, Validators.minLength(34), Validators.maxLength(42)]);
          break;
        case 'qiwi':
        case 'cell':
          this.checkoutForm.addControl('prependField', new FormControl('', [Validators.required]));
          fc = new FormControl('', [Validators.required]);
          break;
        case 'webmoney':
          this.checkoutForm.addControl('prependField', new FormControl('', [Validators.required]));
          fc = new FormControl('', [Validators.required, Validators.minLength(12), Validators.maxLength(12)]);
          break;
        case 'pm':
        case 'pe':
          this.checkoutForm.addControl('prependField', new FormControl('', [Validators.required]));
          fc = new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(9)]);
          break;
        case 'okp':
          this.checkoutForm.addControl('prependField', new FormControl('', [Validators.required]));
          fc = new FormControl('', [Validators.required, Validators.minLength(7), Validators.maxLength(10)]);
          break;
        default:
          fc = new FormControl('', [Validators.required]);
          break;
      }
      this.checkoutForm.addControl('walletNumber', fc);
    }
  }

}
