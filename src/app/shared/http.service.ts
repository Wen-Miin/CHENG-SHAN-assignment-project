import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'

@Injectable({
    providedIn: 'root',
})
export class HttpService {
    private baseUrl = 'https://api.miage-assignment.cf'

    token = localStorage.getItem('token')

    httpOptions = this.token
        ? {
              headers: new HttpHeaders({
                  Authorization: 'Bearer ' + this.token,
              }),
          }
        : {}

    constructor(private http: HttpClient) {}

    get<T>(url: string) {
        return this.http.get<T>(this.baseUrl + url, this.httpOptions)
    }

    post<T>(url: string, data: any) {
        return this.http.post<T>(this.baseUrl + url, data, this.httpOptions)
    }

    put<T>(url: string, data: any) {
        return this.http.put<T>(this.baseUrl + url, data, this.httpOptions)
    }

    delete<T>(url: string) {
        return this.http.delete<T>(this.baseUrl + url, this.httpOptions)
    }

    setToken(token: string) {
        this.token = token
        this.httpOptions = {
            headers: new HttpHeaders({
                Authorization: 'Bearer ' + this.token,
            }),
        }
    }
}
