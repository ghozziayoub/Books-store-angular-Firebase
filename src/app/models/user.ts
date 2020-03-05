import { ResolveStart } from '@angular/router';

export interface Roles {
    editeur ?:boolean;
    admin?:boolean;
}

export interface userInterface {
    
    id?: string;
    name?: string;
    email?: string;
    password?: string;
    photoUrl?: string;
    roles ?: Roles;
}