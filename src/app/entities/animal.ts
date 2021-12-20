import { Region } from "./region";
import { Sex } from "./sex";
import { Specie } from "./specie";

export class Animal {

    id!: number;
    name!: string;
    specie!: Specie;
    birthDate!: string;
    sex!: Sex;
    color!: string;
    weight!: number;
    description!: string;
    region!: Region;

}
