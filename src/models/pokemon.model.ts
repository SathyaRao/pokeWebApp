import { IAbilities } from "src/interface/IAbilities";

export interface Pokemon {
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
    }
}