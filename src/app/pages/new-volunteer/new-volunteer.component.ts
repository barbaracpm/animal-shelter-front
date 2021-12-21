import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Volunteer } from 'src/app/entities/volunteer';
import { VolunteersService } from 'src/app/services/volunteers-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-new-volunteer',
  templateUrl: './new-volunteer.component.html',
  styleUrls: ['./new-volunteer.component.css']
})
export class NewVolunteerComponent implements OnInit {


  volunteer: Volunteer = new Volunteer();

  constructor(private volunteersService: VolunteersService,
     private router: Router,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.volunteersService.getVolunteer(id).subscribe((volunteer) => this.volunteer = volunteer);
      }
    });

  }

  public create():void{
    console.log("Formulario Enviado");
    console.log(this.volunteer);
    this.volunteersService.create(this.volunteer)
    .subscribe(
      //ver si está ok
      animal=> {
        this.router.navigate(['/volunteers']);
        swal('Nuevo registro', `El registro del voluntario ${this.volunteer.name} ha sido creado con éxito`, 'success');
      },
      err => {

        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.volunteer);
    this.volunteersService.update(this.volunteer)
      .subscribe(
        json => {
          this.router.navigate(['/volunteers']);
          swal('Registro actualizado', `${this.volunteer.name}`, 'success');
        },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }



}

