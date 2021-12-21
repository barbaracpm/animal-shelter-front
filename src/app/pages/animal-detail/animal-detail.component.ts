import { Component, OnInit } from '@angular/core';
import { Animal } from 'src/app/entities/animal';
import { AnimalsService } from 'src/app/services/animals-service.service';
import { ActivatedRoute } from '@angular/router';
import swal from 'sweetalert2';
import { HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-animal-detail',
  templateUrl: './animal-detail.component.html',
  styleUrls: ['./animal-detail.component.css']
})
export class AnimalDetailComponent implements OnInit {

  animal!: Animal;
  fotoSeleccionada!: File;
  progreso: number =0;

  constructor(private animalsService: AnimalsService, private ActivatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.ActivatedRoute.paramMap.subscribe(params => {
      let id:number = +params.get('id')!;

      if(id){
        this.animalsService.getAnimal(id).subscribe(animal => {
          this.animal =animal;
        })
      }
    })
  }


  seleccionarFoto(event: any) {
    this.fotoSeleccionada = event.target.files[0];
    console.log(this.fotoSeleccionada);
  }

  subirFoto() {
    if(!this.fotoSeleccionada){
      swal('Error Upload', 'Debe seleccionar una foto', 'error');
    } else {
      this.animalsService.subirFoto(this.fotoSeleccionada, this.animal.id)
      .subscribe(event => {
        if(event.type === HttpEventType.UploadProgress) {
          this.progreso = Math.round((event.loaded / event.total!) * 100);
        } else if (event.type === HttpEventType.Response){
          let response: any = event.body;
          this.animal = response.animal as Animal;
          swal('La foto se ha subido completamente', response.mensaje, 'success')
        }
      });
    }
  }
}
