import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalsService } from '../../services/animals-service.service';
import swal from 'sweetalert2';
import { Region } from '../../entities/region';
import { Specie } from '../../entities/specie';
import { Animal } from '../../entities/animal';
import { Sex } from '../../entities/sex';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.css']
})
export class NewComponent implements OnInit {

  regions!: Region[];
  species!: Specie[];
  sexs!: Sex[];
  animal: Animal = new Animal();

  constructor(private animalsService: AnimalsService,
     private router: Router,
     private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {

    this.activatedRoute.paramMap.subscribe(params => {
      let id = +params.get('id')!;
      if (id) {
        this.animalsService.getAnimal(id).subscribe((animal) => this.animal = animal);
      }
    });

    this.animalsService.getRegions().subscribe(regions => this.regions = regions);
    this.animalsService.getSpecies().subscribe(species => this.species = species);
    this.animalsService.getSexs().subscribe(sexs => this.sexs = sexs);
  }

  public create():void{
    console.log("Formulario Enviado");
    console.log(this.animal);
    this.animalsService.create(this.animal)
    .subscribe(
      //ver si está ok
      animal=> {
        this.router.navigate(['/animals']);
        swal('Nuevo registro', `El registro del animal ${this.animal.name} ha sido creado con éxito`, 'success');
      },
      err => {

        console.error('Código del error desde el backend: ' + err.status);
        console.error(err.error.errors);
      }
    );
  }

  update(): void {
    console.log(this.animal);
    this.animalsService.update(this.animal)
      .subscribe(
        json => {
          this.router.navigate(['/animals']);
          swal('Registro actualizado', `${this.animal.name}`, 'success');
        },
        err => {
          console.error('Código del error desde el backend: ' + err.status);
          console.error(err.error.errors);
        }
      )
  }


  compararRegion(o1: Region, o2: Region): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  compareSpecie(o1: Specie, o2: Specie): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }

  compareSex(o1: Specie, o2: Specie): boolean {
    if (o1 === undefined && o2 === undefined) {
      return true;
    }

    return o1 === null || o2 === null || o1 === undefined || o2 === undefined ? false : o1.id === o2.id;
  }



}
