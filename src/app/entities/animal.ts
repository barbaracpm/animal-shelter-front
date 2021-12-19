import { Region } from "./region";
import { Specie } from "./specie";

export class Animal {

    id!: number;
    name!: string;
    specie!: Specie;
    birthDate!: string;
    sex!: string;
    color!: string;
    weight!: number;
    description!: string;
    region!: Region;



}
