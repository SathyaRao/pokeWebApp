import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';

import { of, Observable, BehaviorSubject, forkJoin } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Constants } from 'src/constants';
import { IPokemon } from 'src/interface/IPokemon';
import { Pokemon } from 'src/models/pokemon.model';

@Injectable({ providedIn: 'root' })
export class PokemonListService {
  @Output()  pokemonList = new EventEmitter<Array<any>>();
  pokeList:any = [];
  private list = new BehaviorSubject('');
  sharedData = this.list.asObservable();
  constructor(private http: HttpClient) {}

  getPokemons(): Observable<Array<Pokemon>> {
    return this.http.get<{list:any[]}>(Constants.pokemonListUrl).pipe(map((response:any)=> response.results || []));
  }

  getImages(pokemons:any): Observable<any>{
    let result:any;
    let listLength = pokemons.length;
    
    for(let i = 0;i<pokemons.length;i++){
        //this.getImageService(pokemons[i].url,length,i);
        this.pokeList.push(this.http.get<IPokemon>(pokemons[i].url).pipe(tap(res => res)));  
    }

    forkJoin(this.pokeList).subscribe(allResults => {
        let pokemonList = allResults;
    });
    return this.pokeList;
  }
 
  getImageService(url:string,length:number,index:number){
    let pokemonDetails:any, abilities:any;
   this.http.get<IPokemon>(url).subscribe((details:IPokemon)=>{
    pokemonDetails = details;
    //this.store.dispatch(PokemonAction());
    pokemonDetails.image = details.sprites.other["official-artwork"].front_default;
    abilities = details.abilities;
    pokemonDetails.ability = "";
    for(let i=0;i<abilities.length;i++){
      pokemonDetails.ability += abilities[i].ability.name + ", ";
    }
    pokemonDetails.ability = pokemonDetails.ability.substring(0,pokemonDetails.ability.length-2);
    let type = pokemonDetails.types[0].type.name;
    pokemonDetails.type = Constants.type[type];
    if((length - 1) == index){
      this.pokeList = pokemonDetails;
      this.pokemonList.emit(pokemonDetails);
      this.list.next(pokemonDetails);
    } 
  })
  }
}