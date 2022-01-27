import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";

const AUTH_API = environment.apiBaseUrl + '/auth';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {

    constructor(private http: HttpClient) {
    }

    login(username: string, password: string): Observable<any> {
        return this.http.post(`${AUTH_API}/login`, { username, password }, httpOptions);
    }
}
