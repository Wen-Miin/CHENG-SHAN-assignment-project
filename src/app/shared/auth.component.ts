import { Component, OnInit } from '@angular/core'
import * as _ from 'lodash'
import { Router } from '@angular/router'
import { HttpService } from './http.service'

@Component({
    selector: 'app-login',
    template: `
        <form (ngSubmit)="login()" #loginForm="ngForm">
            <label for="username">Nom d'utilisateur :</label>
            <input
                type="text"
                id="username"
                name="username"
                [(ngModel)]="username"
                required
            />
            <br />
            <label for="password">Mot de passe :</label>
            <input
                type="password"
                id="password"
                name="password"
                [(ngModel)]="password"
                required
            />
            <br />
            <button type="submit" [disabled]="!loginForm.form.valid">
                Se connecter
            </button>
        </form>
    `,
    //styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
    username: string = ''
    password: string = ''

    constructor(private http: HttpService, private router: Router) {}

    ngOnInit(): void {
        this.ping()
    }

    login() {
        const body = {
            username: this.username,
            password: this.password,
        }

        console.log(body)
        this.http.post('/login', body).subscribe(
            (response) => {
                // Traiter la réponse de l'API
                const token = _.get(response, 'token') || ''
                localStorage.setItem('token', token)
                window.location.reload()
            },
            (error) => {
                // Traiter les erreurs
                console.log(error)
            }
        )
    }

    ping() {
        this.http.get('/me').subscribe(
            (response) => {
                // Traiter la réponse de l'API
                this.router.navigate(['/home'])
            },
            (error) => {
                // Traiter les erreurs
                console.log(error)
            }
        )
    }
}
