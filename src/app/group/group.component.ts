import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
import { GroupService } from "../_services/group.service";
import { concatMap, mergeMap, tap } from "rxjs/operators";
import { UserService } from "../_services/user.service";
import { Group } from "../_domains/group";
import { User } from "../_domains/user";
import { TokenStorageService } from "../_services/token-storage.service";
import { UserRoles } from "../_domains/user.roles";

declare var showToast: any;

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    private csvFile: any;
    public groupForm: Group = {
        id: null,
        name: ''
    };
    public groups: Group[] = [];
    public roles: UserRoles[] = [];
    public userRoles = UserRoles; // Make a variable reference to enum with roles

    public isGenerating = false;

    constructor(private groupService: GroupService, private userService: UserService, private fb: FormBuilder,
                private tokenStorageService: TokenStorageService) { }

    ngOnInit(): void {
        // load the list of all the active groups.
        this.groupService.list().subscribe(
            (data: Group[]) => {
                this.groups = data;
            }
        );

        const user = this.tokenStorageService.getUser();
        if (user) {
            this.roles = user.roles;
        }
    }

    public onSubmit(ngForm: NgForm): void {
        this.isGenerating = true;

        const formData = new FormData();
        formData.append('csvFile', this.csvFile);

        this.groupService.create(this.groupForm).pipe(
            tap((newGroup: Group) => this.groups.push(newGroup)),
            concatMap((newGroup: Group) => this.userService.generateForGroup(newGroup.id, formData)),
            tap((generatedUsers: User[]) => {
                this.isGenerating = false;
                new showToast();
                ngForm.reset();
                console.log(generatedUsers)
            })
        ).subscribe();
    }

    public onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.csvFile = event.target.files[0];
        } else {
            this.csvFile = null;
        }
    }
}
