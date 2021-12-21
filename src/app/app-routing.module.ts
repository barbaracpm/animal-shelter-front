import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnimalsComponent } from "./pages/animals/animals.component";
import { HomeComponent } from "./pages/home/home.component";
import { LoginComponent } from "./pages/login/login.component";
import { NewVolunteerComponent } from "./pages/new-volunteer/new-volunteer.component";
import { NewComponent } from "./pages/new/new.component";
import { VolunteersComponent } from "./pages/volunteers/volunteers.component";


const routes: Routes = [

  {
    path: '',
    redirectTo: '/home',
    pathMatch:'full'

  },

  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'animals',
    component: AnimalsComponent
  },

  {
    path: 'animals/new',
    component: NewComponent
  },
  {
    path:'animals/edit/:id',
    component: NewComponent
  },

  {
    path: 'volunteers',
    component: VolunteersComponent
  },

  {
    path: 'volunteers/new',
    component: NewVolunteerComponent
  },
  {
    path:'volunteers/edit/:id',
    component: NewVolunteerComponent
  },

  {
    path: 'login',
    component: LoginComponent
  },

//VERIFICA SI EXISTE LA RUTA. SI NO EXISTE TE REDIRIGE AL PPAL
  {
    path: '**',
    redirectTo: '/home'

  },

];

@NgModule({
  imports: [ RouterModule.forRoot(routes)],
  exports: [ RouterModule]
})


export class AppRoutingModule {


 }
