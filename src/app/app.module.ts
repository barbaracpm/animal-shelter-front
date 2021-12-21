import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './layouts/header/header.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { HomeComponent } from './pages/home/home.component';
import { NewComponent } from './pages/new/new.component';
import { AnimalsComponent } from './pages/animals/animals.component';
import { LoginComponent } from './pages/login/login.component';
import { HttpClientModule } from '@angular/common/http';
import { AnimalsService } from './services/animals-service.service';
import { FormsModule } from '@angular/forms';
import { VolunteersComponent } from './pages/volunteers/volunteers.component';
import { VolunteersService } from './services/volunteers-service.service';
import { AuthService } from './services/auth-service.service';
import { NewVolunteerComponent } from './pages/new-volunteer/new-volunteer.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    NewComponent,
    AnimalsComponent,
    LoginComponent,
    VolunteersComponent,
    NewVolunteerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule

  ],
  providers: [AnimalsService, VolunteersService, AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
