import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserEnt } from 'src/app/entities/userEnt';
import { AuthService } from 'src/app/services/auth-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  titulo: string = 'Por favor, introduzca sus credenciales';

  userEnt: UserEnt = new UserEnt();

  constructor(private authService:AuthService , private router:Router) {

   }

  ngOnInit(): void {
    if (this.authService.token) {
      swal('Login', `Hola ${this.authService.userEnt.username} ya estás autenticado!`, 'info');
      this.router.navigate(['/animals']);
    }
  }

  login(): void {
    console.log(this.userEnt);
    if (this.userEnt.username == null || this.userEnt.password == null) {
      swal('Error Login', 'Username o password vacías!', 'error');
      return;
    }
    this.authService.login(this.userEnt).subscribe(
      response => {
        console.log(response);

      this.authService.keepUser(response.access_token);
      this.authService.keepToken(response.access_token);
      let userEnt = this.authService.userEnt;

        this.router.navigate(['/animals']);
        swal('Login', `Hola ${this.userEnt.username},has iniciado sesión con éxito!`,'success');
      },
      err =>{
        if(err.status == 400){
          swal("Error Login","Usuario o clave incorrectas!","error");
        }
      }
    );
  }


}
