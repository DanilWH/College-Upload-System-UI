import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from "@angular/router";
import { TokenStorageService } from "../_services/token-storage.service";
import { User } from "../_domains/user";
import { UserService } from "../_services/user.service";
import { UserRoles } from "../_domains/user.roles";

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
    public profile: User;
    public isPasswordBeingChanged: boolean = false;
    public passwordsMatch: boolean = true;

    public roles: UserRoles[] = [];
    public userRoles = UserRoles; // Make a variable reference to enum with roles

    constructor(private userService: UserService, private tokenStorageService: TokenStorageService, private route: ActivatedRoute) { }

    ngOnInit(): void {
        const routeId = Number(this.route.snapshot.paramMap.get('id'));
        const currentUser = this.tokenStorageService.getUser();

        if (routeId && routeId == currentUser.id) {
            this.profile = currentUser;
        } else {
            this.userService.getOne(routeId).subscribe(
                (userData: User) => this.profile = userData,
                (error: any) => console.log(error)
            );
        }

        // load up the current user's roles;
        const user = this.tokenStorageService.getUser();
        if (user) {
            this.roles = user.roles;
        }
    }

    public onSubmit() {
        console.log("submit the form");
        // TODO: submit the form.
    }

    public togglePasswordChanging(): void {
        this.isPasswordBeingChanged = !this.isPasswordBeingChanged;
    }

    public onPasswordsInput(): void {
        this.passwordsMatch = this.profile.password == this.profile.confirmPassword;
    }
}
