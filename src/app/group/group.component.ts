import { Component, OnInit } from '@angular/core';
import { Group } from "../_domains/group";
import { ActivatedRoute } from "@angular/router";
import { GroupService } from "../_services/group.service";

@Component({
    selector: 'app-group',
    templateUrl: './group.component.html',
    styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
    public group: Group;

    constructor(private groupService: GroupService, private route: ActivatedRoute) {
    }

    ngOnInit(): void {
        const groupId = Number(this.route.snapshot.paramMap.get('id'));
        if (groupId) {
            this.groupService.get(groupId).subscribe(
                (groupData: Group) => this.group = groupData,
                (error: any) => console.log(error)
            );
        }
    }

}
