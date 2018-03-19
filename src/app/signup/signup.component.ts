import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import {UserService} from '../shared/services/user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  registrationForm;

  constructor(private formBuilder: FormBuilder,
              private userService: UserService) {
  }

  ngOnInit() {
    this.createRegistrationForm();
  }

  createRegistrationForm(): void {
    this.registrationForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.required],
      repeatPassword: ['', Validators.required],
    });
  }

  isEmailValid(): boolean {
    let res = true;
    if ( this.registrationForm.get('email').touched ) {
      res = this.registrationForm.controls.email.valid;
    }
    return res;
  }

  isPasswordValid(): boolean {
    let res = true;
    if ( this.registrationForm.get('password').touched ) {
      res = this.registrationForm.controls.password.valid;
    }
    return res;
  }

  isRepeatPasswordValid(): boolean {
    let res = true;
    if ( this.registrationForm.get('repeatPassword').touched ) {
      res = this.registrationForm.controls.repeatPassword.valid &&
            this.registrationForm.controls.repeatPassword.value === this.registrationForm.controls.password.value;
    }
    return res;
  }

  isFormValid(): boolean {
    return this.isEmailValid() && this.isPasswordValid() && this.isRepeatPasswordValid() && this.registrationForm.valid;
  }

  doSignUp(): void {
    const data = {
      email: this.registrationForm.get('email').value,
      password: this.registrationForm.get('password').value,
    };
    this.userService.signUp(data).subscribe( (response) => {
      console.log(response);
    }, (error) => {
      console.log(error);
    });
  }

}