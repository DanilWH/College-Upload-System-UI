import { UserRoles } from "./user.roles";

export interface User {
    id: number;
    firstName: string;
    lastName: string;
    fatherName: string;
    login: string;
    password: string;
    confirmPassword: string;
    roles: UserRoles[];
    groupId: number;
}
