import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/services/user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {

  constructor(private userService: UserService,
              private activatedRoute: ActivatedRoute,
              private router: Router ) {
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      if ( !!params.token ) {
        this.userService.setUserToken(params.token);
        this.router.navigate(['/']);
      }
    });
  }

}
