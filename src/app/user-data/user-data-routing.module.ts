import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from '../Component/create/create.component';
import { EditComponent } from '../Component/edit/edit.component';
import { HomeComponent } from '../Component/home/home.component';

const routes: Routes = [
  {
    path:"userData/home" , component:HomeComponent
  },
  {
    path:"userData/create" , component:CreateComponent
  },
  {
    path:"userData/edit/:id" , component:EditComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserDataRoutingModule { }
