import { Injectable } from '@angular/core';
import { Observable } from "rxjs";
import { User } from "../_domains/user";
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";

const API_URL = environment.apiBaseUrl;

@Injectable({
    providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient) {
    }

    public getCurrent(): Observable<User> {
        return this.http.get<User>(`${API_URL}/users/me`);
    }

    public getOne(userId: number): Observable<User> {
        return this.http.get<User>(`${API_URL}/users/${userId}`);
    }

    public list(groupId: number): Observable<User[]> {
        return this.http.get<User[]>(`${API_URL}/groups/${groupId}/users`);
    }

    public generateForGroup(groupId: number, formData: FormData): Observable<User[]> {
        return this.http.post<User[]>(`${API_URL}/groups/${groupId}/users`, formData);
    }

    public deactivateOne(userId: number): Observable<void> {
        return this.http.patch<void>(`${API_URL}/users/${userId}/status`, {});
    }

    public deactivateByGroup(groupId: number): Observable<void> {
        return this.http.patch<void>(`${API_URL}/groups/${groupId}/users/status`, {});
    }
}
