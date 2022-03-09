import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from "./group/group.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "./_helpers/auth.guard";

const routes: Routes = [
    { path: 'groups', component: GroupComponent },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'groups' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
