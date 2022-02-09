import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from "./_services/token-storage.service";
import { User } from "./_domains/user";
import { NgForm } from "@angular/forms";
import { AuthService } from "./_services/auth.service";
import { concatMap, mergeMap, switchMap, tap } from "rxjs/operators";
import { UserService } from "./_services/user.service";

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    public isLoggedIn = false;
    public userInfo?: User | null;

    constructor(
        private tokenStorageService: TokenStorageService,
        private authService: AuthService,
        private userService: UserService
    ) { }

    ngOnInit(): void {
        this.isLoggedIn = !!this.tokenStorageService.getUser();

        if (this.isLoggedIn) {
            this.userInfo = this.tokenStorageService.getUser();
        }
    }

    public login(ngForm: NgForm): void {
        const loginForm = ngForm.value;

        this.authService.login(loginForm.login, loginForm.password).pipe(
            tap((loginResponse: any) => this.tokenStorageService.saveTokens(loginResponse.accessJws, loginResponse.refreshJws),
                (errorResponse: any) => console.log("bad credentials")),
            concatMap((loginResponse: any) => this.userService.getCurrent()),
            tap((currentUser: User) => {
                this.tokenStorageService.saveUser(currentUser);
                window.location.reload();
            })
        ).subscribe();
    }

    public logout(): void {
        this.tokenStorageService.logout();
        window.location.reload();
    }
}
