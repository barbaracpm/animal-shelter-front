import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  nombreapp:string="ClienteApp";

  constructor(public authService: AuthService, private router: Router) { }

  logout(): void {
    let username = this.authService.userEnt.username;
    this.authService.logout();
    swal('Logout', `Hola ${username}, has cerrado sesión con éxito!`, 'success');
    this.router.navigate(['/login']);
  }
  
  ngOnInit(): void {
  }

}
