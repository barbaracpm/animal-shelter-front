import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/entities/animal';
import { AnimalsService } from 'src/app/services/animals-service.service';
import { AuthService } from 'src/app/services/auth-service.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-animals',
  templateUrl: './animals.component.html',
  styleUrls: ['./animals.component.css']
})
export class AnimalsComponent implements OnInit {

  animals!: Animal[];
  imgSrc!:string;

  constructor(private animalsService:AnimalsService,public authService: AuthService) { }

  ngOnInit(): void {

    this.imgSrc = 'assets/avatar.jpg';

   this.animalsService.getAnimals().subscribe(
     animals => this.animals = animals
   );
  }


  delete(animal: Animal): void {
    swal({
      title: 'Está seguro?',
      text: `¿Seguro que desea eliminar al  ${animal.specie.name} ${animal.name}?`,
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

        this.animalsService.delete(animal.id).subscribe(
          () => {
            this.animals = this.animals.filter(cli => cli !== animal)
            swal(
              'Animal eliminado de la base de datos',
              `${animal.name} eliminado con éxito.`,
              'success'
            )
          }
        )

      }
    });
  }
}
