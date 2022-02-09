import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupComponent } from "./group/group.component";

const routes: Routes = [
    { path: 'groups', component: GroupComponent },
    {path: '**', redirectTo: 'groups'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
