import { Injectable } from '@angular/core';
import { User } from "../_domains/user";

const ACCESS_TOKEN_KEY = 'access-token';
const REFRESH_TOKEN_KEY = 'refresh-token';
const USER_KEY = 'auth-user';

@Injectable({
    providedIn: 'root'
})
export class TokenStorageService {

    constructor() {
    }

    saveTokens(accessToken: string, refreshToken: string): void {
        // save the access token.
        window.localStorage.removeItem(ACCESS_TOKEN_KEY);
        window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);

        // save the refresh token.
        window.localStorage.removeItem(REFRESH_TOKEN_KEY);
        window.localStorage.setItem(REFRESH_TOKEN_KEY, refreshToken);
    }

    getAccessToken(): string | null {
        return window.localStorage.getItem(ACCESS_TOKEN_KEY);
    }

    getRefreshToken(): string | null {
        return window.localStorage.getItem(REFRESH_TOKEN_KEY);
    }

    saveUser(user: User): void {
        window.localStorage.removeItem(USER_KEY);
        window.localStorage.setItem(USER_KEY, JSON.stringify(user));
    }

    getUser(): User | null {
        const user = window.localStorage.getItem(USER_KEY);
        if (user) {
            return JSON.parse(user);
        }

        return null;
    }

    logout(): void {
        window.localStorage.clear();
    }
}
