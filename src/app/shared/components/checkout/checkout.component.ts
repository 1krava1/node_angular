import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  @Input() sum = 0;

  checkoutForm: FormGroup;
  minOutput = 1;
  extraFieldTitle = '';
  paymentSystems = [
    {
      tag: 'bitcoin', name: 'bitcoin',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
    {
      tag: 'privat24', name: 'privat24',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
    {
      tag: 'visa', name: 'visa',
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
    {
      tag: 'paypal', name: 'paypal', },
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
      extraField: { name: 'walletNumber', title: 'Wallet Number' } },
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

  createCheckoutForm(): void {
    this.checkoutForm = this.formBuilder.group({
      paymentSystem: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

}
