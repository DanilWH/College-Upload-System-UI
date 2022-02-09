import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { GroupService } from "../_services/group.service";
import { concatMap, mergeMap, tap } from "rxjs/operators";
import { UserService } from "../_services/user.service";
import { Group } from "../_domains/group";
import { User } from "../_domains/user";

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    public groupOfStudentsForm = this.fb.group({
        name: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(6)]],
        csvFile: ['', [Validators.required]]
    });

    public groups: Group[] = [];

    constructor(
        private groupService: GroupService,
        private userService: UserService,
        private fb: FormBuilder
    ) { }

    ngOnInit(): void {
        this.groupService.list().subscribe(
            (data: Group[]) => {
                this.groups = data;
            }
        );
    }

    public onSubmit(): void {
        const formData = new FormData();
        formData.append('csvFile', this.groupOfStudentsForm.get('csvFile')?.value);

        const newGroupForm: Group = {name: this.groupOfStudentsForm.get('name')?.value} as Group;
        this.groupService.create(newGroupForm).pipe(
            tap((newGroup: Group) => this.groups.push(newGroup)),
            concatMap((newGroup: Group) => this.userService.generateForGroup(newGroup.id, formData)),
            tap((generatedUsers: User[]) => console.log(generatedUsers))
        ).subscribe();
    }

    get f() {
        return this.groupOfStudentsForm.controls;
    }

    public onFileChange(event: any) {
        if (event.target.files.length > 0) {
            this.groupOfStudentsForm.patchValue({
                csvFile: event.target.files[0]
            });
        } else {
            this.groupOfStudentsForm.patchValue({
                csvFile: ''
            })
        }
    }
}
