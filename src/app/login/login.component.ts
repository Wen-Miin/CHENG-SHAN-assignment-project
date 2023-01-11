import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
import { Router } from '@angular/router'
import { AuthService } from '../shared/auth.service'

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
    username: string = ''
    password: string = ''

    constructor(private authService: AuthService, private router: Router) {
        this.authService.loggedIn$.subscribe((loggedIn) => {
            if (loggedIn) {
                this.router.navigate(['/home'])
            }
        })
    }

    ngOnInit(): void {
        const isLoggedIn = this.authService.getLoggedIn()
        console.log('isLoggedIn', isLoggedIn)
        if (isLoggedIn) {
            this.router.navigate(['/home'])
        }
    }

    login() {
        this.authService.login(this.username, this.password)
    }
}