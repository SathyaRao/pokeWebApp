import { IAbilities } from "./IAbilities";
export interface IPokemon {
    name:string;
    abilities:Array<IAbilities>;
    id:number;
    height:number;
    weight:number;
    sprites: {
        other: {
            "official-artwork": {
                front_default:string;
            }
        }       
    };// = details.sprites.other.official-artwork.front_default;
}