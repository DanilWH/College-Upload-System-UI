import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Group } from "../_domains/group";
import { environment } from "../../environments/environment";
import { Observable } from "rxjs";

const API_URL = environment.apiBaseUrl;

@Injectable({
    providedIn: 'root'
})
export class GroupService {

    constructor(private http: HttpClient) {
    }

    public listActive(): Observable<Group[]> {
        return this.http.get<Group[]>(`${API_URL}/groups?isActive=true`);
    }

    public listArchived(): Observable<Group[]> {
        return this.http.get<Group[]>(`${API_URL}/groups?isActive=false`);
    }

    public create(group: Group): Observable<Group> {
        return this.http.post<Group>(`${API_URL}/groups`, group);
    }

    public update(group: Group): Observable<Group> {
        return this.http.put<Group>(`${API_URL}/groups/${group.id}`, group);
    }

    public delete(groupId: number): Observable<void> {
        return this.http.delete<void>(`${API_URL}/groups/${groupId}`);
    }
}
