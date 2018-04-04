import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';
import { CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(private userService: UserService) {}

    canActivate(): boolean {
        return this.userService.isLoggedIn();
    }
}
