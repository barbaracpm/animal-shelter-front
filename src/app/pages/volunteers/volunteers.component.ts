import { Component, OnInit } from '@angular/core';
import { Volunteer } from 'src/app/entities/volunteer';
import { AuthService } from 'src/app/services/auth-service.service';
import { VolunteersService } from 'src/app/services/volunteers-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-volunteers',
  templateUrl: './volunteers.component.html',
  styleUrls: ['./volunteers.component.css']
})

export class VolunteersComponent implements OnInit {

  volunteers!: Volunteer[];

  constructor(private volunteersService:VolunteersService,public authService: AuthService) { }

  ngOnInit(): void {

   this.volunteersService.getVolunteers().subscribe(
     volunteers => this.volunteers = volunteers
   );
  }


  delete(volunteer: Volunteer): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar a ${volunteer.name} de la lista de voluntarios/as?`,
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar',
      cancelButtonText: 'No, cancelar',
      confirmButtonClass: 'btn btn-success',
      cancelButtonClass: 'btn btn-danger',
      buttonsStyling: false,
      reverseButtons: true
    }).then((result) => {
      if (result.value) {

        this.volunteersService.delete(volunteer.id).subscribe(
          () => {
            this.volunteers = this.volunteers.filter(cli => cli !== volunteer)
            swal(
              'Voluntario/a eliminado/a de la base de datos',
              `${volunteer.name} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}


