import { Component, OnInit } from '@angular/core'
import { AuthService } from './shared/auth.service'

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
    title = 'Gestion des assignments'
    isLoggedIn = false

    constructor(private authService: AuthService) {
        this.authService.loggedIn$.subscribe((loggedIn) => {
            this.isLoggedIn = loggedIn
            console.log('loggedIn', loggedIn)
            console.log('isLoggedIn', this.isLoggedIn)
        })
    }

    ngOnInit() {
        this.authService.ping()
    }

    logoutFunction() {
        this.authService.logOut()
    }
}
