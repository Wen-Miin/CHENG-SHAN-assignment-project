import { Injectable } from '@angular/core';
import { Router } from '@angular/router'
import * as _ from 'lodash'
import { Subject } from 'rxjs'
import { HttpService } from './http.service'

@Injectable({
    providedIn: 'root',
})
export class AuthService {
    private loggedInSubject = new Subject<boolean>()
    loggedIn$ = this.loggedInSubject.asObservable()
    private loggedIn = false

    constructor(private http: HttpService, private router: Router) {}

    // Dans la vraie vie (dans le projet à faire), on
    // passerait login et password.
    login(username: string, password: string) {
        const body = {
            username,
            password,
        }

        console.log(body)
        this.http.post('/login', body).subscribe(
            (response) => {
                // Traiter la réponse de l'API
                const token = _.get(response, 'token') || ''
                const role = _.get(response, 'role') || ''
                localStorage.setItem('token', token)
                this.setLoggedIn(true)
                this.http.setToken(token)
            },
            (error) => {
                // Traiter les erreurs
                console.log(error)
            }
        )
    }

    logOut() {
        localStorage.removeItem('token')
        this.setLoggedIn(false)
        this.router.navigate(['/login'])
    }

    isAdmin(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            resolve(this.loggedIn)
        })
    }

    ping() {
        this.http.get('/me').subscribe(
            (response) => {
                // Traiter la réponse de l'API
                this.setLoggedIn(true)
                this.http.setToken(_.get(response, 'token') || '')
            },
            (error) => {
                // Traiter les erreurs
                console.log(error)
            }
        )
    }

    getLoggedIn() {
        return this.loggedIn
    }

    setLoggedIn(loggedIn: boolean) {
        this.loggedIn = loggedIn
        this.loggedInSubject.next(loggedIn)
    }
}
