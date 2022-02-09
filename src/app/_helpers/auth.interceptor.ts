import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor, HttpHeaders, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from "../_services/token-storage.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private tokenService: TokenStorageService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        let authRequest = request;
        let token = this.tokenService.getAccessToken();

        if (token != null) {
            // authRequest = request.clone({ headers: new HttpHeaders({ 'Authorization': 'Bearer ' + token })});
            authRequest = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token) });
        }

        return next.handle(authRequest);
    }
}