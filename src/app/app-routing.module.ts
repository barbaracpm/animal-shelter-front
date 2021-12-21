import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { AnimalDetailComponent } from "./pages/animal-detail/animal-detail.component";
import { AnimalsComponent } from "./pages/animals/animals.component";
import { ContactComponent } from "./pages/contact/contact.component";
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
    path:'animals/view/:id',
    component: AnimalDetailComponent
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

  {
    path: 'contact',
    component: ContactComponent
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
