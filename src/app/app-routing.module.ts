import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from "./main/main.component";
import { ProfileComponent } from "./profile/profile.component";
import { AuthGuard } from "./_helpers/auth.guard";
import { GroupComponent } from "./group/group.component";

const routes: Routes = [
    { path: 'main', component: MainComponent },
    { path: 'group/:id', component: GroupComponent },
    { path: 'profile/:id', component: ProfileComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: 'main' },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
